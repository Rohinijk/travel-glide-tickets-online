
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { UserPlus, LogIn, Loader2 } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const Auth = () => {
  const navigate = useNavigate();
  const { login, signup, isLoading: authLoading } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  
  // Login form state
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  
  // Signup form state
  const [signupName, setSignupName] = useState("");
  const [signupEmail, setSignupEmail] = useState("");
  const [signupPassword, setSignupPassword] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!loginEmail || !loginPassword) {
      toast({
        title: "Missing information",
        description: "Please enter both email and password",
        variant: "destructive"
      });
      return;
    }
    
    setIsLoading(true);
    
    try {
      const success = await login(loginEmail, loginPassword);
      if (success) {
        navigate("/");
      }
    } catch (error) {
      console.error("Login handler error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!signupName || !signupEmail || !signupPassword) {
      toast({
        title: "Missing information",
        description: "Please fill out all fields",
        variant: "destructive"
      });
      return;
    }
    
    if (signupPassword.length < 6) {
      toast({
        title: "Password too short",
        description: "Password must be at least 6 characters",
        variant: "destructive"
      });
      return;
    }
    
    setIsLoading(true);
    
    try {
      const success = await signup(signupName, signupEmail, signupPassword);
      if (success) {
        navigate("/");
      }
    } catch (error) {
      console.error("Signup handler error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const isFormLoading = isLoading || authLoading;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md">
        <Tabs defaultValue="login" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="login">Login</TabsTrigger>
            <TabsTrigger value="signup">Sign Up</TabsTrigger>
          </TabsList>
          
          <TabsContent value="login">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">Login to TravelGlide</CardTitle>
                <CardDescription>
                  Enter your credentials to access your account
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleLogin} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="loginEmail">Email</Label>
                    <Input 
                      id="loginEmail"
                      type="email"
                      placeholder="name@example.com"
                      value={loginEmail}
                      onChange={(e) => setLoginEmail(e.target.value)}
                      required
                      disabled={isFormLoading}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="loginPassword">Password</Label>
                    <Input 
                      id="loginPassword"
                      type="password"
                      placeholder="••••••••"
                      value={loginPassword}
                      onChange={(e) => setLoginPassword(e.target.value)}
                      required
                      disabled={isFormLoading}
                    />
                  </div>
                  <Button type="submit" className="w-full" disabled={isFormLoading}>
                    {isFormLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Logging in...
                      </>
                    ) : (
                      <>
                        <LogIn className="mr-2 h-4 w-4" />
                        Login
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
              <CardFooter className="flex justify-center text-sm text-gray-500">
                <p>Default login: user@example.com / password123</p>
              </CardFooter>
            </Card>
          </TabsContent>
          
          <TabsContent value="signup">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">Create an Account</CardTitle>
                <CardDescription>
                  Sign up to start booking your trips
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSignup} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="signupName">Full Name</Label>
                    <Input 
                      id="signupName"
                      type="text"
                      placeholder="John Doe"
                      value={signupName}
                      onChange={(e) => setSignupName(e.target.value)}
                      required
                      disabled={isFormLoading}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="signupEmail">Email</Label>
                    <Input 
                      id="signupEmail"
                      type="email"
                      placeholder="name@example.com"
                      value={signupEmail}
                      onChange={(e) => setSignupEmail(e.target.value)}
                      required
                      disabled={isFormLoading}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="signupPassword">Password</Label>
                    <Input 
                      id="signupPassword"
                      type="password"
                      placeholder="••••••••"
                      value={signupPassword}
                      onChange={(e) => setSignupPassword(e.target.value)}
                      required
                      disabled={isFormLoading}
                      minLength={6}
                    />
                  </div>
                  <Button type="submit" className="w-full" disabled={isFormLoading}>
                    {isFormLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Creating account...
                      </>
                    ) : (
                      <>
                        <UserPlus className="mr-2 h-4 w-4" />
                        Create Account
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Auth;
