
// Mock API service
export interface FinancialData {
  savings_ratio: number;
  expense_ratio: number;
  leverage_ratio: number;
  solvency_ratio: number;
  debt_to_income_ratio: number;
  liquidity_ratio: number;
}

// In-memory storage for the mock API
let mockData: FinancialData = {
  savings_ratio: 25.5,
  expense_ratio: 65.2,
  leverage_ratio: 42.8,
  solvency_ratio: 158.3,
  debt_to_income_ratio: 28.4,
  liquidity_ratio: 2.5,
};

export const fetchFinancialData = async (): Promise<FinancialData> => {
  // Simulating API call with mock data
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockData);
    }, 1000);
  });
};

export const updateFinancialData = async (
  data: Partial<FinancialData>
): Promise<FinancialData> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      mockData = { ...mockData, ...data };
      resolve(mockData);
    }, 1000);
  });
};
