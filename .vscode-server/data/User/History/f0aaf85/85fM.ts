import { describe, test, expect } from "vitest";
import { readFileSync } from "fs";
import { join } from "path";
import { getAnalyse, getUserTransactions, calculateMonthlyAnalysis, categorizeTransactions, calculatePercentages } from '../../src/hooks/analysisFunctions';
import { Transaction, Category, MonthlyAnalysis } from './types';

// Charger les données de test
const dataPath = join(__dirname, '../backend/data.json');
const data = JSON.parse(readFileSync(dataPath, 'utf-8'));

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

    test("calculatePercentages should return percentages correctly", () => {
        const monthlyAnalysis = {
            "2024-07": {
                total: 800,
                categories: {
                    Logement: -500,
                    Revenus: 1500,
                    Alimentation: -200
                }
            }
        };
        const percentages = calculatePercentages(monthlyAnalysis);
        const expectedPercentages = {
            "2024-07": {
                total: 800,
                categories: {
                    Logement: "62.50",
                    Revenus: "187.50",
                    Alimentation: "-25.00"
                }
            }
        };
        expect(percentages).toEqual(expectedPercentages);
    });

    test("getAnalyse should return the complete analysis", () => {
        const analysis = getAnalyse(userId, data.categories);
        const expectedAnalysis = {
            "2024-07": {
                total: 800,
                categories: {
                    Logement: { amount: -500, percentage: "62.50" },
                    Revenus: { amount: 1500, percentage: "187.50" },
                    Alimentation: { amount: -200, percentage: "-25.00" }
                }
            }
        };
        expect(analysis).toEqual(expectedAnalysis);
    });
});
