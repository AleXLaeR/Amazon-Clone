import { NextApiRequest, NextApiResponse } from 'next';
import { buffer } from 'micro';

import { StatusCodes } from 'http-status-codes';
import { webhooks, StripeSession, StripeEvent, StripeSessionMetadata } from 'lib/stripe';

import app from 'lib/firebase';
import { firestore } from 'firebase-admin';

const getSafePercent = (num?: number | null, fallback = 0): number => (num ?? fallback) / 100;

const endpointSecret = process.env.STRIPE_SIGNING_SECRET!;

const fulfillOrder = async ({ id, metadata, amount_total, total_details }: StripeSession) => {
  const { email, images } = metadata as StripeSessionMetadata;

  app
    .firestore()
    .collection('users')
    .doc(email)
    .collection('orders')
    .doc(id)
    .set({
      amount: getSafePercent(amount_total),
      amount_shipping: getSafePercent(total_details?.amount_shipping),
      images: JSON.parse(images),
      timestamp: firestore.FieldValue.serverTimestamp(),
    })
    .then(() => console.log(`Order was successful! Order ${id} has been added to the database.`));
};

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST') {
    return res.status(StatusCodes.METHOD_NOT_ALLOWED);
  }

  let event: StripeEvent;
  const requestBuffer = await buffer(req);
  const payload = requestBuffer.toString();
  const stripeSignature = req.headers['stripe-signature']!;

  try {
    event = webhooks.constructEvent(payload, stripeSignature, endpointSecret) as StripeEvent;
  } catch (err: any) {
    console.log('err');
    return res
      .status(StatusCodes.BAD_REQUEST)
      .send(`Webhook error: ${'message' in err && err.message}`);
  }

  if (event.type === 'checkout.session.completed') {
    return fulfillOrder(event.data.object).catch((err) => {
      return res.status(StatusCodes.OK).send(`Webhook error: ${'message' in err && err.message}`);
    });
  }

  return res.status(StatusCodes.BAD_REQUEST);
};

export const config = {
  api: {
    bodyParser: false,
    externalResolver: true,
  },
};
