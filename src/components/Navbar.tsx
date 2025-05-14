
import React from "react";
import { Button } from "@/components/ui/button";
import { useBooking } from "@/context/BookingContext";
import { useAuth } from "@/context/AuthContext";
import { Bus, LogIn, UserPlus, User } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const { resetBooking } = useBooking();
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogoClick = () => {
    resetBooking();
    navigate("/");
  };

  return (
    <nav className="bg-white shadow-sm py-4">
      <div className="container flex items-center justify-between">
        <div className="flex items-center gap-2 cursor-pointer" onClick={handleLogoClick}>
          <Bus className="h-6 w-6 text-brand-teal" />
          <span className="text-xl font-bold text-brand-blue">TravelGlide</span>
        </div>
        
        <div className="hidden md:flex space-x-6 text-sm">
          <Link to="/" className="text-gray-600 hover:text-brand-blue">
            Bus Tickets
          </Link>
          {isAuthenticated && (
            <Link to="/my-bookings" className="text-gray-600 hover:text-brand-blue">
              My Bookings
            </Link>
          )}
          <Link to="/" className="text-gray-600 hover:text-brand-blue">
            Offers
          </Link>
          <Link to="/" className="text-gray-600 hover:text-brand-blue">
            Help
          </Link>
        </div>
        
        <div className="flex items-center gap-4">
          {isAuthenticated ? (
            <>
              <div className="hidden sm:flex items-center gap-2">
                <User className="h-4 w-4 text-gray-500" />
                <span className="text-sm font-medium">{user?.name}</span>
              </div>
              <Button variant="outline" onClick={logout}>
                Logout
              </Button>
            </>
          ) : (
            <>
              <Button 
                variant="outline" 
                className="hidden sm:flex"
                onClick={() => navigate("/auth")}
              >
                <LogIn className="h-4 w-4 mr-2" />
                Sign In
              </Button>
              <Button onClick={() => navigate("/auth")}>
                <UserPlus className="h-4 w-4 mr-2" />
                Sign Up
              </Button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
