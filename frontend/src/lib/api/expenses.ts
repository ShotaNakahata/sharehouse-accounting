// backend の Expense と対応する型
export type Expense = {
	id: string;
	title: string;
	totalAmount: number;
	paidBy: string;
	createdAt: string;
};
// POST /expenses 用の入力データ
export type CreateExpenseParams = {
	title: string;
	totalAmount: number;
	paidBy: string;
};
/**
 * 支出を1件作成する API
 * backend: POST http://localhost:8080/expenses
 */
export const createExpense = async (
	params: CreateExpenseParams,
): Promise<{ data: Expense }> => {
	const res = await fetch("http://localhost:8080/expenses", {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(params),
	});

	if (!res.ok) {
		throw new Error("Failed to create expense");
	}
	const data = await res.json();
	return { data };
};

/**
 * 支出一覧を取得する API
 * backend: GET http://localhost:8080/expenses
 */
export const getExpenses = async (): Promise<{ data: Expense[] }> => {
	const res = await fetch("http://localhost:8080/expenses");
	if (!res.ok) {
		throw new Error("Failed to fetch expenses");
	}
	const data = await res.json();
	return { data };
};
