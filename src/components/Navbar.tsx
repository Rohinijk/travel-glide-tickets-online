
import React from "react";
import { Button } from "@/components/ui/button";
import { useBooking } from "@/context/BookingContext";
import { Bus } from "lucide-react";

const Navbar = () => {
  const { resetBooking } = useBooking();

  return (
    <nav className="bg-white shadow-sm py-4">
      <div className="container flex items-center justify-between">
        <div className="flex items-center gap-2" onClick={resetBooking}>
          <Bus className="h-6 w-6 text-brand-teal" />
          <span className="text-xl font-bold text-brand-blue">TravelGlide</span>
        </div>
        
        <div className="hidden md:flex space-x-6 text-sm">
          <button className="text-gray-600 hover:text-brand-blue">Bus Tickets</button>
          <button className="text-gray-600 hover:text-brand-blue">My Bookings</button>
          <button className="text-gray-600 hover:text-brand-blue">Offers</button>
          <button className="text-gray-600 hover:text-brand-blue">Help</button>
        </div>
        
        <div className="flex items-center gap-4">
          <Button variant="outline" className="hidden sm:flex">
            Sign In
          </Button>
          <Button>Sign Up</Button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
