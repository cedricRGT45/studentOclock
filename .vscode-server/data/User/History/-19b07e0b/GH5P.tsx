import { Transaction, Category, MonthlyAnalysis, AnnualAnalysis } from './types';
import data from '../../../backend/data/data.json'
export function getUserTransactions(userId: number): Transaction[] {
  return data.transactions.filter((transaction: Transaction) => transaction.userId === userId);
}

export function categorizeTransactions(transactions: Transaction[], categories: Category[]): Record<string, number> {
  const categorized: Record<string, number> = {};

  transactions.forEach(transaction => {
    const category = categories.find(cat => {
      return cat.rules.some(rule => {
        const matchesDescription = rule.descriptionContains.some(word => transaction.description.includes(word));
        const matchesAmountRange = rule.amountRange ? transaction.amount >= rule.amountRange[0] && transaction.amount <= rule.amountRange[1] : false;
        const matchesGreaterThan = rule.amountGreaterThan ? transaction.amount > rule.amountGreaterThan : false;
        const matchesLessThan = rule.amountLessThan ? transaction.amount < rule.amountLessThan : false;
        
        return matchesDescription && (matchesAmountRange || matchesGreaterThan || matchesLessThan);
      });
    });

    const categoryName = category ? category.name : 'Autres';
    categorized[categoryName] = (categorized[categoryName] || 0) + transaction.amount;
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
Fichier de test analysisFunctions.test.ts
typescript
Copier le code
import { describe, test, expect } from "vitest";
import { getAnalyse, getUserTransactions, calculateMonthlyAnalysis, categorizeTransactions, calculatePercentages } from './analysisFunctions';
import data from '../backend/data.json';
import { Transaction, Category, MonthlyAnalysis } from './types';

const userId = 1;

describe("getAnalyse", () => {

    test("getUserTransactions should return transactions for a user", () => {
        const transactions = getUserTransactions(userId);
        const expectedTransactions = data.transactions.filter((t: Transaction) => t.userId === userId);
        expect(transactions).toEqual(expectedTransactions);
    });

    test("categorizeTransactions should categorize transactions correctly", () => {
        const transactions = getUserTransactions(userId);
        const categories = data.categories;
        const categorized = categorizeTransactions(transactions, categories);
        const expectedCategories = {
            Logement: -500,
            Revenus: 1500,
            Alimentation: -200,
        };
        expect(categorized).toEqual(expectedCategories);
    });

    test("calculateMonthlyAnalysis should return monthly analysis", () => {
        const transactions = getUserTransactions(userId);
        const monthlyAnalysis = calculateMonthlyAnalysis(transactions);
        const expectedAnalysis = {
            "2024-07": {
                total: 800,
                categories: {
                    Logement: -500,
                    Revenus: 1500,
                    Alimentation: -200
                }
            }
        };
        expect(monthlyAnalysis).toEqual(expectedAnalysis);
    });

    test("calculatePercentages should return correct percentages", () => {
        const transactions = getUserTransactions(userId);
        const monthlyAnalysis = calculateMonthlyAnalysis(transactions);
        const percentages = calculatePercentages(monthlyAnalysis);
        const expectedPercentages = {
            "2024-07": {
                total: 800,
                categories: {
                    Logement: (-500 / 800 * 100).toFixed(2),
                    Revenus: (1500 / 800 * 100).toFixed(2),
                    Alimentation: (-200 / 800 * 100).toFixed(2)
                }
            }
        };
        expect(percentages).toEqual(expectedPercentages);
    });
});