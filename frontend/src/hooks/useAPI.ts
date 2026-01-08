"use client";

import { useState } from "react";

type ApiResponse<T> = {
	data: T;
};

type ApiFunction<P, R> = (params: P) => Promise<ApiResponse<R>>;

export const useAPI = <P, R>(apiFunc: ApiFunction<P, R>) => {
	const [data, setData] = useState<R | null>(null);
	const [status, setStatus] = useState<
		"idle" | "loading" | "success" | "error"
	>("idle");
	const [error, setError] = useState<string | null>(null);

	const request = async (params: P) => {
		setStatus("loading");
		setError(null);

		try {
			const res = await apiFunc(params);
			setData(res.data);
			setStatus("success");
		} catch (e) {
			setStatus("error");
			setError("API request failed");
		}
	};

	return { data, status, error, request };
};
