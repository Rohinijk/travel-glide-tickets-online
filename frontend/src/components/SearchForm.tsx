
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { CalendarIcon, ArrowRightCircle } from "lucide-react";
import { useBooking } from "@/context/BookingContext";
import { cities, popularRoutes } from "@/data/busData";
import { cn } from "@/lib/utils";

const SearchForm = () => {
  const { setSearchParams } = useBooking();
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [date, setDate] = useState<Date>();
  const [fromSuggestions, setFromSuggestions] = useState<string[]>([]);
  const [toSuggestions, setToSuggestions] = useState<string[]>([]);
  const [showFromSuggestions, setShowFromSuggestions] = useState(false);
  const [showToSuggestions, setShowToSuggestions] = useState(false);

  const handleFromChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setFrom(value);
    if (value.length > 0) {
      const filtered = cities.filter(city => 
        city.toLowerCase().includes(value.toLowerCase())
      ).slice(0, 5);
      setFromSuggestions(filtered);
      setShowFromSuggestions(true);
    } else {
      setShowFromSuggestions(false);
    }
  };

  const handleToChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setTo(value);
    if (value.length > 0) {
      const filtered = cities.filter(city => 
        city.toLowerCase().includes(value.toLowerCase())
      ).slice(0, 5);
      setToSuggestions(filtered);
      setShowToSuggestions(true);
    } else {
      setShowToSuggestions(false);
    }
  };

  const selectFromSuggestion = (suggestion: string) => {
    setFrom(suggestion);
    setShowFromSuggestions(false);
  };

  const selectToSuggestion = (suggestion: string) => {
    setTo(suggestion);
    setShowToSuggestions(false);
  };

  const handleSearch = () => {
    if (from && to && date) {
      setSearchParams(from, to, date);
    }
  };

  const handlePopularRoute = (fromCity: string, toCity: string) => {
    setFrom(fromCity);
    setTo(toCity);
  };

  return (
    <Card className="shadow-lg border-t-4 border-t-brand-teal -mt-8 md:-mt-12">
      <CardContent className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="relative">
            <label className="block text-sm font-medium text-gray-700 mb-1">From</label>
            <Input
              value={from}
              onChange={handleFromChange}
              placeholder="Departure City"
              className="w-full"
              onBlur={() => setTimeout(() => setShowFromSuggestions(false), 200)}
              onFocus={() => from && setShowFromSuggestions(true)}
            />
            {showFromSuggestions && fromSuggestions.length > 0 && (
              <div className="absolute z-10 w-full bg-white border rounded-md shadow-lg mt-1">
                {fromSuggestions.map(suggestion => (
                  <div 
                    key={suggestion} 
                    className="p-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => selectFromSuggestion(suggestion)}
                  >
                    {suggestion}
                  </div>
                ))}
              </div>
            )}
          </div>
          
          <div className="relative">
            <label className="block text-sm font-medium text-gray-700 mb-1">To</label>
            <Input
              value={to}
              onChange={handleToChange}
              placeholder="Destination City"
              className="w-full"
              onBlur={() => setTimeout(() => setShowToSuggestions(false), 200)}
              onFocus={() => to && setShowToSuggestions(true)}
            />
            {showToSuggestions && toSuggestions.length > 0 && (
              <div className="absolute z-10 w-full bg-white border rounded-md shadow-lg mt-1">
                {toSuggestions.map(suggestion => (
                  <div 
                    key={suggestion} 
                    className="p-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => selectToSuggestion(suggestion)}
                  >
                    {suggestion}
                  </div>
                ))}
              </div>
            )}
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Travel Date</label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn("w-full justify-start text-left", !date && "text-muted-foreground")}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date ? format(date, "PPP") : "Select date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0 pointer-events-auto">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  initialFocus
                  disabled={(date) => date < new Date()}
                  className="p-3 pointer-events-auto"
                />
              </PopoverContent>
            </Popover>
          </div>
          
          <Button 
            className="bg-brand-orange hover:bg-opacity-90 text-white h-10 mt-auto"
            onClick={handleSearch}
            disabled={!from || !to || !date}
          >
            Search Buses
          </Button>
        </div>

        <div className="mt-6">
          <h3 className="text-sm font-medium text-gray-700 mb-2">Popular Routes</h3>
          <div className="flex flex-wrap gap-2">
            {popularRoutes.map((route, index) => (
              <Button
                key={index}
                variant="outline"
                size="sm"
                className="text-xs"
                onClick={() => handlePopularRoute(route.from, route.to)}
              >
                {route.from} <ArrowRightCircle className="h-3 w-3 mx-1" /> {route.to}
              </Button>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SearchForm;
