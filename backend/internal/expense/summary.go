package expense

import (
	"sort"
	"time"
)

// BuildMonthlySummary：指定月（YYYY-MM）の集計を作る
func BuildMonthlySummary(expenses []Expense, month string) MonthlySummary {
	total := 0
	sumByCategory := map[string]int{}

	for _, e := range expenses {
		// e.CreatedAt が指定月か判定
		if e.CreatedAt.Format("2006-01") != month {
			continue
		}
		total += e.TotalAmount
		sumByCategory[e.CategoryID] += e.TotalAmount
	}

	// map → slice に変換（フロントに返しやすい形にする）
	breakdown := make([]CategoryBreakdown, 0, len(sumByCategory))
	for categoryID, amount := range sumByCategory {
		breakdown = append(breakdown, CategoryBreakdown{
			CategoryID: categoryID,
			Amount:     amount,
		})
	}

	// 並び順を安定させる（テストや表示がブレない）
	sort.Slice(breakdown, func(i, j int) bool {
		return breakdown[i].CategoryID < breakdown[j].CategoryID
	})

	return MonthlySummary{
		Month:       month,
		TotalAmount: total,
		Breakdown:   breakdown,
	}
}

// CurrentMonth：今月（YYYY-MM）を返す
func CurrentMonth() string {
	return time.Now().Format("2006-01")
}
