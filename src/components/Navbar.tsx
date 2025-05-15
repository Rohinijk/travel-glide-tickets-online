
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { useBooking } from "@/context/BookingContext";
import { useAuth } from "@/context/AuthContext";
import { Bus, LogIn, UserPlus, User, MessageCircle } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";

const Navbar = () => {
  const { resetBooking } = useBooking();
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const [feedbackText, setFeedbackText] = useState("");
  const [isFeedbackDialogOpen, setIsFeedbackDialogOpen] = useState(false);

  const handleLogoClick = () => {
    resetBooking();
    navigate("/");
  };

  const handleFeedbackSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (feedbackText.trim()) {
      toast({
        title: "Feedback Received",
        description: "Thank you for your feedback! We'll review it shortly.",
      });
      setFeedbackText("");
      setIsFeedbackDialogOpen(false);
    } else {
      toast({
        title: "Feedback Required",
        description: "Please enter your feedback before submitting.",
        variant: "destructive"
      });
    }
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
          <Link to="/offers" className="text-gray-600 hover:text-brand-blue">
            Offers
          </Link>
          <Dialog open={isFeedbackDialogOpen} onOpenChange={setIsFeedbackDialogOpen}>
            <DialogTrigger asChild>
              <button className="text-gray-600 hover:text-brand-blue">
                Feedback
              </button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Share Your Feedback</DialogTitle>
                <DialogDescription>
                  We value your feedback to improve our services. Please let us know your thoughts.
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleFeedbackSubmit}>
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label htmlFor="feedback">Your Feedback</Label>
                    <Textarea 
                      id="feedback" 
                      placeholder="Tell us what you think..." 
                      required 
                      className="min-h-[120px]"
                      value={feedbackText}
                      onChange={(e) => setFeedbackText(e.target.value)} 
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button type="submit">Submit Feedback</Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
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
