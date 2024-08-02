describe('Type Tests', () => {
  test('getUserTransactions type', () => {
    const transactions = getUserTransactions(1);
    expectTypeOf(transactions).toBeArray().items.toBeInstanceOf(Transaction);
  });

  test('categorizeTransactions type', () => {
    const transactions = getUserTransactions(1);
    const categories = [] as Category[];
    const categorized = categorizeTransactions(transactions, categories);
    expectTypeOf(categorized).toBeObject().toMatchTypeOf<{ [key: string]: number }>();
  });

  test('calculateMonthlyAnalysis type', () => {
    const transactions = getUserTransactions(1);
    const monthlyAnalysis = calculateMonthlyAnalysis(transactions);
    expectTypeOf(monthlyAnalysis).toBeObject().toMatchTypeOf<{ [key: string]: { total: number, categories: { [key: string]: number } } }>();
  });

  test('calculatePercentages type', () => {
    const transactions = getUserTransactions(1);
    const monthlyAnalysis = calculateMonthlyAnalysis(transactions);
    const percentages = calculatePercentages(monthlyAnalysis);
    expectTypeOf(percentages).toBeObject().toMatchTypeOf<{ [key: string]: { total: number, categories: { [key: string]: string } } }>();
  });

  test('getAnalyse type', () => {
    const categories = [] as Category[];
    const analysis = getAnalyse(1, categories);
    expectTypeOf(analysis).toBeObject().toMatchTypeOf<{ [key: string]: { total: number, categories: { [key: string]: { amount: number, percentage: string } } } }>();
  });
});