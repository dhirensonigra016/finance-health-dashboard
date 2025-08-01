
import { supabase } from "@/integrations/supabase/client";

export interface UserData {
  id?: string;
  name: string;
  phone: string;
  email: string;
  net_monthly_income?: number;
  net_monthly_expenses?: number;
  net_monthly_emis?: number;
  total_assets?: number;
  total_loans?: number;
  total_liquid_assets?: number;
  savings_ratio?: number;
  expense_ratio?: number;
  leverage_ratio?: number;
  solvency_ratio?: number;
  debt_to_income_ratio?: number;
  liquidity_ratio?: number;
  created_at?: string;
  updated_at?: string;
}

export const createUserData = async (userData: Omit<UserData, 'id' | 'created_at' | 'updated_at'>): Promise<UserData> => {
  const { data, error } = await supabase
    .from('user_data')
    .insert(userData)
    .select()
    .single();

  if (error) {
    console.error('Error creating user data:', error);
    throw error;
  }

  return data;
};

export const updateUserData = async (id: string, updates: Partial<UserData>): Promise<UserData> => {
  const { data, error } = await supabase
    .from('user_data')
    .update(updates)
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error('Error updating user data:', error);
    throw error;
  }

  return data;
};

export const getUserData = async (id: string): Promise<UserData | null> => {
  const { data, error } = await supabase
    .from('user_data')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    if (error.code === 'PGRST116') {
      return null; // No data found
    }
    console.error('Error fetching user data:', error);
    throw error;
  }

  return data;
};

export const getUserDataByEmail = async (email: string): Promise<UserData | null> => {
  const { data, error } = await supabase
    .from('user_data')
    .select('*')
    .eq('email', email)
    .order('created_at', { ascending: false })
    .limit(1)
    .maybeSingle();

  if (error) {
    console.error('Error fetching user data by email:', error);
    throw error;
  }

  return data;
};

export const getAllUserData = async (): Promise<UserData[]> => {
  const { data, error } = await supabase
    .from('user_data')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching all user data:', error);
    throw error;
  }

  return data || [];
};
