package expense

import "time"

// ===== Expense構造体 =====
// 「支出1件」を表すデータの型（設計図）
type Expense struct {
	ID string `json:"id"`//支出のID
	Title string `json:"title"`//何の支出か（例：トイレットペーパー）
	TotalAmount int `json:"totalAmount"`//この支出の「総額」
	PaidBy string `json:"paidBy"`//実際にお金を払った人
	CategoryID  string    `json:"categoryId"` // slug（例 fixed/utility/other）
	CreatedAt time.Time `json:"createdAt"`//この支出が登録された日時	
}
// CategoryBreakdown：カテゴリ別集計
type CategoryBreakdown struct {
	CategoryID string `json:"categoryId"` // slug
	Amount     int    `json:"amount"`     // 当該カテゴリの合計
}
// MonthlySummary：月次サマリー（Phase2：バックエンド側で集計）
type MonthlySummary struct {
	Month       string              `json:"month"`       // 例: "2026-01"
	TotalAmount int                 `json:"totalAmount"` // 当月の総支出
	Breakdown   []CategoryBreakdown `json:"breakdown"`   // カテゴリ別の合計
}