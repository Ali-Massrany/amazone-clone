import { CheckCircleIcon } from "@heroicons/react/outline";
import Head from "next/head";

import React from "react";
import Header from "../components/Header";
function Success() {
  return (
    <div className="bg-gray-100 h-screen ">
      <Head>
        <title>Amazon/Success</title>
      </Head>
      <Header />

      <main className="max-w-screen-lg mx-auto">
        <div className="flex flex-col p-10 bg-white">
          <div className="flex items-center space-x-2 mb-5 ">
            <CheckCircleIcon className="text-green-500 h-10" />
            <h1 className="text-3xl ">
              Thank you , your order has been confiremd!
            </h1>
          </div>
          <p>
            Thank tou for shoopimg with us . we&apos;ll send a confirmation once
            your items has shopped , if you would like to check the status of
            your orders pleasse press the link below
          </p>
          {/* <button className="button mt-8">Go to my orders</button> */}
        </div>
      </main>
    </div>
  );
}

export default Success;
