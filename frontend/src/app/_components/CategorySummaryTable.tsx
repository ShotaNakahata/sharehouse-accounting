"use client";

import { Box, Table } from "@chakra-ui/react";

export type CategorySummaryRow = {
	/** 一意キー（"fixed" など） */
	categoryId: string;
	/** 画面に表示するカテゴリ名（例："固定費"） */
	label: string;
	/** 金額 */
	amount: number;
};

type Props = {
	/** 表に表示する行データ */
	rows: CategorySummaryRow[];

	/** ヘッダー名（必要なら差し替え可） */
	headerCategoryLabel?: string;
	headerAmountLabel?: string;

	/** Boxの外枠を出すか */
	withContainer?: boolean;

	/** 追加でBoxに渡したいスタイル */
	boxProps?: React.ComponentProps<typeof Box>;

	/** 金額の表示フォーマット（必要なら差し替え可） */
	formatAmount?: (amount: number) => string;
};

export default function CategorySummaryTable({
	rows,
	headerCategoryLabel = "Category",
	headerAmountLabel = "Price",
	withContainer = true,
	boxProps,
	formatAmount = (n) => n.toLocaleString(),
}: Props) {
	const table = (
		<Table.Root size="sm" variant="line" width="100%">
			<Table.Header>
				<Table.Row>
					<Table.ColumnHeader
						backgroundColor="gray.300"
						borderRight="1px solid"
						borderColor="gray.400"
					>
						{headerCategoryLabel}
					</Table.ColumnHeader>

					<Table.ColumnHeader backgroundColor="gray.300" textAlign="start">
						{headerAmountLabel}
					</Table.ColumnHeader>
				</Table.Row>
			</Table.Header>

			<Table.Body>
				{rows.map((row) => (
					<Table.Row key={row.categoryId}>
						<Table.Cell borderRight="1px solid" borderColor="gray.200">
							{row.label}
						</Table.Cell>
						<Table.Cell textAlign="end">{formatAmount(row.amount)}</Table.Cell>
					</Table.Row>
				))}
			</Table.Body>
		</Table.Root>
	);

	if (!withContainer) return table;

	return (
		<Box
			mt={6}
			border="1px solid"
			borderColor="gray.300"
			borderRadius="md"
			overflow="hidden"
			{...boxProps}
		>
			{table}
		</Box>
	);
}
