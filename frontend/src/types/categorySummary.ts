export type CategorySummaryRow = {
	categoryId: string; // "fixed"
	label: string; // "固定費"
	amount: number; // 6000
};

export type CategorySummaryTableProps = {
	rows: CategorySummaryRow[];
};
