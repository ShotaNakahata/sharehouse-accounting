// src/lib/api/expenseSummary.mock.ts

export type MonthlySummary = {
	month: string; //集計対象の月（例: "2026-01"）
	totalAmount: number; //今月の支出合計金額（backend集計済み
	/** 合計をカテゴリ別に分解した内訳（円グラフ用） */
	breakdown: {
		categoryId: string; //カテゴリID（将来増えるので string にする）
		label: string; // 表示用カテゴリ名（例: "固定費"）
		amount: number; //このカテゴリの合計金額（backend集計済み）
	}[];
};

/**
 * Phase1: mock
 * 将来: backend の GET /expenses/summary に差し替える
 */
export const getMonthlySummaryMock = async (): Promise<{
	data: MonthlySummary;
}> => {
	return {
		data: {
			month: "2026-01",
			totalAmount: 120000,
			breakdown: [
				{ categoryId: "fixed", label: "固定費", amount: 60000 },
				{ categoryId: "utility", label: "光熱費", amount: 25000 },
				{ categoryId: "other", label: "その他", amount: 35000 },
			],
		},
	};
};
