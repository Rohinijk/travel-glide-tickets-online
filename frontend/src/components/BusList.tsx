
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useBooking } from "@/context/BookingContext";
import { buses, Bus } from "@/data/busData";
import { Clock, Star, Wifi, Zap, Snowflake, Utensils, Timer } from "lucide-react";
import { format } from "date-fns";

const BusList = () => {
  const { booking, selectBus } = useBooking();
  const { from, to, date } = booking;

  const getAmenityIcon = (amenity: string) => {
    switch(amenity.toLowerCase()) {
      case 'wifi': return <Wifi className="h-4 w-4" />;
      case 'usb charging': return <Zap className="h-4 w-4" />;
      case 'air conditioning': return <Snowflake className="h-4 w-4" />;
      case 'food': case 'snacks': return <Utensils className="h-4 w-4" />;
      default: return null;
    }
  };

  return (
    <div className="mt-8 step-container" style={{ animationDelay: '0.2s' }}>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold text-gray-800">
          {from} to {to}
        </h2>
        <p className="text-gray-600">
          {date ? format(date, "EEE, MMM dd, yyyy") : ""}
        </p>
      </div>

      {buses.length === 0 ? (
        <Card>
          <CardContent className="flex items-center justify-center p-8">
            <p>No buses available for this route on the selected date.</p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {buses.map((bus: Bus) => (
            <Card key={bus.id} className="hover:border-brand-teal transition-colors">
              <CardContent className="p-0">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                  <div className="md:col-span-8 p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-semibold text-lg">{bus.name}</h3>
                        <p className="text-sm text-gray-600">{bus.busType}</p>
                      </div>
                      <div className="flex items-center text-sm bg-green-100 text-green-800 px-2 py-1 rounded">
                        <Star className="h-3 w-3 mr-1 fill-current" />
                        {bus.rating}
                      </div>
                    </div>
                    
                    <div className="flex items-center mt-4 space-x-6">
                      <div>
                        <p className="text-xl font-semibold">{bus.departureTime}</p>
                        <p className="text-xs text-gray-500">Departure</p>
                      </div>
                      
                      <div className="flex-1 flex items-center px-4">
                        <div className="h-[1px] flex-1 bg-gray-300"></div>
                        <div className="mx-2 flex items-center">
                          <Timer className="h-4 w-4 text-gray-400" />
                          <span className="text-xs text-gray-500 ml-1">{bus.duration}</span>
                        </div>
                        <div className="h-[1px] flex-1 bg-gray-300"></div>
                      </div>
                      
                      <div>
                        <p className="text-xl font-semibold">{bus.arrivalTime}</p>
                        <p className="text-xs text-gray-500">Arrival</p>
                      </div>
                    </div>

                    <div className="mt-4 flex flex-wrap gap-2">
                      {bus.amenities.map((amenity, index) => (
                        <div key={index} className="flex items-center text-xs text-gray-600 bg-gray-100 px-2 py-1 rounded">
                          {getAmenityIcon(amenity)}
                          <span className="ml-1">{amenity}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="md:col-span-4 bg-gray-50 p-4 flex flex-col justify-between">
                    <div>
                      <p className="text-xs text-gray-500">Starting from</p>
                      <p className="text-2xl font-bold text-brand-blue">₹{bus.price}</p>
                      <p className="text-xs text-gray-500">{bus.seatsAvailable} seats available</p>
                    </div>
                    
                    <Button 
                      className="mt-4 bg-brand-teal hover:bg-brand-blue transition-colors"
                      onClick={() => selectBus(bus)}
                    >
                      Select Seats
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default BusList;
