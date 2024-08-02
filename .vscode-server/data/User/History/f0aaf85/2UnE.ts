import { describe, test, expect } from "vitest";
import { getAnalyse, getUserTransactions, calculateMonthlyAnalysis, categorizeTransactions, calculatePercentages } from '../test/analysisFunctions';
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