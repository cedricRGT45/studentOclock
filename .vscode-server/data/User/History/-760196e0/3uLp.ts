export interface Transaction {
    transactionId: number;
    userId: number;
    amount: number;
    category: string;
    date: string;
    description: string;
  }
  
  export interface Category {
    categoryId: number;
    name: string;
    rules: Array<{
      descriptionContains: string[];
      amountRange?: [number, number];
      amountGreaterThan?: number;
      amountLessThan?: number;
    }>;
  }
  
  export interface MonthlyAnalysis {
    total: number;
    categories: Record<string, number>;
  }
  
  export interface AnnualAnalysis {
    [month: string]: MonthlyAnalysis;
  }
  