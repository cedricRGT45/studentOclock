import { describe, test, expectTypeOf } from 'vitest';
import { getAnalyse, getUserTransactions, calculateMonthlyAnalysis, categorizeTransactions, calculatePercentages } from '../hooks/analysisFunctions';
import { Transaction, Category, MonthlyAnalysis, Analyse } from '../types/types';

describe('Type Tests', () => {
  test('getUserTransactions type', () => {
    const transactions = getUserTransactions(1);
    expectTypeOf(transactions).toBeArray();
  });

  test('categorizeTransactions type', () => {
    const transactions = getUserTransactions(1);
    const categories = [] as Category[];
    const categorized = categorizeTransactions(transactions, categories);
    expectTypeOf(categorized).toBeObject();
  });

  test('calculateMonthlyAnalysis type', () => {
    const transactions = getUserTransactions(1);
    const monthlyAnalysis = calculateMonthlyAnalysis(transactions);
    expectTypeOf(monthlyAnalysis).toBeObject()
  });

  test('calculatePercentages type', () => {
    const transactions = getUserTransactions(1);
    const monthlyAnalysis = calculateMonthlyAnalysis(transactions);
    const percentages = calculatePercentages(monthlyAnalysis);
    expectTypeOf(percentages).toBeObject();
  });

  test('getAnalyse type', () => {
    const categories = [] as Category[];
    const analysis = getAnalyse(1, categories);
    expectTypeOf(analysis).toBeObject();
  });
});