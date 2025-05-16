
import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { toast } from "@/hooks/use-toast";
import { authAPI } from "@/services/apiService";

type User = {
  id: string;
  email: string;
  name: string;
};

type AuthContextType = {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Check if user is already logged in on component mount
  useEffect(() => {
    const checkLoggedIn = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const userData = await authAPI.getCurrentUser();
          setUser(userData);
        } catch (error) {
          console.error("Failed to retrieve user:", error);
          localStorage.removeItem("token");
        }
      }
      setIsLoading(false);
    };

    checkLoggedIn();
  }, []);

  const isAuthenticated = !!user;

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    try {
      console.log("Attempting login with:", { email, password: "***" });
      const response = await authAPI.login({ email, password });
      console.log("Login response:", response);
      
      if (response && response.token) {
        localStorage.setItem("token", response.token);
        setUser(response.user);
        toast({
          title: "Login successful",
          description: `Welcome back, ${response.user.name}!`,
        });
        setIsLoading(false);
        return true;
      } else {
        throw new Error("Invalid response from server");
      }
    } catch (error: any) {
      console.error("Login error:", error);
      const errorMessage = error.response?.data?.message || "Login failed. Please check your credentials and try again.";
      toast({
        title: "Login failed",
        description: errorMessage,
        variant: "destructive",
      });
      setIsLoading(false);
      return false;
    }
  };

  const signup = async (name: string, email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    try {
      console.log("Attempting signup with:", { name, email, password: "***" });
      const response = await authAPI.register({ name, email, password });
      console.log("Signup response:", response);
      
      if (response && response.token) {
        localStorage.setItem("token", response.token);
        
        // Get user data after registration
        try {
          const userData = await authAPI.getCurrentUser();
          setUser(userData);
          
          toast({
            title: "Signup successful",
            description: "Your account has been created",
          });
          setIsLoading(false);
          return true;
        } catch (userError) {
          console.error("Failed to fetch user data after signup:", userError);
          // Even if we couldn't fetch user data, the signup was successful
          // We'll try to set user from the response
          if (response.user) {
            setUser(response.user);
          }
          toast({
            title: "Signup successful",
            description: "Your account has been created, but we encountered an issue loading your profile.",
          });
          setIsLoading(false);
          return true;
        }
      } else {
        throw new Error("Invalid response from server");
      }
    } catch (error: any) {
      console.error("Signup error:", error);
      const errorMessage = error.response?.data?.message || "Signup failed. Please try again with a different email.";
      toast({
        title: "Signup failed",
        description: errorMessage,
        variant: "destructive",
      });
      setIsLoading(false);
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("token");
    toast({
      title: "Logged out",
      description: "You have been logged out successfully",
    });
  };

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated, login, signup, logout, isLoading }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
