
import React from "react";
import Navbar from "@/components/Navbar";
import { Ticket, Star } from "lucide-react";

const Offers = () => {
  const offers = [
    {
      id: 1,
      title: "10% Off on First Trip",
      code: "FIRST10",
      description: "Get 10% off on your first bus journey with us. Valid for new users only.",
      validity: "Valid till June 30, 2025",
    },
    {
      id: 2,
      title: "Weekend Special",
      code: "WEEKEND25",
      description: "25% discount on all weekend trips. Book your weekend getaway now!",
      validity: "Valid for all weekend bookings",
    },
    {
      id: 3,
      title: "Group Booking Discount",
      code: "GROUP15",
      description: "15% off when you book for 4 or more passengers together.",
      validity: "No expiration date",
    },
    {
      id: 4,
      title: "Early Bird Offer",
      code: "EARLY20",
      description: "Book 30 days in advance and get 20% off on your ticket.",
      validity: "Always available for advance bookings",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="container py-8">
        <div className="flex items-center gap-3 mb-6">
          <Ticket className="h-6 w-6 text-brand-teal" />
          <h1 className="text-2xl font-bold text-gray-900">Current Offers & Promotions</h1>
        </div>
        
        <p className="text-gray-600 mb-8">
          Take advantage of these exclusive offers to save on your next bus journey.
          Use the promo codes during checkout to redeem these offers.
        </p>
        
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {offers.map((offer) => (
            <div key={offer.id} className="bg-white rounded-lg shadow-md p-6 border border-gray-100 hover:shadow-lg transition-shadow">
              <div className="flex justify-between items-start">
                <h2 className="text-lg font-semibold text-brand-blue">{offer.title}</h2>
                <Star className="h-5 w-5 text-amber-400" />
              </div>
              
              <div className="mt-3 inline-block bg-gray-100 px-3 py-1 rounded-full text-sm font-medium text-gray-700">
                {offer.code}
              </div>
              
              <p className="mt-4 text-gray-600">{offer.description}</p>
              
              <div className="mt-4 text-xs font-medium text-gray-500">
                {offer.validity}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Offers;
