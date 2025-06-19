
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import SearchForm from "@/components/SearchForm";
import BusList from "@/components/BusList";
import SeatSelector from "@/components/SeatSelector";
import PassengerForm from "@/components/PassengerForm";
import ConfirmationPage from "@/components/ConfirmationPage";
import { useBooking } from "@/context/BookingContext";
import { BookingProvider } from "@/context/BookingContext";
import { useAuth } from "@/context/AuthContext";

const BookingSteps = () => {
  const { step } = useBooking();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/auth");
    }
  }, [isAuthenticated, navigate]);

  if (!isAuthenticated) {
    return null;
  }

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
