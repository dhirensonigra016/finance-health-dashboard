
-- Create a comprehensive user_data table to store all user information
CREATE TABLE public.user_data (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  
  -- Basic user information
  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT NOT NULL,
  
  -- Financial input data
  net_monthly_income DECIMAL(15,2),
  net_monthly_expenses DECIMAL(15,2),
  net_monthly_emis DECIMAL(15,2),
  total_assets DECIMAL(15,2),
  total_loans DECIMAL(15,2),
  total_liquid_assets DECIMAL(15,2),
  
  -- Calculated financial ratios
  savings_ratio DECIMAL(8,2),
  expense_ratio DECIMAL(8,2),
  leverage_ratio DECIMAL(8,2),
  solvency_ratio DECIMAL(8,2),
  debt_to_income_ratio DECIMAL(8,2),
  liquidity_ratio DECIMAL(8,2)
);

-- Add Row Level Security (RLS) - making it public for now since there's no authentication
ALTER TABLE public.user_data ENABLE ROW LEVEL SECURITY;

-- Create a policy that allows all operations for now (since no auth is implemented)
CREATE POLICY "Allow all operations on user_data" 
  ON public.user_data 
  FOR ALL 
  USING (true)
  WITH CHECK (true);

-- Create an updated_at trigger
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_user_data_updated_at 
    BEFORE UPDATE ON public.user_data 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();
