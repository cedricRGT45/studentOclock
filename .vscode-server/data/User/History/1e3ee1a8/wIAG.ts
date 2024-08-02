describe("vérifie les types", () => {
    test("getUserTransactions type", () => {
        const transactions = getUserTransactions(userId);
        expectTypeOf(transactions).toBeArray().ofType<Transaction>();
    });

    test("categorizeTransactions type", () => {
        const transactions = getUserTransactions(userId);
        const categories = data.categories;
        const categorized = categorizeTransactions(transactions, categories);
        expectTypeOf(categorized).toBeObject().ofType<{ [key: string]: number }>();
    });

    test("calculateMonthlyAnalysis type", () => {
        const transactions = getUserTransactions(userId);
        const monthlyAnalysis = calculateMonthlyAnalysis(transactions);
        expectTypeOf(monthlyAnalysis).toBeObject().ofType<{ [key: string]: { total: number, categories: { [key: string]: number } } }>();
    });

    test("calculatePercentages type", () => {
        const transactions = getUserTransactions(userId);
        const monthlyAnalysis = calculateMonthlyAnalysis(transactions);
        const percentages = calculatePercentages(monthlyAnalysis);
        expectTypeOf(percentages).toBeObject().ofType<{ [key: string]: { total: number, categories: { [key: string]: string } } }>();
    });

    test("getAnalyse type", () => {
        const categories = data.categories;
        const analysis = getAnalyse(userId, categories);
        expectTypeOf(analysis).toBeObject().ofType<{ [key: string]: { total: number, categories: { [key: string]: { amount: number, percentage: string } } } }>();
    });
});