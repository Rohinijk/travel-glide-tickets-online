import React from "react";
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
import { CalendarDays, Clock, MapPin, User, Download, Ticket, MessageSquare, CreditCard, Wallet } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const BookingsList = () => {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const { savedBookings, cancelBooking, downloadTicket, currentOffers } = useBooking();
  
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

  return (
    <div>
      {/* Current Offers Section */}
      <div className="mb-6">
        <h2 className="text-xl font-bold mb-3">Current Offers</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {currentOffers.map(offer => (
            <Card key={offer.id} className="bg-gradient-to-r from-blue-50 to-teal-50 border-2 border-brand-blue/20">
              <CardHeader className="pb-2">
                <div className="flex justify-between">
                  <CardTitle className="text-lg text-brand-blue">{offer.title}</CardTitle>
                  <div className="bg-brand-teal text-white px-2 py-1 rounded-full text-xs font-bold">
                    {offer.discount}% OFF
                  </div>
                </div>
                <CardDescription>Use code: <span className="font-mono font-bold">{offer.code}</span></CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600">{offer.description}</p>
                <p className="text-xs mt-2 text-gray-500">
                  Valid until: {format(new Date(offer.validUntil), "MMM dd, yyyy")}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
      
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
                  
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="h-8 flex gap-1"
                    onClick={() => {
                      toast({
                        title: "Feedback",
                        description: "Thanks for your interest! Our feedback system will be available soon."
                      });
                    }}
                  >
                    <MessageSquare className="h-4 w-4" /> Feedback
                  </Button>
                  
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
