import Image from "next/image";
import React from "react";
import Header from "../components/Header";
import { useSelector } from "react-redux";
import { selectItems, selectTotal } from "../src/slices/basketSlice";
import ChekoutProduct from "../components/ChekoutProduct";
import Currency from "react-currency-formatter";
import { useSession } from "next-auth/react";
import Head from "next/head";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
import Link from "next/link";
const stripePromise = loadStripe(process.env.stripe_public_key);
function Chekout() {
  const items = useSelector(selectItems);
  const total = useSelector(selectTotal);
  const { data: session } = useSession();
  const createCheckoutSession = async () => {
    const stripe = await stripePromise;

    //  call the backend to create a checkout session
    const checkoutSession = await axios.post("/api/create-checkout-session", {
      items: items,
      email: session.user.email,
    });
    // Redirect user to checkout
    const result = await stripe.redirectToCheckout({
      sessionId: checkoutSession.data.id,
    });
    if (result.error) {
      alert(result.error.message);
    }
  };
  return (
    <>
      <Head>
        <title>Amazon/checkout</title>
      </Head>
      <div className="bg-gray-100">
        <Header />
        <main className="lg:flex max-w-screen-2xl mx-auto">
          {/* Lift */}
          <div className="flex-grow m-5 shadow-sm ">
            <Image
              src="https://links.papareact.com/ikj"
              width={1020}
              height={250}
              objectFit="contain"
            />
            <div className="flex flex-col space-y-10 bg-white">
              <h1 className="text-3xl border-b pb-4">
                {items.length === 0
                  ? "Your basket is empty"
                  : "Your Shopping Basket"}
              </h1>
              {items.map((item, i) => (
                <ChekoutProduct
                  key={i}
                  id={item.id}
                  title={item.title}
                  price={item.price}
                  description={item.description}
                  category={item.category}
                  image={item.image}
                  rating={item.rat}
                  hasPrime={item.hasPrime}
                />
              ))}
            </div>
          </div>

          {/* Rirht */}
          <div className="flex flex-col bg-white p-10 shadow-md ">
            {items.length > 0 && (
              <>
                <h2 className="whitespace-nowrap">
                  Subtotal ({items.length} items ):
                  <span className="font-bold">
                    <Currency quantity={total} currency="GBP" />
                  </span>
                </h2>
                <button
                  role={Link}
                  onClick={createCheckoutSession}
                  disabled={!session}
                  className={`button mt-2 ${
                    !session &&
                    "from-gray-300 to-gray-500 border-gray-200 text-gray-300 cursor-not-allowed"
                  }`}
                >
                  {!session ? "Sign in to chekout" : "Proceed to checkout"}
                </button>
              </>
            )}
          </div>
        </main>
      </div>
    </>
  );
}

export default Chekout;
