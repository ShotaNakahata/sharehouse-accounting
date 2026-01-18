"use client";
import { Text } from "@chakra-ui/react";
import { Table, Box } from "@chakra-ui/react";
import MonthlySummary from "@/app/_components/MonthlySummary";

const items = [
	{ id: 1, name: "Laptop", category: "Electronics", price: 999.99 },
	{ id: 2, name: "Coffee Maker", category: "Home Appliances", price: 49.99 },
	{ id: 3, name: "Desk Chair", category: "Furniture", price: 150.0 },
	{ id: 4, name: "Smartphone", category: "Electronics", price: 799.99 },
	{ id: 5, name: "Headphones", category: "Accessories", price: 199.99 },
];
export default function Home() {
	const mockChartItems = [
		{
			categoryId: "fixed",
			label: "固定費",
			amount: 6000,
			color: "blue.solid",
		},
		{
			categoryId: "utility",
			label: "光熱費",
			amount: 2500,
			color: "orange.solid",
		},
		{
			categoryId: "other",
			label: "その他",
			amount: 1500,
			color: "green.solid",
		},
	];
	return (
		<div className="flex min-h-screen flex-col items-center">
			{/* Header（仮）のちにlayoutへ移行 */}
			<header className="h-20 border-b flex items-center px-4">Header</header>
			<main className="flex-1 px-4 py-6 w-[90%] ">
				<div className="flex flex-col items-center justify-center ">
					<Text fontSize="2xl" fontWeight="bold">
						2026-01
					</Text>
					<Text fontSize="2xl" fontWeight="bold">
						合計出費 10000元
					</Text>
				</div>
				<MonthlySummary
					month="2026-01"
					totalAmount={10000}
					items={mockChartItems}
				/>

				<Box
					mt={6}
					border="1px solid"
					borderColor="gray.300"
					borderRadius="md"
					overflow="hidden"
				>
					<Table.Root size="sm" variant="line" width="100%">
						<Table.Header>
							<Table.Row>
								<Table.ColumnHeader
									backgroundColor="gray.300"
									borderRight="1px solid"
									borderColor="gray.400"
								>
									Category
								</Table.ColumnHeader>
								<Table.ColumnHeader
									backgroundColor="gray.300"
									textAlign="start"
								>
									Price
								</Table.ColumnHeader>
							</Table.Row>
						</Table.Header>

						<Table.Body>
							{items.map((item) => (
								<Table.Row key={item.id}>
									<Table.Cell borderRight="1px solid" borderColor="gray.200">
										{item.category}
									</Table.Cell>
									<Table.Cell textAlign="end">{item.price}</Table.Cell>
								</Table.Row>
							))}
						</Table.Body>
					</Table.Root>
				</Box>
			</main>
		</div>
	);
}
