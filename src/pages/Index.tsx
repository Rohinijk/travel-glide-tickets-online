
import React from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import SearchForm from "@/components/SearchForm";
import BusList from "@/components/BusList";
import SeatSelector from "@/components/SeatSelector";
import PassengerForm from "@/components/PassengerForm";
import ConfirmationPage from "@/components/ConfirmationPage";
import { useBooking } from "@/context/BookingContext";
import { BookingProvider } from "@/context/BookingContext";

const BookingSteps = () => {
  const { step } = useBooking();

  return (
    <div className="container py-8">
      {step === 1 && <SearchForm />}
      {step === 2 && <BusList />}
      {step === 3 && <SeatSelector />}
      {step === 4 && <PassengerForm />}
      {step === 5 && <ConfirmationPage />}
    </div>
  );
};

const Index = () => {
  return (
    <BookingProvider>
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Navbar />
        <Hero />
        <BookingSteps />
      </div>
    </BookingProvider>
  );
};

export default Index;
