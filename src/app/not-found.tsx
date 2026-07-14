"use client";

import Link from "next/link";
import Lottie from "lottie-react";
import { Button } from "@heroui/react";
import notFoundAnimation from "@/app/assets/lottie/notFound.json";

const NotFoundPage = () => {
  return (
    <section className="min-h-[60vh] flex flex-col items-center justify-center bg-white px-4 pb-20">

      {/* Lottie */}
      <Lottie
        animationData={notFoundAnimation}
        loop
        className="w-[320px] md:w-[450px]"
      />
      {/* Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 mt-8">

        <div className="flex flex-col sm:flex-row gap-4 mt-8">
          <Link href="/">
            <Button
              className="bg-white text-orange-500 border-2 border-orange-500 hover:bg-orange-500 hover:text-white transition-all duration-300 px-8 h-11 font-medium rounded-lg"
            >
              Back Home
            </Button>
          </Link>

          <Button
            onPress={() => window.history.back()}
            className="bg-white text-slate-700 border-2 border-slate-300 hover:border-orange-500 hover:bg-orange-500 hover:text-white transition-all duration-300 px-8 h-11 font-medium rounded-lg"
          >
            Go Back
          </Button>
        </div>

      </div>

    </section>
  );
};

export default NotFoundPage;