import { describe, test, expect } from "vitest";
import { getAnalyse, getUserTransactions, calculateMonthlyAnalysis, categorizeTransactions, calculatePercentages } from '../hooks/analysisFunctions.tsx';
import data from '../../../backend/data/data.json';
import { Transaction, Category, MonthlyAnalysis } from '../types/types.ts';

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

describe("vérifie les types", () => {
    test("types should be correct", () => {
        // Vérifier le type de `getUserTransactions`
        const transactions = getUserTransactions(userId);
        type CheckTransactions = typeof transactions;
        const expectedTypeTransactions: CheckTransactions = data.transactions.filter((t: Transaction) => t.userId === userId);
        expect(transactions).toEqual(expectedTypeTransactions);

        // Vérifier le type de `categorizeTransactions`
        const categories = data.categories;
        const categorized = categorizeTransactions(getUserTransactions(userId), categories);
        type CheckCategorized = typeof categorized;
        const expectedTypeCategorized: CheckCategorized = {
            Logement: -500,
            Revenus: 1500,
            Alimentation: -200,
        };
        expect(categorized).toEqual(expectedTypeCategorized);

        // Vérifier le type de `calculateMonthlyAnalysis`
        const monthlyAnalysis = calculateMonthlyAnalysis(getUserTransactions(userId));
        type CheckMonthlyAnalysis = typeof monthlyAnalysis;
        const expectedTypeMonthlyAnalysis: CheckMonthlyAnalysis = {
            "2024-07": {
                total: 800,
                categories: {
                    Logement: -500,
                    Revenus: 1500,
                    Alimentation: -200
                }
            }
        };
        expect(monthlyAnalysis).toEqual(expectedTypeMonthlyAnalysis);

        // Vérifier le type de `calculatePercentages`
        const percentages = calculatePercentages(calculateMonthlyAnalysis(getUserTransactions(userId)));
        type CheckPercentages = typeof percentages;
        const expectedTypePercentages: CheckPercentages = {
            "2024-07": {
                total: 800,
                categories: {
                    Logement: ((-500 / 800) * 100).toFixed(2),
                    Revenus: ((1500 / 800) * 100).toFixed(2),
                    Alimentation: ((-200 / 800) * 100).toFixed(2)
                }
            }
        };
        expect(percentages).toEqual(expectedTypePercentages);

        // Vérifier le type de `getAnalyse`
        const analysis = getAnalyse(userId, data.categories);
        type CheckAnalysis = typeof analysis;
        const expectedTypeAnalysis: CheckAnalysis = {
            "2024-07": {
                total: 800,
                categories: {
                    Logement: { amount: -500, percentage: ((-500 / 800) * 100).toFixed(2) },
                    Revenus: { amount: 1500, percentage: ((1500 / 800) * 100).toFixed(2) },
                    Alimentation: { amount: -200, percentage: ((-200 / 800) * 100).toFixed(2) }
                }
            }
        };
        expect(analysis).toEqual(expectedTypeAnalysis);
    });
});