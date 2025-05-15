import React, { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { BookingProvider, useBooking } from "@/context/BookingContext";
import { format } from "date-fns";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
  DialogClose
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { CalendarDays, Clock, MapPin, User, Download, Ticket, MessageSquare } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const BookingsList = () => {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const { savedBookings, cancelBooking, downloadTicket } = useBooking();
  const [feedbackText, setFeedbackText] = useState("");
  
  if (!isAuthenticated) {
    React.useEffect(() => {
      navigate("/auth");
    }, [navigate]);
    return null;
  }
  
  if (savedBookings.length === 0) {
    return (
      <div className="text-center py-12">
        <h3 className="text-lg font-medium mb-2">No bookings found</h3>
        <p className="text-gray-500 mb-6">You haven't made any bookings yet.</p>
        <Button onClick={() => navigate("/")}>Book a Trip</Button>
      </div>
    );
  }

  const formatDate = (dateString: string | Date) => {
    const date = typeof dateString === 'string' ? new Date(dateString) : dateString;
    return format(date, "EEE, MMM dd, yyyy");
  };

  const handleFeedbackSubmit = () => {
    if (feedbackText.trim()) {
      toast({
        title: "Feedback Submitted",
        description: "Thank you for your feedback! We'll review it soon."
      });
      setFeedbackText("");
    } else {
      toast({
        title: "Feedback Required",
        description: "Please enter your feedback before submitting.",
        variant: "destructive"
      });
    }
  };

  return (
    <div>      
      <h2 className="text-xl font-bold mb-3">Your Bookings</h2>
      <div className="grid gap-4">
        {savedBookings.map((booking) => (
          <Card key={booking.id} className="overflow-hidden">
            <CardHeader className={`${booking.status === "Cancelled" ? "bg-red-50" : "bg-brand-blue/5"} pb-3`}>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-lg">{booking.from} to {booking.to}</CardTitle>
                  <CardDescription>Booking ID: {booking.id}</CardDescription>
                </div>
                <div className={`${
                  booking.status === "Cancelled" 
                    ? "bg-red-100 text-red-800" 
                    : "bg-green-100 text-green-800"
                  } px-3 py-1 rounded-full text-xs font-medium`}>
                  {booking.status}
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-4">
              <div className="grid gap-3">
                <div className="grid grid-cols-2 gap-2">
                  <div className="flex items-center gap-2">
                    <CalendarDays className="h-4 w-4 text-gray-500" />
                    <div>
                      <p className="text-sm text-gray-500">Date</p>
                      <p className="font-medium">{booking.date ? formatDate(booking.date) : "N/A"}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-gray-500" />
                    <div>
                      <p className="text-sm text-gray-500">Bus</p>
                      <p className="font-medium">{booking.selectedBus?.name || "N/A"}</p>
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4 text-gray-500" />
                    <div>
                      <p className="text-sm text-gray-500">Passenger</p>
                      <p className="font-medium">{booking.passenger.name}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-gray-500" />
                    <div>
                      <p className="text-sm text-gray-500">Journey Time</p>
                      <p className="font-medium">
                        {booking.selectedBus ? `${booking.selectedBus.departureTime} - ${booking.selectedBus.arrivalTime}` : "N/A"}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <p className="text-sm text-gray-500">Seats</p>
                    <p className="font-medium">{booking.selectedSeats.map(seat => seat.number).join(", ")}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Total Price</p>
                    <p className="font-medium">₹{booking.totalPrice.toFixed(2)}</p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2 mt-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="h-8 flex gap-1" 
                    onClick={() => downloadTicket(booking.id)}
                  >
                    <Download className="h-4 w-4" /> Download Ticket
                  </Button>
                  
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="h-8 flex gap-1"
                      >
                        <MessageSquare className="h-4 w-4" /> Feedback
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Share Your Feedback</DialogTitle>
                        <DialogDescription>
                          Let us know about your experience with this booking.
                        </DialogDescription>
                      </DialogHeader>
                      <div className="py-4">
                        <Label htmlFor="feedback" className="text-sm">Your Feedback</Label>
                        <Textarea 
                          id="feedback" 
                          placeholder="Please share your experience with this journey..."
                          value={feedbackText}
                          onChange={(e) => setFeedbackText(e.target.value)}
                          className="mt-1 h-32"
                        />
                      </div>
                      <DialogFooter>
                        <DialogClose asChild>
                          <Button variant="outline">Cancel</Button>
                        </DialogClose>
                        <Button onClick={handleFeedbackSubmit}>Submit Feedback</Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                  
                  {booking.status !== "Cancelled" && (
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button variant="outline" size="sm" className="h-8 text-red-600 border-red-200 hover:bg-red-50">
                          Cancel Booking
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Are you sure you want to cancel?</AlertDialogTitle>
                          <AlertDialogDescription>
                            This action will cancel your booking. A refund of ₹{booking.totalPrice.toFixed(2)} will be processed to your original payment method within 5-7 business days.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Keep My Booking</AlertDialogCancel>
                          <AlertDialogAction 
                            onClick={() => cancelBooking(booking.id)}
                            className="bg-red-600 hover:bg-red-700"
                          >
                            Yes, Cancel Booking
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

const MyBookings = () => {
  return (
    <BookingProvider>
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Navbar />
        <div className="container py-8">
          <h1 className="text-2xl font-bold mb-6">My Bookings</h1>
          <BookingsList />
        </div>
      </div>
    </BookingProvider>
  );
};

export default MyBookings;
