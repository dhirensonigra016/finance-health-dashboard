
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { motion } from "framer-motion";
import { updateFinancialData } from "@/services/financeApi";

const InputData = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    savings_ratio: "",
    expense_ratio: "",
    leverage_ratio: "",
    solvency_ratio: "",
    debt_to_income_ratio: "",
    liquidity_ratio: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Convert all values to numbers
      const numericData = Object.entries(formData).reduce(
        (acc, [key, value]) => ({
          ...acc,
          [key]: parseFloat(value),
        }),
        {}
      );

      await updateFinancialData(numericData);
      toast({
        title: "Success",
        description: "Financial data updated successfully",
      });
      navigate("/");
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update financial data",
        variant: "destructive",
      });
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
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Update Financial Data
          </h1>
          <p className="mt-2 text-gray-600">
            Enter your financial ratios to update the dashboard
          </p>
        </div>

        <Card className="p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label
                  htmlFor="savings_ratio"
                  className="block text-sm font-medium text-gray-700"
                >
                  Savings Ratio (%)
                </label>
                <Input
                  id="savings_ratio"
                  name="savings_ratio"
                  type="number"
                  step="0.01"
                  required
                  value={formData.savings_ratio}
                  onChange={handleChange}
                  className="block w-full"
                  placeholder="Enter savings ratio"
                />
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="expense_ratio"
                  className="block text-sm font-medium text-gray-700"
                >
                  Expense Ratio (%)
                </label>
                <Input
                  id="expense_ratio"
                  name="expense_ratio"
                  type="number"
                  step="0.01"
                  required
                  value={formData.expense_ratio}
                  onChange={handleChange}
                  className="block w-full"
                  placeholder="Enter expense ratio"
                />
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="leverage_ratio"
                  className="block text-sm font-medium text-gray-700"
                >
                  Leverage Ratio (%)
                </label>
                <Input
                  id="leverage_ratio"
                  name="leverage_ratio"
                  type="number"
                  step="0.01"
                  required
                  value={formData.leverage_ratio}
                  onChange={handleChange}
                  className="block w-full"
                  placeholder="Enter leverage ratio"
                />
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="solvency_ratio"
                  className="block text-sm font-medium text-gray-700"
                >
                  Solvency Ratio (%)
                </label>
                <Input
                  id="solvency_ratio"
                  name="solvency_ratio"
                  type="number"
                  step="0.01"
                  required
                  value={formData.solvency_ratio}
                  onChange={handleChange}
                  className="block w-full"
                  placeholder="Enter solvency ratio"
                />
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="debt_to_income_ratio"
                  className="block text-sm font-medium text-gray-700"
                >
                  Debt to Income Ratio (%)
                </label>
                <Input
                  id="debt_to_income_ratio"
                  name="debt_to_income_ratio"
                  type="number"
                  step="0.01"
                  required
                  value={formData.debt_to_income_ratio}
                  onChange={handleChange}
                  className="block w-full"
                  placeholder="Enter debt to income ratio"
                />
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="liquidity_ratio"
                  className="block text-sm font-medium text-gray-700"
                >
                  Liquidity Ratio (%)
                </label>
                <Input
                  id="liquidity_ratio"
                  name="liquidity_ratio"
                  type="number"
                  step="0.01"
                  required
                  value={formData.liquidity_ratio}
                  onChange={handleChange}
                  className="block w-full"
                  placeholder="Enter liquidity ratio"
                />
              </div>
            </div>

            <div className="flex justify-end space-x-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate("/")}
              >
                Cancel
              </Button>
              <Button type="submit">Update Data</Button>
            </div>
          </form>
        </Card>
      </motion.div>
    </div>
  );
};

export default InputData;
