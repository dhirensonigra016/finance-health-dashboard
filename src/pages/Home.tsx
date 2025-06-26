
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { motion } from "framer-motion";
import { createUserData, getUserDataByEmail } from "@/services/userDataApi";

const Home = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Check if user already exists
      const existingUser = await getUserDataByEmail(formData.email);
      
      let userId: string;
      
      if (existingUser) {
        // User exists, store their ID for the next page
        userId = existingUser.id!;
        toast({
          title: "Welcome back!",
          description: "We found your existing data. You can update your financial information.",
        });
      } else {
        // Create new user
        const newUser = await createUserData(formData);
        userId = newUser.id!;
        toast({
          title: "Profile created!",
          description: "Let's get your financial health assessment.",
        });
      }

      // Store user ID in localStorage for the input page
      localStorage.setItem("currentUserId", userId);
      navigate("/input");
    } catch (error) {
      console.error("Error handling user data:", error);
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-2xl mx-auto"
      >
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Financial Health Dashboard
          </h1>
          <p className="text-lg text-gray-600">
            Get personalized insights into your financial wellness
          </p>
        </div>

        <Card className="p-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-2">
              Let's Get Started
            </h2>
            <p className="text-gray-600">
              Tell us a bit about yourself to begin your financial health assessment
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                Full Name
              </label>
              <Input
                id="name"
                name="name"
                type="text"
                required
                value={formData.name}
                onChange={handleChange}
                className="block w-full"
                placeholder="Enter your full name"
                disabled={isLoading}
              />
            </div>

            <div className="space-y-2">
              <label
                htmlFor="phone"
                className="block text-sm font-medium text-gray-700"
              >
                Phone Number
              </label>
              <Input
                id="phone"
                name="phone"
                type="tel"
                required
                value={formData.phone}
                onChange={handleChange}
                className="block w-full"
                placeholder="Enter your phone number"
                disabled={isLoading}
              />
            </div>

            <div className="space-y-2">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email Address
              </label>
              <Input
                id="email"
                name="email"
                type="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="block w-full"
                placeholder="Enter your email address"
                disabled={isLoading}
              />
            </div>

            <Button 
              type="submit"
              className="w-full bg-[#4572D3] hover:bg-[#4572D3]/90 text-lg py-3"
              disabled={isLoading}
            >
              {isLoading ? "Processing..." : "Get My Financial Health"}
            </Button>
          </form>
        </Card>
      </motion.div>
    </div>
  );
};

export default Home;
