export type MonthlySummaryItem = {
	categoryId: string; // "fixed" / "utility" / etc
	label: string; // 表示名
	amount: number; // 金額
	color: string; // Chakra token or hex
};

export type MonthlySummaryProps = {
	month: string; // "2026-01"
	totalAmount: number; // 10000
	items: MonthlySummaryItem[]; // グラフ & 内訳用
};
