
import { useQuery } from "@tanstack/react-query";
import { RatioCard } from "@/components/RatioCard";
import { fetchFinancialData } from "@/services/financeApi";
import { ratioDescriptions } from "@/utils/ratioDescriptions";
import { motion } from "framer-motion";

const Index = () => {
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

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-7xl mx-auto"
      >
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Financial Health Dashboard
          </h1>
          <p className="text-lg text-gray-600">
            Track and improve your financial ratios
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {data && (
            <>
              <RatioCard
                title={ratioDescriptions.savings.title}
                value={data.savings_ratio}
                description={ratioDescriptions.savings.description}
                recommendation={ratioDescriptions.savings.recommendation}
                colorClass={ratioDescriptions.savings.colorClass}
                delay={0}
              />
              <RatioCard
                title={ratioDescriptions.expense.title}
                value={data.expense_ratio}
                description={ratioDescriptions.expense.description}
                recommendation={ratioDescriptions.expense.recommendation}
                colorClass={ratioDescriptions.expense.colorClass}
                delay={1}
              />
              <RatioCard
                title={ratioDescriptions.leverage.title}
                value={data.leverage_ratio}
                description={ratioDescriptions.leverage.description}
                recommendation={ratioDescriptions.leverage.recommendation}
                colorClass={ratioDescriptions.leverage.colorClass}
                delay={2}
              />
              <RatioCard
                title={ratioDescriptions.solvency.title}
                value={data.solvency_ratio}
                description={ratioDescriptions.solvency.description}
                recommendation={ratioDescriptions.solvency.recommendation}
                colorClass={ratioDescriptions.solvency.colorClass}
                delay={3}
              />
              <RatioCard
                title={ratioDescriptions.debt.title}
                value={data.debt_to_income_ratio}
                description={ratioDescriptions.debt.description}
                recommendation={ratioDescriptions.debt.recommendation}
                colorClass={ratioDescriptions.debt.colorClass}
                delay={4}
              />
              <RatioCard
                title={ratioDescriptions.liquidity.title}
                value={data.liquidity_ratio}
                description={ratioDescriptions.liquidity.description}
                recommendation={ratioDescriptions.liquidity.recommendation}
                colorClass={ratioDescriptions.liquidity.colorClass}
                delay={5}
              />
            </>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default Index;
