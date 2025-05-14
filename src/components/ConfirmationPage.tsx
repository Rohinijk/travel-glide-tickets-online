
import React, { useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useBooking } from "@/context/BookingContext";
import { CheckCircle, Download, Bus, MapPin, Calendar, User, Phone, Mail } from "lucide-react";
import { format } from "date-fns";

const ConfirmationPage = () => {
  const { booking, completeBooking, resetBooking } = useBooking();
  
  useEffect(() => {
    if (!booking.bookingId) {
      completeBooking();
    }
  }, [booking.bookingId, completeBooking]);

  if (!booking.selectedBus || !booking.date) {
    return null;
  }

  const handleDownloadTicket = () => {
    // In a real app, this would generate a PDF ticket
    alert("This would download your ticket in a real application!");
  };

  const handleBookNew = () => {
    resetBooking();
  };

  const formatDate = (date: Date) => {
    return format(date, "EEE, MMM dd, yyyy");
  };
  
  return (
    <div className="mt-8 step-container" style={{ animationDelay: '0.2s' }}>
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 mb-4">
            <CheckCircle className="h-8 w-8 text-green-600" />
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Booking Confirmed!</h1>
          <p className="text-gray-600 mt-2">Your tickets have been booked successfully</p>
        </div>
        
        <Card className="mb-8 overflow-hidden">
          <div className="bg-brand-blue text-white p-4">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="font-semibold">Booking ID</h2>
                <p className="text-lg">{booking.bookingId}</p>
              </div>
              <Button variant="outline" className="text-white border-white hover:bg-white hover:text-brand-blue" onClick={handleDownloadTicket}>
                <Download className="mr-2 h-4 w-4" />
                Download Ticket
              </Button>
            </div>
          </div>
          
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold text-gray-600 mb-3 flex items-center">
                  <Bus className="mr-2 h-4 w-4" />
                  Bus Details
                </h3>
                <div className="space-y-2">
                  <p className="font-medium">{booking.selectedBus.name}</p>
                  <p className="text-sm text-gray-600">{booking.selectedBus.busType}</p>
                  <div className="flex items-center space-x-4 text-sm">
                    <p className="font-medium">{booking.selectedBus.departureTime}</p>
                    <div className="border-t border-gray-300 flex-1"></div>
                    <p className="font-medium">{booking.selectedBus.arrivalTime}</p>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="font-semibold text-gray-600 mb-3 flex items-center">
                  <MapPin className="mr-2 h-4 w-4" />
                  Journey Details
                </h3>
                <div className="space-y-2">
                  <div className="flex items-start">
                    <div className="w-24 text-sm text-gray-600">From:</div>
                    <div className="font-medium">{booking.from}</div>
                  </div>
                  <div className="flex items-start">
                    <div className="w-24 text-sm text-gray-600">To:</div>
                    <div className="font-medium">{booking.to}</div>
                  </div>
                  <div className="flex items-start">
                    <div className="w-24 text-sm text-gray-600">Date:</div>
                    <div className="font-medium">{formatDate(booking.date)}</div>
                  </div>
                  <div className="flex items-start">
                    <div className="w-24 text-sm text-gray-600">Seats:</div>
                    <div className="font-medium">{booking.selectedSeats.map(seat => seat.number).join(', ')}</div>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="font-semibold text-gray-600 mb-3 flex items-center">
                  <User className="mr-2 h-4 w-4" />
                  Passenger Details
                </h3>
                <div className="space-y-2">
                  <div className="flex items-start">
                    <div className="w-24 text-sm text-gray-600">Name:</div>
                    <div className="font-medium">{booking.passenger.name}</div>
                  </div>
                  <div className="flex items-start">
                    <div className="w-24 text-sm text-gray-600">Age:</div>
                    <div className="font-medium">{booking.passenger.age}</div>
                  </div>
                  <div className="flex items-start">
                    <div className="w-24 text-sm text-gray-600">Gender:</div>
                    <div className="font-medium">{booking.passenger.gender}</div>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="font-semibold text-gray-600 mb-3 flex items-center">
                  <Phone className="mr-2 h-4 w-4" />
                  Contact Details
                </h3>
                <div className="space-y-2">
                  <div className="flex items-start">
                    <div className="w-24 text-sm text-gray-600">Email:</div>
                    <div className="font-medium text-brand-blue">
                      <div className="flex items-center">
                        <Mail className="h-4 w-4 mr-1" />
                        {booking.passenger.email}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="w-24 text-sm text-gray-600">Phone:</div>
                    <div className="font-medium">
                      <div className="flex items-center">
                        <Phone className="h-4 w-4 mr-1" />
                        {booking.passenger.phone}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-6 pt-6 border-t">
              <h3 className="font-semibold text-gray-600 mb-3">Payment Summary</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Base Fare</span>
                  <span>₹{booking.totalPrice}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Service Fee</span>
                  <span>₹50</span>
                </div>
                <div className="flex justify-between font-semibold pt-2 border-t">
                  <span>Total Amount Paid</span>
                  <span className="text-brand-blue">₹{booking.totalPrice + 50}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <div className="text-center space-y-4">
          <p className="text-gray-600">Thank you for booking with TravelGlide!</p>
          <Button onClick={handleBookNew} className="bg-brand-teal hover:bg-brand-blue transition-colors">
            Book Another Trip
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationPage;
