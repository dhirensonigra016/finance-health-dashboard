import { useQuery } from "@tanstack/react-query";
import { RatioCard } from "@/components/RatioCard";
import { fetchFinancialData } from "@/services/financeApi";
import { ratioDescriptions } from "@/utils/ratioDescriptions";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

const Index = () => {
  const navigate = useNavigate();
  const { data, isLoading, error } = useQuery({
    queryKey: ["financialData"],
    queryFn: fetchFinancialData,
  });

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="text-gray-600">Loading your financial health data...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center text-red-500">
          Error loading financial data. Please try again later.
        </div>
      </div>
    );
  }

  const chartData = data
    ? [
        {
          name: "Savings",
          value: Math.min(data.savings_ratio, 100),
          fullMark: 100,
        },
        {
          name: "Expense",
          value: Math.min(data.expense_ratio, 100),
          fullMark: 100,
        },
        {
          name: "Leverage",
          value: Math.min(data.leverage_ratio, 100),
          fullMark: 100,
        },
        {
          name: "Solvency",
          value: Math.min(data.solvency_ratio, 100),
          fullMark: 100,
        },
        {
          name: "Debt",
          value: Math.min(data.debt_to_income_ratio, 100),
          fullMark: 100,
        },
        {
          name: "Liquidity",
          value: Math.min(data.liquidity_ratio, 10) * 10,
          fullMark: 100,
        },
      ]
    : [];

  const orderedChartData = data
    ? [
        chartData[0], // Savings
        chartData[2], // Leverage
        chartData[4], // Debt
        chartData[1], // Expense (opposite to Savings)
        chartData[3], // Solvency (opposite to Leverage)
        chartData[5], // Liquidity
      ]
    : [];

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-7xl mx-auto"
      >
        <div className="text-center mb-12">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900">
              Financial Health Dashboard
            </h1>
            <Button 
              onClick={() => navigate("/input")}
              className="bg-[#4572D3] hover:bg-[#4572D3]/90"
            >
              Update Data
            </Button>
          </div>
          <p className="text-lg text-gray-600 mb-8">
            Track and improve your financial ratios
          </p>

          <div className="w-full h-[400px] bg-white rounded-lg shadow-lg p-4 mb-12">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="80%" data={orderedChartData}>
                <PolarGrid stroke="#E3E3E4" />
                <PolarAngleAxis dataKey="name" />
                <PolarRadiusAxis angle={30} domain={[0, 100]} />
                <Radar
                  name="Financial Metrics"
                  dataKey="value"
                  stroke="#4572D3"
                  fill="#4572D3"
                  fillOpacity={0.6}
                />
                <Tooltip />
              </RadarChart>
            </ResponsiveContainer>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {data && (
              <>
                <RatioCard
                  title={ratioDescriptions.savings.title}
                  value={data.savings_ratio}
                  description={ratioDescriptions.savings.description}
                  recommendation={ratioDescriptions.savings.recommendation}
                  colorClass={data.savings_ratio >= 20 ? "text-green-500" : "text-red-500"}
                  delay={0}
                />
                <RatioCard
                  title={ratioDescriptions.expense.title}
                  value={data.expense_ratio}
                  description={ratioDescriptions.expense.description}
                  recommendation={ratioDescriptions.expense.recommendation}
                  colorClass={data.expense_ratio <= 80 ? "text-green-500" : "text-red-500"}
                  delay={1}
                />
                <RatioCard
                  title={ratioDescriptions.leverage.title}
                  value={data.leverage_ratio}
                  description={ratioDescriptions.leverage.description}
                  recommendation={ratioDescriptions.leverage.recommendation}
                  colorClass={data.leverage_ratio <= 50 ? "text-green-500" : "text-red-500"}
                  delay={2}
                />
                <RatioCard
                  title={ratioDescriptions.solvency.title}
                  value={data.solvency_ratio}
                  description={ratioDescriptions.solvency.description}
                  recommendation={ratioDescriptions.solvency.recommendation}
                  colorClass={data.solvency_ratio >= 50 ? "text-green-500" : "text-red-500"}
                  delay={3}
                />
                <RatioCard
                  title={ratioDescriptions.debt.title}
                  value={data.debt_to_income_ratio}
                  description={ratioDescriptions.debt.description}
                  recommendation={ratioDescriptions.debt.recommendation}
                  colorClass={data.debt_to_income_ratio <= 40 ? "text-green-500" : "text-red-500"}
                  delay={4}
                />
                <RatioCard
                  title={ratioDescriptions.liquidity.title}
                  value={data.liquidity_ratio}
                  description={ratioDescriptions.liquidity.description}
                  recommendation={ratioDescriptions.liquidity.recommendation}
                  colorClass={data.liquidity_ratio >= 600 ? "text-green-500" : "text-red-500"}
                  delay={5}
                />
              </>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Index;
