import React from "react";
import Header from "../components/Header";
import { useSession, getSession } from "next-auth/react";
import moment from "moment";
import Order from "../components/Order";
// import * as admin from "firebase-admin";
import Head from "next/head";
// import serviceAccount from "../permissions.json";
import { getFirestore } from "firebase-admin/firestore";
// import app from "../firebase";
// import { initializeApp, applicationDefault, cert } from "firebase-admin/app";
function Orders({ orders }) {
  const { data: session } = useSession();
  return (
    <div>
      <Head>
        <title>Amazon/orders</title>
      </Head>
      <Header />
      <main className="max-w-screen-lg mx-auto p-10">
        <h1 className="text-3xl border-b mb-2 pb-1 border-yellow-400 ">
          Your Orders
        </h1>
        {session ? (
          <h2>{orders?.length} Orders</h2>
        ) : (
          <h2>Please signIn to see your orders</h2>
        )}
        <div className="mt-5 space-y-4">
          {orders?.map(
            ({ id, amount, amountShipping, items, timestamp, images }) => (
              <Order
                key={id}
                id={id}
                amount={amount}
                amountShipping={amountShipping}
                items={items}
                timestamp={timestamp}
                images={images}
              />
            )
          )}
        </div>
      </main>
    </div>
  );
}

export default Orders;
export async function getServerSideProps(context) {
  const stripe = require("stripe")(process.env.stripe_SECRET_KEY);
  // const {
  //   initializeApp,
  //   applicationDefault,
  //   cert,
  // } = require("firebase-admin/app");
  // const {
  //   getFirestore,
  //   Timestamp,
  //   FieldValue,
  // } = require("firebase-admin/firestore");
  // const serviceAccount = require("../permissions.json");
  // const app = !admin.apps.length
  //   ? admin.initializeApp({
  //       credential: admin.credential.cert(serviceAccount),
  //     })
  //   : admin.app();
  const db = getFirestore();
  // Get the users loged in credentials

  const session = await getSession(context);
  if (!session) {
    return {
      props: {},
    };
  }
  //   const stripeOrders = await db.collection("users").get();
  //   snapshot.forEach((doc) => {
  //     console.log(doc.id, "=>", doc.data());
  //   });
  const stripeOrders = await db
    .collection("users")
    .doc(session.user.email)
    .collection("orders")
    .orderBy("timestamp", "desc")
    .get();

  // Stripe Orders
  const orders = await Promise.all(
    stripeOrders.docs.map(async (order) => ({
      id: order.id,
      amount: order.data().amount,
      amountShipping: order.data().amount_shipping,
      images: order.data().images,
      timestamp: moment(order.data().timestamp.toDate()).unix(),
      items: (
        await stripe.checkout.sessions.listLineItems(order.id, {
          limit: 100,
        })
      ).data,
    }))
  );
  return {
    props: {
      orders,
      session,
    },
  };
}
