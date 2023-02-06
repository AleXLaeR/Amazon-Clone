import { loadStripe } from '@stripe/stripe-js';

export default loadStripe(process.env.stripe_public_key!);
