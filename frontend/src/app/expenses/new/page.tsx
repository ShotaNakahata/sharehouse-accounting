"use client";
import React, { useState } from "react";
import { Field, Input, InputGroup, Button } from "@chakra-ui/react";
import { FaMoneyCheckDollar } from "react-icons/fa6";
import { useAPI } from "@/hooks/useAPI";
import { createExpense } from "@/lib/api/expenses";
const Page = () => {
	//state--------------------------------------------------
	const [s_title, set_s_Title] = useState("");
	const [s_totalAmount, set_s_totalAmount] = useState(0);
	const [s_paidBy, set_s_paidBy] = useState("");
	//apis--------------------------------------------------
	const call_createExpense = useAPI(createExpense);
	//func--------------------------------------------------
	const onSubmit = () => {
		call_createExpense.request({
			title: s_title,
			totalAmount: s_totalAmount,
			paidBy: s_paidBy,
		});
	};
	//effect------------------------------------------------

	return (
		<main className="w-full h-full bg-red-200 min-h-screen">
			<h1>支出を登録</h1>
			<div>
				<div>
					<Field.Root invalid={s_title === ""}>
						<Field.Label>Title</Field.Label>
						<Input
							placeholder="Enter title"
							value={s_title}
							onChange={(e) => set_s_Title(e.target.value)}
						/>
						<Field.ErrorText>This field is required</Field.ErrorText>
					</Field.Root>
				</div>
				<div>
					<Field.Root invalid={s_totalAmount === 0}>
						<Field.Label>金額</Field.Label>
						<InputGroup startElement={<FaMoneyCheckDollar />}>
							<Input
								type="number"
								placeholder="Username"
								value={s_totalAmount}
								onChange={(e) => set_s_totalAmount(Number(e.target.value))}
							/>
						</InputGroup>
					</Field.Root>
				</div>
				<div>
					<Field.Root invalid={s_paidBy === ""}>
						<Field.Label>支払った人</Field.Label>
						<Input
							placeholder="Enter who pay"
							value={s_paidBy}
							onChange={(e) => set_s_paidBy(e.target.value)}
						/>
						<Field.ErrorText>This field is required</Field.ErrorText>
					</Field.Root>
				</div>
				<Button
					type="submit"
					onClick={() => onSubmit()}
					loading={call_createExpense.status === "loading"}
					loadingText="Submit..."
				>
					登録
				</Button>
			</div>
		</main>
	);
};

export default Page;
