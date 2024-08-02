import { describe, test, expect } from "vitest";
import { readFileSync } from "fs";
import { join } from "path";


import { getAnalyse, getUserTransactions, calculateMonthlyAnalysis, categorizeTransactions, calculatePercentages } from './yourModule';

// Chemin vers le fichier JSON
const dataPath = join(__dirname, '../../backend/data/data.json');

// Lire le fichier JSON et le parser
const data = JSON.parse(readFileSync(dataPath, 'utf-8'));

describe("getAnalyse", () => {
    
    const userId = 1; // ID de l'utilisateur pour lequel nous testons

    // Mock implementation of getUserTransactions
    function mockGetUserTransactions(userId: number) {
        return data.transactions.filter((transaction: any) => transaction.userId === userId);
    }

    // Remplacer l'implémentation réelle par l'implémentation mock pour les tests
    const originalGetUserTransactions = getUserTransactions;
    getUserTransactions = mockGetUserTransactions;

    test("getUserTransactions", () => {
        const transactions = getUserTransactions(userId);
        const expectedTransactions = data.transactions.filter((transaction: any) => transaction.userId === userId);
        expect(transactions).toEqual(expectedTransactions);
    });

    test("categorizeTransactions", () => {
        const transactions = getUserTransactions(userId);
        const categorized = categorizeTransactions(transactions, data.categories);
        const expectedCategories = {
            Logement: -500,
            Revenus: 1500,
            Alimentation: -200,
        };
        expect(categorized).toEqual(expectedCategories);
    });

    test("calculateMonthlyAnalysis", () => {
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

    test("calculatePercentages", () => {
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
                    Logement: -62.5,
                    Revenus: 187.5,
                    Alimentation: -25
                }
            }
        };
        expect(percentages).toEqual(expectedPercentages);
    });

    test("getAnalyse", () => {
        const analysis = getAnalyse(userId, data.categories);
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
        expect(analysis).toEqual(expectedAnalysis);
    });

    // Restaurer l'implémentation originale après les tests
    getUserTransactions = originalGetUserTransactions;
});
