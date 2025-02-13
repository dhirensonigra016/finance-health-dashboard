
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
    net_monthly_income: "",
    net_monthly_expenses: "",
    net_monthly_emis: "",
    total_assets: "",
    total_loans: "",
    total_liquid_assets: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const calculateRatios = (data: Record<string, string>) => {
    const values = Object.entries(data).reduce(
      (acc, [key, value]) => ({
        ...acc,
        [key]: parseFloat(value) || 0,
      }),
      {} as Record<string, number>
    );

    const {
      net_monthly_income,
      net_monthly_expenses,
      net_monthly_emis,
      total_assets,
      total_loans,
      total_liquid_assets,
    } = values;

    return {
      savings_ratio:
        ((net_monthly_income - net_monthly_expenses) / net_monthly_income) * 100,
      expense_ratio: (net_monthly_expenses / net_monthly_income) * 100,
      leverage_ratio: (total_loans / total_assets) * 100,
      solvency_ratio: ((total_assets - total_loans) / total_assets) * 100,
      liquidity_ratio: (total_liquid_assets / net_monthly_income) * 100,
      debt_to_income_ratio: (net_monthly_emis / net_monthly_income) * 100,
    };
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const ratios = calculateRatios(formData);
      await updateFinancialData(ratios);
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
            Enter your financial information to calculate ratios
          </p>
        </div>

        <Card className="p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label
                  htmlFor="net_monthly_income"
                  className="block text-sm font-medium text-gray-700"
                >
                  Net Monthly Income
                </label>
                <Input
                  id="net_monthly_income"
                  name="net_monthly_income"
                  type="number"
                  step="0.01"
                  required
                  value={formData.net_monthly_income}
                  onChange={handleChange}
                  className="block w-full"
                  placeholder="Enter net monthly income"
                />
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="net_monthly_expenses"
                  className="block text-sm font-medium text-gray-700"
                >
                  Net Monthly Expenses
                </label>
                <Input
                  id="net_monthly_expenses"
                  name="net_monthly_expenses"
                  type="number"
                  step="0.01"
                  required
                  value={formData.net_monthly_expenses}
                  onChange={handleChange}
                  className="block w-full"
                  placeholder="Enter net monthly expenses"
                />
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="net_monthly_emis"
                  className="block text-sm font-medium text-gray-700"
                >
                  Net Monthly EMIs
                </label>
                <Input
                  id="net_monthly_emis"
                  name="net_monthly_emis"
                  type="number"
                  step="0.01"
                  required
                  value={formData.net_monthly_emis}
                  onChange={handleChange}
                  className="block w-full"
                  placeholder="Enter net monthly EMIs"
                />
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="total_assets"
                  className="block text-sm font-medium text-gray-700"
                >
                  Total Assets
                </label>
                <Input
                  id="total_assets"
                  name="total_assets"
                  type="number"
                  step="0.01"
                  required
                  value={formData.total_assets}
                  onChange={handleChange}
                  className="block w-full"
                  placeholder="Enter total assets"
                />
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="total_loans"
                  className="block text-sm font-medium text-gray-700"
                >
                  Total Loans
                </label>
                <Input
                  id="total_loans"
                  name="total_loans"
                  type="number"
                  step="0.01"
                  required
                  value={formData.total_loans}
                  onChange={handleChange}
                  className="block w-full"
                  placeholder="Enter total loans"
                />
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="total_liquid_assets"
                  className="block text-sm font-medium text-gray-700"
                >
                  Total Liquid Assets
                </label>
                <Input
                  id="total_liquid_assets"
                  name="total_liquid_assets"
                  type="number"
                  step="0.01"
                  required
                  value={formData.total_liquid_assets}
                  onChange={handleChange}
                  className="block w-full"
                  placeholder="Enter total liquid assets"
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
              <Button type="submit">Calculate & Update</Button>
            </div>
          </form>
        </Card>
      </motion.div>
    </div>
  );
};

export default InputData;
