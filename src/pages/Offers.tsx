
import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import { Ticket, Star, Info, CalendarDays } from "lucide-react";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { toast } from "@/hooks/use-toast";

const Offers = () => {
  const navigate = useNavigate();
  const [selectedOffer, setSelectedOffer] = useState(null);

  const offers = [
    {
      id: 1,
      title: "10% Off on First Trip",
      code: "FIRST10",
      description: "Get 10% off on your first bus journey with us. Valid for new users only.",
      validity: "2025-06-30",
      discount: 10
    },
    {
      id: 2,
      title: "Weekend Special",
      code: "WEEKEND25",
      description: "25% discount on all weekend trips. Book your weekend getaway now!",
      validity: "2025-12-31",
      discount: 25
    },
    {
      id: 3,
      title: "Group Booking Discount",
      code: "GROUP15",
      description: "15% off when you book for 4 or more passengers together.",
      validity: "2025-12-31",
      discount: 15
    },
    {
      id: 4,
      title: "Early Bird Offer",
      code: "EARLY20",
      description: "Book 30 days in advance and get 20% off on your ticket.",
      validity: "2025-12-31",
      discount: 20
    },
  ];

  const handleBookWithOffer = (code) => {
    // Store the offer code in sessionStorage to use in booking flow
    sessionStorage.setItem("selectedOfferCode", code);
    navigate("/");
    toast({
      title: "Offer Applied",
      description: `Offer code ${code} has been applied to your next booking.`,
    });
  };

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
            <div 
              key={offer.id} 
              className="bg-white rounded-lg shadow-md p-6 border border-gray-100 hover:shadow-lg transition-shadow cursor-pointer" 
              onClick={() => setSelectedOffer(offer)}
            >
              <div className="flex justify-between items-start">
                <h2 className="text-lg font-semibold text-brand-blue">{offer.title}</h2>
                <Star className="h-5 w-5 text-amber-400" />
              </div>
              
              <div className="mt-3 inline-block bg-gray-100 px-3 py-1 rounded-full text-sm font-medium text-gray-700">
                {offer.code}
              </div>
              
              <p className="mt-4 text-gray-600">{offer.description}</p>
              
              <div className="mt-4 text-xs font-medium text-gray-500">
                Valid till {format(new Date(offer.validity), "MMMM dd, yyyy")}
              </div>

              <Button 
                className="mt-4 w-full bg-brand-teal hover:bg-brand-blue"
                onClick={(e) => {
                  e.stopPropagation(); // Prevent triggering the card's onClick
                  handleBookWithOffer(offer.code);
                }}
              >
                Book with this offer
              </Button>
            </div>
          ))}
        </div>
      </div>

      {/* Offer Details Dialog */}
      {selectedOffer && (
        <Dialog open={selectedOffer !== null} onOpenChange={() => setSelectedOffer(null)}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="flex justify-between items-center">
                <span>{selectedOffer.title}</span>
                <span className="bg-brand-teal text-white px-2 py-1 rounded-full text-xs font-bold">
                  {selectedOffer.discount}% OFF
                </span>
              </DialogTitle>
              <DialogDescription>
                Use code: <span className="font-mono font-bold">{selectedOffer.code}</span>
              </DialogDescription>
            </DialogHeader>
            
            <div className="py-4">
              <h4 className="font-medium mb-2">Offer Details</h4>
              <p className="text-gray-700">{selectedOffer.description}</p>
              
              <div className="mt-4 p-3 bg-gray-50 rounded-md">
                <div className="flex items-center gap-2 text-sm">
                  <CalendarDays className="h-4 w-4 text-gray-500" />
                  <span className="text-gray-600">
                    Valid until: {format(new Date(selectedOffer.validity), "MMMM dd, yyyy")}
                  </span>
                </div>
                
                <div className="flex items-center gap-2 mt-2 text-sm">
                  <Info className="h-4 w-4 text-gray-500" />
                  <span className="text-gray-600">Applicable on all bookings</span>
                </div>
              </div>
            </div>
            
            <DialogFooter>
              <Button 
                onClick={() => {
                  handleBookWithOffer(selectedOffer.code);
                  setSelectedOffer(null);
                }} 
                className="w-full"
              >
                Book Now with Offer
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default Offers;
