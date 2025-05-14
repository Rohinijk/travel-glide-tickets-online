
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useBooking } from "@/context/BookingContext";
import { toast } from "sonner";

const PassengerForm = () => {
  const { booking, setPassengerInfo, setStep } = useBooking();
  const { selectedSeats } = booking;

  const [passengerData, setPassengerData] = useState({
    name: "",
    age: "",
    gender: "male",
    email: "",
    phone: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [termsAccepted, setTermsAccepted] = useState(false);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!passengerData.name.trim()) {
      newErrors.name = "Name is required";
    }
    
    if (!passengerData.age.trim()) {
      newErrors.age = "Age is required";
    } else if (isNaN(Number(passengerData.age)) || Number(passengerData.age) < 1 || Number(passengerData.age) > 120) {
      newErrors.age = "Enter a valid age";
    }
    
    if (!passengerData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^\S+@\S+\.\S+$/.test(passengerData.email)) {
      newErrors.email = "Enter a valid email";
    }
    
    if (!passengerData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!/^\d{10}$/.test(passengerData.phone)) {
      newErrors.phone = "Enter a valid 10-digit phone number";
    }
    
    if (!termsAccepted) {
      newErrors.terms = "You must accept the terms and conditions";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPassengerData(prev => ({ ...prev, [name]: value }));
    
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  const handleGenderChange = (value: string) => {
    setPassengerData(prev => ({ ...prev, gender: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      setPassengerInfo(passengerData);
      toast.success("Passenger details saved successfully!");
    }
  };

  return (
    <div className="mt-8 step-container" style={{ animationDelay: '0.2s' }}>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold text-gray-800">
          Passenger Details
        </h2>
        <Button variant="outline" onClick={() => setStep(3)}>
          Back to Seat Selection
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Enter Passenger Information</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      name="name"
                      value={passengerData.name}
                      onChange={handleChange}
                      placeholder="Enter your full name"
                      className={errors.name ? "border-red-500" : ""}
                    />
                    {errors.name && <p className="text-red-500 text-xs">{errors.name}</p>}
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="age">Age</Label>
                    <Input
                      id="age"
                      name="age"
                      value={passengerData.age}
                      onChange={handleChange}
                      placeholder="Enter your age"
                      className={errors.age ? "border-red-500" : ""}
                    />
                    {errors.age && <p className="text-red-500 text-xs">{errors.age}</p>}
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label>Gender</Label>
                  <RadioGroup 
                    value={passengerData.gender} 
                    onValueChange={handleGenderChange}
                    className="flex space-x-4"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="male" id="male" />
                      <Label htmlFor="male">Male</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="female" id="female" />
                      <Label htmlFor="female">Female</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="other" id="other" />
                      <Label htmlFor="other">Other</Label>
                    </div>
                  </RadioGroup>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={passengerData.email}
                      onChange={handleChange}
                      placeholder="your@email.com"
                      className={errors.email ? "border-red-500" : ""}
                    />
                    {errors.email && <p className="text-red-500 text-xs">{errors.email}</p>}
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      name="phone"
                      value={passengerData.phone}
                      onChange={handleChange}
                      placeholder="10-digit phone number"
                      className={errors.phone ? "border-red-500" : ""}
                    />
                    {errors.phone && <p className="text-red-500 text-xs">{errors.phone}</p>}
                  </div>
                </div>

                <div className="flex items-center space-x-2 pt-4">
                  <Checkbox 
                    id="terms" 
                    checked={termsAccepted}
                    onCheckedChange={(checked) => setTermsAccepted(checked as boolean)}
                  />
                  <label
                    htmlFor="terms"
                    className={`text-sm ${errors.terms ? "text-red-500" : "text-gray-500"}`}
                  >
                    I accept the terms and conditions
                  </label>
                </div>
                {errors.terms && <p className="text-red-500 text-xs">{errors.terms}</p>}

                <Button 
                  type="submit"
                  className="w-full mt-6 bg-brand-orange hover:bg-opacity-90"
                >
                  Continue to Payment
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>

        <div>
          <Card>
            <CardHeader>
              <CardTitle>Booking Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {booking.selectedBus && (
                <>
                  <div className="space-y-1">
                    <h4 className="text-sm font-medium">Bus Details</h4>
                    <p className="text-sm">{booking.selectedBus.name}</p>
                    <p className="text-xs text-gray-500">{booking.selectedBus.busType}</p>
                  </div>
                
                  <div className="space-y-1">
                    <h4 className="text-sm font-medium">Journey</h4>
                    <p className="text-sm">{booking.from} to {booking.to}</p>
                    {booking.date && (
                      <p className="text-xs text-gray-500">
                        {booking.date.toLocaleDateString('en-US', { 
                          weekday: 'short', 
                          day: 'numeric', 
                          month: 'short', 
                          year: 'numeric' 
                        })}
                      </p>
                    )}
                  </div>
                </>
              )}
              
              <div className="space-y-1">
                <h4 className="text-sm font-medium">Selected Seats</h4>
                <p className="text-sm">
                  {selectedSeats.map(seat => seat.number).join(', ')} 
                  ({selectedSeats.length} {selectedSeats.length === 1 ? 'seat' : 'seats'})
                </p>
              </div>
              
              <div className="border-t pt-4 mt-4">
                <div className="flex justify-between text-sm">
                  <span>Base Fare</span>
                  <span>₹{booking.totalPrice}</span>
                </div>
                <div className="flex justify-between text-sm mt-1">
                  <span>Service Fee</span>
                  <span>₹50</span>
                </div>
                <div className="flex justify-between font-medium mt-2 pt-2 border-t">
                  <span>Total Amount</span>
                  <span className="text-brand-blue">₹{booking.totalPrice + 50}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default PassengerForm;
