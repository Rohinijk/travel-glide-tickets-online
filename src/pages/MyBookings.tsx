
import React from "react";
import { useAuth } from "@/context/AuthContext";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { BookingProvider } from "@/context/BookingContext";

// Mock booking data - in a real app, this would come from an API
const mockBookings = [
  {
    id: "BK-123456",
    from: "New York",
    to: "Boston",
    date: "2025-05-20",
    busName: "Express Deluxe",
    seats: ["A1", "A2"],
    totalPrice: 78.50,
    status: "Confirmed",
  },
  {
    id: "BK-789012",
    from: "Chicago",
    to: "Detroit",
    date: "2025-06-15",
    busName: "Night Rider",
    seats: ["B5"],
    totalPrice: 45.75,
    status: "Confirmed",
  },
];

const MyBookings = () => {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (!isAuthenticated) {
      navigate("/auth");
    }
  }, [isAuthenticated, navigate]);

  if (!isAuthenticated) {
    return null;
  }

  return (
    <BookingProvider>
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Navbar />
        <div className="container py-8">
          <h1 className="text-2xl font-bold mb-6">My Bookings</h1>
          
          {mockBookings.length > 0 ? (
            <div className="grid gap-4">
              {mockBookings.map((booking) => (
                <Card key={booking.id} className="overflow-hidden">
                  <CardHeader className="bg-brand-blue/5 pb-3">
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-lg">{booking.from} to {booking.to}</CardTitle>
                        <CardDescription>Booking ID: {booking.id}</CardDescription>
                      </div>
                      <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs font-medium">
                        {booking.status}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-4">
                    <div className="grid gap-3">
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <p className="text-sm text-gray-500">Date</p>
                          <p className="font-medium">{new Date(booking.date).toLocaleDateString()}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Bus</p>
                          <p className="font-medium">{booking.busName}</p>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <p className="text-sm text-gray-500">Seats</p>
                          <p className="font-medium">{booking.seats.join(", ")}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Total Price</p>
                          <p className="font-medium">${booking.totalPrice.toFixed(2)}</p>
                        </div>
                      </div>
                      <div className="flex gap-2 mt-2">
                        <Button variant="outline" className="text-xs h-8">Download Ticket</Button>
                        <Button variant="outline" className="text-xs h-8">Cancel Booking</Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <h3 className="text-lg font-medium mb-2">No bookings found</h3>
              <p className="text-gray-500 mb-6">You haven't made any bookings yet.</p>
              <Button onClick={() => navigate("/")}>Book a Trip</Button>
            </div>
          )}
        </div>
      </div>
    </BookingProvider>
  );
};

export default MyBookings;
