
export type Seat = {
  id: string;
  number: string;
  isBooked: boolean;
  price: number;
};

export type Bus = {
  id: string;
  name: string;
  departureTime: string;
  arrivalTime: string;
  duration: string;
  price: number;
  seatsAvailable: number;
  rating: number;
  amenities: string[];
  busType: string;
  seats: Seat[];
};

const generateSeats = (busId: string, totalSeats: number, bookedSeatIndices: number[], basePrice: number): Seat[] => {
  const seats: Seat[] = [];
  for (let i = 1; i <= totalSeats; i++) {
    const seatNumber = i.toString().padStart(2, '0');
    seats.push({
      id: `${busId}-seat-${seatNumber}`,
      number: seatNumber,
      isBooked: bookedSeatIndices.includes(i),
      price: basePrice + (Math.random() < 0.3 ? 50 : 0) // Some seats slightly more expensive
    });
  }
  return seats;
};

export const buses: Bus[] = [
  {
    id: "bus-001",
    name: "TravelGlide Express",
    departureTime: "07:00",
    arrivalTime: "11:30",
    duration: "4h 30m",
    price: 450,
    seatsAvailable: 25,
    rating: 4.8,
    amenities: ["WiFi", "USB Charging", "Air Conditioning", "Snacks"],
    busType: "Volvo AC Sleeper",
    seats: generateSeats("bus-001", 30, [1, 4, 8, 12, 20], 450)
  },
  {
    id: "bus-002",
    name: "WonderTour Deluxe",
    departureTime: "09:30",
    arrivalTime: "14:45",
    duration: "5h 15m",
    price: 380,
    seatsAvailable: 18,
    rating: 4.5,
    amenities: ["WiFi", "Air Conditioning", "Blankets"],
    busType: "AC Seater",
    seats: generateSeats("bus-002", 25, [2, 5, 9, 13, 17, 21, 22], 380)
  },
  {
    id: "bus-003",
    name: "FleetCruise Premium",
    departureTime: "14:00",
    arrivalTime: "19:15",
    duration: "5h 15m",
    price: 500,
    seatsAvailable: 22,
    rating: 4.9,
    amenities: ["WiFi", "USB Charging", "Air Conditioning", "TV", "Food"],
    busType: "Volvo AC Sleeper Premium",
    seats: generateSeats("bus-003", 28, [3, 7, 11, 15, 23, 24], 500)
  },
  {
    id: "bus-004",
    name: "RapidCoach Standard",
    departureTime: "18:30",
    arrivalTime: "23:00",
    duration: "4h 30m",
    price: 320,
    seatsAvailable: 30,
    rating: 4.2,
    amenities: ["Air Conditioning"],
    busType: "Non-AC Sleeper",
    seats: generateSeats("bus-004", 35, [6, 10, 14, 19, 25, 28, 32], 320)
  },
  {
    id: "bus-005",
    name: "OceanTour Luxury",
    departureTime: "22:00",
    arrivalTime: "04:30",
    duration: "6h 30m",
    price: 550,
    seatsAvailable: 15,
    rating: 4.7,
    amenities: ["WiFi", "USB Charging", "Air Conditioning", "Blankets", "Pillows", "Snacks", "Washroom"],
    busType: "Volvo AC Sleeper Luxury",
    seats: generateSeats("bus-005", 20, [2, 8, 13, 16], 550)
  }
];

export const popularRoutes = [
  { from: "New York", to: "Boston" },
  { from: "Los Angeles", to: "San Francisco" },
  { from: "Chicago", to: "Detroit" },
  { from: "Miami", to: "Orlando" },
  { from: "Seattle", to: "Portland" },
  { from: "Austin", to: "Houston" }
];

export const cities = [
  "New York",
  "Los Angeles",
  "Chicago",
  "Houston",
  "Phoenix",
  "Philadelphia",
  "San Antonio",
  "San Diego",
  "Dallas",
  "San Jose",
  "Austin",
  "Jacksonville",
  "Fort Worth",
  "Columbus",
  "Charlotte",
  "Indianapolis",
  "San Francisco",
  "Seattle",
  "Denver",
  "Boston"
];
