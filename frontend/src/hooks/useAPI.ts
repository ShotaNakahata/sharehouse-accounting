/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useCallback, useState } from "react";

/** API 共通レスポンス */
type ApiResponse<T> = {
	data: T;
};

/** 引数なし API 用 */
type ApiFunctionNoParams<R> = () => Promise<ApiResponse<R>>;

/** 引数あり API 用 */
type ApiFunctionWithParams<P, R> = (params: P) => Promise<ApiResponse<R>>;

/* =========================
  overload 定義（型の契約）
========================= */

// ① 引数なし API
export function useAPI<R>(apiFunc: ApiFunctionNoParams<R>): {
	data: R | null;
	status: "idle" | "loading" | "success" | "error";
	error: string | null;
	request: () => Promise<void>;
};

// ② 引数あり API
export function useAPI<P, R>(
	apiFunc: ApiFunctionWithParams<P, R>,
): {
	data: R | null;
	status: "idle" | "loading" | "success" | "success" | "error";
	error: string | null;
	request: (params: P) => Promise<void>;
};

/* =========================
　実装（1つだけ）
========================= */

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export function useAPI(apiFunc: any) {
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	const [data, setData] = useState<any>(null);
	const [status, setStatus] = useState<
		"idle" | "loading" | "success" | "error"
	>("idle");
	const [error, setError] = useState<string | null>(null);

	const request = useCallback(
		// biome-ignore lint/suspicious/noExplicitAny: <explanation>
		async (params?: any) => {
			setStatus("loading");
			setError(null);

			try {
				const res =
					params === undefined ? await apiFunc() : await apiFunc(params);

				setData(res.data);
				setStatus("success");
			} catch {
				setStatus("error");
				setError("API request failed");
			}
		},
		[apiFunc],
	);

	return { data, status, error, request };
}
