import { GetServerSideProps } from 'next';
import { getSession, useSession } from 'next-auth/react';

import SEO from 'components/SEO';
import OrderItem from 'components/order/OrderItem';

import { checkout } from 'lib/stripe';
import { convertTo, db } from 'lib/firebase';

import { StripeOrder } from 'typing';
import moment from 'moment';

interface OrdersProps {
  orders?: StripeOrder[];
}

export default function Orders({ orders = [] }: OrdersProps) {
  const { data: session } = useSession();

  return (
    <>
      <SEO title="Your Amazon Orders" desc="This is the user's Amazon orders page" />
      <div className="max-w-screen-xl mx-auto p-10">
        <h1 className="text-3xl font-semibold border-b-2 mb-2 pb-1 border-yellow-400">
          Your Orders :
        </h1>
        <h2>{session ? `${orders.length} Orders` : `Please sign in to see your orders`}</h2>
        <div className="mt-5 space-y-4">
          {orders.map((order) => (
            <OrderItem key={order.id ?? order.timestamp} order={order} />
          ))}
        </div>
      </div>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const session = await getSession(ctx);

  if (!session) {
    return { props: { orders: [] } };
  }

  const { docs } = await db
    .collection('users')
    .doc(session.user?.email!)
    .collection('orders')
    .withConverter(convertTo<StripeOrder>())
    .orderBy('timestamp')
    .get();

  const orders = await Promise.all(
    docs.map(async (doc) => {
      const { data: products } = await checkout.sessions.listLineItems(doc.id, {
        limit: 100,
      });
      const docData = doc.data();

      return {
        ...docData,
        id: doc.id,
        products,
        timestamp: moment(docData.timestamp.toDate()).unix(),
      } as StripeOrder;
    }),
  );

  return { props: { orders } };
};
