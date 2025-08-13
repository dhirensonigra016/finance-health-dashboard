
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { motion } from "framer-motion";

interface RatioCardProps {
  title: string;
  value: number;
  description: string;
  recommendation: string;
  improvement: string;
  colorClass: string;
  delay: number;
}

export const RatioCard = ({
  title,
  value,
  description,
  recommendation,
  improvement,
  colorClass,
  delay,
}: RatioCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: delay * 0.1 }}
      className="w-full"
    >
      <Card className="p-6 hover:shadow-lg transition-shadow duration-300 bg-white backdrop-blur-lg bg-opacity-90">
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">{title}</h3>
            <span className={`text-xl font-bold ${colorClass}`}>
              {value.toFixed(2)}%
            </span>
          </div>
          <div className="relative pt-1">
            <div className="overflow-hidden h-2 text-xs flex rounded bg-[#E3E3E4]">
              <div
                style={{ width: `${Math.min(100, value)}%` }}
                className="bg-[#4572D3] rounded"
              />
            </div>
          </div>
          <p className="text-sm text-gray-600 mt-2">{description}</p>
          <div className="mt-4 p-3 bg-gray-50 rounded-lg">
            <p className="text-sm font-medium text-gray-800">
              Recommendation:
              <span className="text-gray-600 ml-2 font-normal">
                {recommendation}
              </span>
            </p>
          </div>
          <div className="mt-3 p-3 bg-gray-50 rounded-lg">
            <p className="text-sm font-medium text-gray-800">
              How to improve?
              <span className="text-gray-600 ml-2 font-normal">
                {improvement}
              </span>
            </p>
          </div>
        </div>
      </Card>
    </motion.div>
  );
};
