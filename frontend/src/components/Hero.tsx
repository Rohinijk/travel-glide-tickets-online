
import React from "react";
import { Bus } from "lucide-react";

const Hero = () => {
  return (
    <div className="bg-gradient-to-r from-brand-blue to-brand-teal text-white py-16 md:py-24">
      <div className="container text-center">
        <div className="flex justify-center mb-4">
          <Bus className="h-12 w-12" />
        </div>
        <h1 className="text-3xl md:text-5xl font-bold mb-4">Book Bus Tickets with Ease</h1>
        <p className="text-lg md:text-xl max-w-2xl mx-auto opacity-90 mb-8">
          Travel smoothly with the most trusted online bus ticket booking platform. Enjoy hassle-free journeys with comfortable buses at affordable prices.
        </p>
      </div>
    </div>
  );
};

export default Hero;
