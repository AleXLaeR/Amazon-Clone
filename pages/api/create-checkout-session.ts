import { NextApiRequest, NextApiResponse } from 'next';
import { CartProduct } from 'typing';
import { checkout } from 'lib/stripe';

interface CheckoutNextApiRequest extends NextApiRequest {
  body: {
    products: CartProduct[];
    email: string;
  };
}

export default async ({ body }: CheckoutNextApiRequest, res: NextApiResponse) => {
  const { products, email } = body;

  const mappedProducts = products.map(({ description, image, quantity, title, price }) => ({
    quantity,
    price_data: {
      currency: 'usd',
      unit_amount: price * 100,
      product_data: {
        name: title,
        description,
        images: [image ?? 'public/default-product.png'],
      },
    },
  }));

  let sessionId: string;
  try {
    const { id } = await checkout.sessions.create({
      success_url: `${process.env.HOST}/checkout/success`,
      cancel_url: `${process.env.HOST}/checkout`,
      shipping_options: [
        {
          shipping_rate: 'shr_1MYb63KTwrmcdhTHxsWTJfxt',
        },
      ],
      shipping_address_collection: {
        allowed_countries: ['UA', 'GB', 'US', 'CA'],
      },
      payment_method_types: ['card'],
      line_items: mappedProducts,
      mode: 'payment',
      metadata: {
        images: JSON.stringify(products.map(({ image }) => image)),
        email,
      },
    });
    sessionId = id;
  } catch (error: unknown) {
    console.log(error);
    return res.status(400).json({ error });
  }

  return res.status(200).json({ id: sessionId });
};
