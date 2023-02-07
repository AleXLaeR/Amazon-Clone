/// <reference types="stripe-event-types" />
import { loadStripe } from '@stripe/stripe-js';
import Stripe from 'stripe';

export default loadStripe(process.env.stripe_public_key!);

export const { checkout, webhooks } = new Stripe(process.env.REACT_APP_STRIPE_SKEY!, {
  apiVersion: '2022-11-15',
});

export interface StripeSessionMetadata extends Stripe.Metadata {
  images: string;
  email: string;
}

export type StripeSession = Stripe.Checkout.Session;
export type StripeEvent = Stripe.DiscriminatedEvent;
