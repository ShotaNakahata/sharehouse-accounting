/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import React, { useEffect, useState } from "react";
import { Field, Input, InputGroup, Button } from "@chakra-ui/react";
import { FaMoneyCheckDollar } from "react-icons/fa6";
import { useAPI } from "@/hooks/useAPI";
import { createExpense, getExpenses } from "@/lib/api/expenses";
type Expense = {
	id: string;
	title: string;
	totalAmount: number;
	paidBy: string;
	createdAt: string;
};
const Page = () => {
	//state--------------------------------------------------
	const [s_title, set_s_Title] = useState("");
	const [s_totalAmount, set_s_totalAmount] = useState(0);
	const [s_paidBy, set_s_paidBy] = useState("");
	const [s_expenses, set_s_expenses] = useState<Expense[]>([]);

	//apis--------------------------------------------------
	const call_createExpense = useAPI(createExpense);
	const call_getExpenses = useAPI(getExpenses);
	//func--------------------------------------------------
	const onSubmit = () => {
		call_createExpense.request({
			title: s_title,
			totalAmount: s_totalAmount,
			paidBy: s_paidBy,
		});
	};
	const clearForm = () => {
		set_s_Title("");
		set_s_totalAmount(0);
		set_s_paidBy("");
	};
	//effect------------------------------------------------
	// 初回取得
	useEffect(() => {
		call_getExpenses.request();
	}, [call_getExpenses.request]);

	// create 成功 → 再取得
	useEffect(() => {
		if (call_createExpense.status === "success") {
			clearForm();
			call_getExpenses.request();
		}
	}, [call_createExpense.status, call_getExpenses.request]);

	// get 成功 → state 反映
	useEffect(() => {
		if (call_getExpenses.status === "success" && call_getExpenses.data) {
			set_s_expenses(call_getExpenses.data);
		}
	}, [call_getExpenses.status, call_getExpenses.data]);

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
			{s_expenses.length > 0 ? (
				<div>
					<div>支出リスト</div>
					{s_expenses.map((expense) => (
						<div key={expense.id}>
							{expense.title} / {expense.totalAmount}円 / {expense.paidBy}
						</div>
					))}
				</div>
			) : (
				<div>Non data</div>
			)}
		</main>
	);
};

export default Page;
