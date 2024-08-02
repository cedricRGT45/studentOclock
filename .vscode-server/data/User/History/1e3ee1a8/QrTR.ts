import { assertType, expectTypeOf } from 'vitest';
import { getAnalyse, getUserTransactions, calculateMonthlyAnalysis, categorizeTransactions, calculatePercentages } from '../hooks/analysisFunctions';
import { Transaction, Category, MonthlyAnalysis, Analyse } from '../types/types';

describe('Type Tests', () => {
  test('getUserTransactions type', () => {
    const transactions = getUserTransactions(1);
    expectTypeOf(transactions).toBeArray().ofType<Transaction>();
  });

  test('categorizeTransactions type', () => {
    const transactions = getUserTransactions(1);
    const categories = [
      // Simulate categories here if needed
    ] as Category[];
    const categorized = categorizeTransactions(transactions, categories);
    expectTypeOf(categorized).toBeObject().ofType<{ [key: string]: number }>();
  });

  test('calculateMonthlyAnalysis type', () => {
    const transactions = getUserTransactions(1);
    const monthlyAnalysis = calculateMonthlyAnalysis(transactions);
    expectTypeOf(monthlyAnalysis).toBeObject().ofType<{ [key: string]: { total: number, categories: { [key: string]: number } } }>();
  });

  test('calculatePercentages type', () => {
    const transactions = getUserTransactions(1);
    const monthlyAnalysis = calculateMonthlyAnalysis(transactions);
    const percentages = calculatePercentages(monthlyAnalysis);
    expectTypeOf(percentages).toBeObject().ofType<{ [key: string]: { total: number, categories: { [key: string]: string } } }>();
  });

  test('getAnalyse type', () => {
    const categories = [
      // Simulate categories here if needed
    ] as Category[];
    const analysis = getAnalyse(1, categories);
    expectTypeOf(analysis).toBeObject().ofType<{ [key: string]: { total: number, categories: { [key: string]: { amount: number, percentage: string } } } }>();
  });
});
