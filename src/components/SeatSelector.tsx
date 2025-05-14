
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useBooking } from "@/context/BookingContext";
import { Seat } from "@/data/busData";
import { SteeringWheel } from "lucide-react";

const SeatSelector = () => {
  const { booking, toggleSeatSelection, setStep } = useBooking();
  const { selectedBus, selectedSeats } = booking;

  if (!selectedBus) return null;

  const handleContinue = () => {
    if (selectedSeats.length > 0) {
      setStep(4);
    }
  };

  // Group seats into rows of 4 (2 on each side with an aisle)
  const rows = [];
  const seatsArray = [...selectedBus.seats];
  
  for (let i = 0; i < seatsArray.length; i += 4) {
    rows.push(seatsArray.slice(i, i + 4));
  }

  const isSeatSelected = (seat: Seat) => {
    return selectedSeats.some(s => s.id === seat.id);
  };

  return (
    <div className="mt-8 step-container" style={{ animationDelay: '0.2s' }}>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold text-gray-800">
          Select Seats - {selectedBus.name}
        </h2>
        <Button variant="outline" onClick={() => setStep(2)}>
          Change Bus
        </Button>
      </div>

      <Card className="mb-6">
        <CardContent className="p-6">
          <div className="flex items-center space-x-4 mb-6">
            <div className="flex items-center">
              <div className="w-4 h-4 bg-secondary rounded-sm mr-2"></div>
              <span className="text-sm">Available</span>
            </div>
            <div className="flex items-center">
              <div className="w-4 h-4 bg-brand-teal rounded-sm mr-2"></div>
              <span className="text-sm">Selected</span>
            </div>
            <div className="flex items-center">
              <div className="w-4 h-4 bg-muted rounded-sm mr-2"></div>
              <span className="text-sm">Booked</span>
            </div>
          </div>

          <div className="bus-layout">
            <div className="flex justify-end mb-6">
              <div className="bg-gray-300 rounded-md px-4 py-2 flex items-center">
                <SteeringWheel className="h-6 w-6 text-gray-600" />
                <span className="ml-2 text-sm font-medium">Driver</span>
              </div>
            </div>
            
            <div className="space-y-2">
              {rows.map((row, rowIndex) => (
                <div key={rowIndex} className="flex justify-center">
                  <div className="flex">
                    {row.slice(0, 2).map((seat) => (
                      <div
                        key={seat.id}
                        className={`seat ${seat.isBooked ? 'booked' : isSeatSelected(seat) ? 'selected' : 'available'}`}
                        onClick={() => toggleSeatSelection(seat)}
                      >
                        {seat.number}
                      </div>
                    ))}
                  </div>
                  <div className="w-10"></div> {/* Aisle */}
                  <div className="flex">
                    {row.slice(2).map((seat) => (
                      <div
                        key={seat.id}
                        className={`seat ${seat.isBooked ? 'booked' : isSeatSelected(seat) ? 'selected' : 'available'}`}
                        onClick={() => toggleSeatSelection(seat)}
                      >
                        {seat.number}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="bg-white p-4 shadow rounded-lg sticky bottom-4 mt-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div>
            <p className="text-sm text-gray-600">Selected Seats: {selectedSeats.map(seat => seat.number).join(', ')}</p>
            <p className="text-xl font-bold">Total: ₹{booking.totalPrice}</p>
          </div>
          <Button 
            className="mt-4 md:mt-0 bg-brand-orange hover:bg-opacity-90 w-full md:w-auto"
            disabled={selectedSeats.length === 0}
            onClick={handleContinue}
          >
            Continue
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SeatSelector;
