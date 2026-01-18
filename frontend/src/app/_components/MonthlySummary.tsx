"use client";

import { Cell, Label, Pie, PieChart, Tooltip } from "recharts";
import { Chart, useChart } from "@chakra-ui/charts";
import type { MonthlySummaryProps } from "@/types/monthlySummary";

const MonthlySummary = ({ month, totalAmount, items }: MonthlySummaryProps) => {
	const chart = useChart({
		data: items.map((item) => ({
			name: item.label,
			value: item.amount,
			color: item.color,
		})),
	});

	return (
		<Chart.Root boxSize="200px" chart={chart} mx="auto">
			<PieChart>
				<Tooltip
					cursor={false}
					animationDuration={100}
					content={<Chart.Tooltip hideLabel />}
				/>

				<Pie
					innerRadius={80}
					outerRadius={100}
					isAnimationActive={false}
					data={chart.data}
					dataKey={chart.key("value")}
					nameKey="name"
				>
					<Label
						content={({ viewBox }) => (
							<Chart.RadialText
								viewBox={viewBox}
								title={totalAmount.toLocaleString()}
								description={month}
							/>
						)}
					/>

					{chart.data.map((item) => (
						<Cell key={item.name} fill={chart.color(item.color)} />
					))}
				</Pie>
			</PieChart>
		</Chart.Root>
	);
};

export default MonthlySummary;
