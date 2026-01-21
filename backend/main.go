package main

import (
	"github.com/labstack/echo/v4"

	"backend/internal/expense"
	"backend/middleware"
)

func main() {
	// =========================
	// Echo 初期化
	// =========================
	e := echo.New()
	e.Use(middleware.CORS())

	// =========================
	// 依存関係の組み立て
	// =========================

	// データ保存層（今はメモリ）
	store := expense.NewStore()

	// 業務ロジック層
	service := expense.NewService(store)

	// HTTP ハンドラー層
	handler := expense.NewHandler(service)

	// =========================
	// routing（ここでは「つなぐだけ」）
	// =========================
	e.POST("/expenses", handler.CreateExpense)
	e.GET("/expenses", handler.ListExpenses)
	e.GET("/summary/monthly", handler.GetMonthlySummary)

	// =========================
	// server start
	// =========================
	e.Logger.Fatal(e.Start(":8080"))
}
