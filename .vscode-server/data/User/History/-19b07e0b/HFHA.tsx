import { Transaction, Category, MonthlyAnalysis, AnnualAnalysis } from '../types/types';
import data from '../../../backend/data/data.json'

export function getUserTransactions(userId: number): Transaction[] {
  return data.transactions.filter((transaction: Transaction) => transaction.userId === userId);
}

export function categorizeTransactions(transactions: Transaction[], categories: Category[]): { [key: string]: number } {
  const categorized: { [key: string]: number } = {};

  transactions.forEach(transaction => {
      let foundCategory = 'Autres';
      for (const category of categories) {
          const { name, rules } = category;
          for (const rule of rules) {
              const { descriptionContains, amountRange, amountGreaterThan, amountLessThan } = rule;
              const { description, amount } = transaction;
              if (
                  (descriptionContains && descriptionContains.some((keyword: string) => description.includes(keyword))) ||
                  (amountRange && amount >= amountRange[0] && amount <= amountRange[1]) ||
                  (amountGreaterThan && amount > amountGreaterThan) ||
                  (amountLessThan && amount < amountLessThan)
              ) {
                  foundCategory = name;
                  break;
              }
          }
          if (foundCategory !== 'Autres') break;
      }
      categorized[foundCategory] = (categorized[foundCategory] || 0) + transaction.amount;
  });

  return categorized;
}

export function calculateMonthlyAnalysis(transactions: Transaction[]): Record<string, MonthlyAnalysis> {
  const monthlyAnalysis: Record<string, MonthlyAnalysis> = {};

  transactions.forEach(transaction => {
    const month = new Date(transaction.date).toISOString().slice(0, 7);
    if (!monthlyAnalysis[month]) {
      monthlyAnalysis[month] = { total: 0, categories: {} };
    }

    monthlyAnalysis[month].total += transaction.amount;
    const category = categorizeTransactions([transaction], data.categories);
    for (const cat in category) {
      monthlyAnalysis[month].categories[cat] = (monthlyAnalysis[month].categories[cat] || 0) + category[cat];
    }
  });

  return monthlyAnalysis;
}

export function calculatePercentages(monthlyAnalysis: Record<string, MonthlyAnalysis>): Record<string, MonthlyAnalysis> {
  const percentages: Record<string, MonthlyAnalysis> = {};

  for (const month in monthlyAnalysis) {
    const { total, categories } = monthlyAnalysis[month];
    percentages[month] = { total, categories: {} };
    for (const category in categories) {
      percentages[month].categories[category] = ((categories[category] / total) * 100).toFixed(2);
    }
  }

  return percentages;
}

export function getAnalyse(userId: number, categories: Category[]): Record<string, MonthlyAnalysis> {
  const transactions = getUserTransactions(userId);
  const monthlyAnalysis = calculateMonthlyAnalysis(transactions);
  const percentages = calculatePercentages(monthlyAnalysis);

  const analysis: Record<string, MonthlyAnalysis> = {};
  for (const month in monthlyAnalysis) {
    analysis[month] = {
      total: monthlyAnalysis[month].total,
      categories: Object.keys(monthlyAnalysis[month].categories).reduce((acc, cat) => {
        acc[cat] = {
          amount: monthlyAnalysis[month].categories[cat],
          percentage: percentages[month].categories[cat]
        };
        return acc;
      }, {} as Record<string, { amount: number, percentage: string }>)
    };
  }

  return analysis;
}