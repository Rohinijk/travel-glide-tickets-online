
import React, { createContext, useContext, useState, ReactNode } from "react";
import { toast } from "@/hooks/use-toast";

type Seat = {
  id: string;
  number: string;
  isBooked: boolean;
  price: number;
};

type Bus = {
  id: string;
  name: string;
  departureTime: string;
  arrivalTime: string;
  duration: string;
  price: number;
  seatsAvailable: number;
  rating: number;
  busType: string;
  amenities: string[];
  seats: Seat[];
};

type Passenger = {
  name: string;
  age: string;
  gender: string;
  email: string;
  phone: string;
};

type BookingState = {
  from: string;
  to: string;
  date: Date | undefined;
  selectedBus: Bus | null;
  selectedSeats: Seat[];
  passenger: Passenger;
  totalPrice: number;
  bookingId: string | null;
};

type Booking = BookingState & {
  id: string;
  status: "Confirmed" | "Cancelled" | "Pending";
  bookingDate: Date;
};

type BookingContextType = {
  booking: BookingState;
  step: number;
  setStep: (step: number) => void;
  setSearchParams: (from: string, to: string, date: Date) => void;
  selectBus: (bus: Bus) => void;
  toggleSeatSelection: (seat: Seat) => void;
  setPassengerInfo: (passenger: Passenger) => void;
  completeBooking: () => void;
  resetBooking: () => void;
  savedBookings: Booking[];
  cancelBooking: (bookingId: string) => void;
};

const initialState: BookingState = {
  from: "",
  to: "",
  date: undefined,
  selectedBus: null,
  selectedSeats: [],
  passenger: {
    name: "",
    age: "",
    gender: "",
    email: "",
    phone: ""
  },
  totalPrice: 0,
  bookingId: null
};

const BookingContext = createContext<BookingContextType | undefined>(undefined);

export const useBooking = () => {
  const context = useContext(BookingContext);
  if (!context) {
    throw new Error("useBooking must be used within a BookingProvider");
  }
  return context;
};

export const BookingProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [booking, setBooking] = useState<BookingState>(initialState);
  const [step, setStep] = useState(1);
  const [savedBookings, setSavedBookings] = useState<Booking[]>([]);

  // Get saved bookings from localStorage on initial load
  React.useEffect(() => {
    const storedBookings = localStorage.getItem('travelGlideBookings');
    if (storedBookings) {
      try {
        const parsedBookings = JSON.parse(storedBookings);
        setSavedBookings(parsedBookings);
      } catch (error) {
        console.error("Error parsing saved bookings:", error);
      }
    }
  }, []);

  const setSearchParams = (from: string, to: string, date: Date) => {
    setBooking(prev => ({
      ...prev,
      from,
      to,
      date
    }));
    setStep(2);
  };

  const selectBus = (bus: Bus) => {
    setBooking(prev => ({
      ...prev,
      selectedBus: bus,
      selectedSeats: []
    }));
    setStep(3);
  };

  const toggleSeatSelection = (seat: Seat) => {
    if (seat.isBooked) return;
    
    setBooking(prev => {
      const isSelected = prev.selectedSeats.some(s => s.id === seat.id);
      let newSeats: Seat[];
      let newTotalPrice = prev.totalPrice;
      
      if (isSelected) {
        newSeats = prev.selectedSeats.filter(s => s.id !== seat.id);
        newTotalPrice -= seat.price;
      } else {
        newSeats = [...prev.selectedSeats, seat];
        newTotalPrice += seat.price;
      }
      
      return {
        ...prev,
        selectedSeats: newSeats,
        totalPrice: newTotalPrice
      };
    });
  };

  const setPassengerInfo = (passenger: Passenger) => {
    setBooking(prev => ({
      ...prev,
      passenger
    }));
    setStep(5);
  };

  const generateBookingId = () => {
    return `BK-${Math.floor(100000 + Math.random() * 900000)}`;
  };

  const completeBooking = () => {
    const newBookingId = generateBookingId();
    
    setBooking(prev => ({
      ...prev,
      bookingId: newBookingId
    }));
    
    // Save the completed booking to our list of bookings
    const newBooking: Booking = {
      ...booking,
      id: newBookingId,
      bookingId: newBookingId,
      status: "Confirmed",
      bookingDate: new Date()
    };
    
    const updatedBookings = [...savedBookings, newBooking];
    setSavedBookings(updatedBookings);
    
    // Save to localStorage for persistence
    localStorage.setItem('travelGlideBookings', JSON.stringify(updatedBookings));
  };
  
  const cancelBooking = (bookingId: string) => {
    const bookingIndex = savedBookings.findIndex(b => b.id === bookingId);
    
    if (bookingIndex !== -1) {
      const updatedBookings = [...savedBookings];
      updatedBookings[bookingIndex] = {
        ...updatedBookings[bookingIndex],
        status: "Cancelled"
      };
      
      setSavedBookings(updatedBookings);
      localStorage.setItem('travelGlideBookings', JSON.stringify(updatedBookings));
      
      toast({
        title: "Booking Cancelled",
        description: `Your booking ${bookingId} has been cancelled. A refund of $${savedBookings[bookingIndex].totalPrice.toFixed(2)} will be processed within 5-7 business days.`
      });
    }
  };

  const resetBooking = () => {
    setBooking(initialState);
    setStep(1);
  };

  const value: BookingContextType = {
    booking,
    step,
    setStep,
    setSearchParams,
    selectBus,
    toggleSeatSelection,
    setPassengerInfo,
    completeBooking,
    resetBooking,
    savedBookings,
    cancelBooking
  };

  return (
    <BookingContext.Provider value={value}>
      {children}
    </BookingContext.Provider>
  );
};
