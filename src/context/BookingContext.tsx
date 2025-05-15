
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

type PaymentMethod = "online" | "cash";

type BookingState = {
  from: string;
  to: string;
  date: Date | undefined;
  selectedBus: Bus | null;
  selectedSeats: Seat[];
  passenger: Passenger;
  totalPrice: number;
  bookingId: string | null;
  paymentMethod: PaymentMethod;
};

type Booking = BookingState & {
  id: string;
  status: "Confirmed" | "Cancelled" | "Pending";
  bookingDate: Date;
};

type Offer = {
  id: string;
  title: string;
  code: string;
  discount: number;
  validUntil: Date;
  description: string;
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
  currentOffers: Offer[];
  setPaymentMethod: (method: PaymentMethod) => void;
  downloadTicket: (bookingId: string) => void;
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
  bookingId: null,
  paymentMethod: "online"
};

// Sample offers data
const offers: Offer[] = [
  {
    id: "offer1",
    title: "First Trip Discount",
    code: "FIRST10",
    discount: 10,
    validUntil: new Date(2025, 11, 31),
    description: "Get 10% off on your first booking with TravelGlide"
  },
  {
    id: "offer2",
    title: "Weekend Special",
    code: "WEEKEND20",
    discount: 20,
    validUntil: new Date(2025, 5, 30),
    description: "Enjoy 20% off on weekend travels"
  },
  {
    id: "offer3",
    title: "Summer Vacation Offer",
    code: "SUMMER15",
    discount: 15, 
    validUntil: new Date(2025, 8, 30),
    description: "15% discount on all summer bookings"
  }
];

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
  
  const setPaymentMethod = (method: PaymentMethod) => {
    setBooking(prev => ({
      ...prev,
      paymentMethod: method
    }));
  };
  
  const downloadTicket = (bookingId: string) => {
    const booking = savedBookings.find(b => b.id === bookingId);
    if (!booking) return;
    
    // Generate a simple text-based ticket
    const ticketContent = `
      ===== TRAVELGLIDE E-TICKET =====
      
      BOOKING ID: ${booking.bookingId}
      
      FROM: ${booking.from}
      TO: ${booking.to}
      DATE: ${booking.date ? new Date(booking.date).toLocaleDateString() : 'N/A'}
      TIME: ${booking.selectedBus?.departureTime || 'N/A'} - ${booking.selectedBus?.arrivalTime || 'N/A'}
      
      PASSENGER: ${booking.passenger.name}
      SEAT(S): ${booking.selectedSeats.map(s => s.number).join(', ')}
      
      TOTAL PAID: ₹${booking.totalPrice.toFixed(2)}
      PAYMENT METHOD: ${booking.paymentMethod}
      
      ==== Thank you for choosing TravelGlide ====
    `;
    
    // Create a Blob and download it
    const blob = new Blob([ticketContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `TravelGlide-Ticket-${bookingId}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    toast({
      title: "Ticket Downloaded",
      description: "Your e-ticket has been downloaded successfully."
    });
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
    cancelBooking,
    currentOffers: offers,
    setPaymentMethod,
    downloadTicket
  };

  return (
    <BookingContext.Provider value={value}>
      {children}
    </BookingContext.Provider>
  );
};
