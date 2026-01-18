package main

// ===== import =====
// このファイルで使う「外部の機能」をまとめて読み込む場所
import (
	// HTTPのステータスコード（200, 400, 201など）を使うため
	"net/http"
	"time" // 現在時刻を取得するため

	"github.com/labstack/echo/v4" // Echo：GoでWebサーバーを書くためのライブラリ

	"backend/middleware"
)

// ===== Expense構造体 =====
// 「支出1件」を表すデータの型（設計図）
//
// 構造体(struct)とは：
//  - 複数のデータを1つのまとまりとして扱うためのもの
//  - JavaScriptでいう「オブジェクトの型定義」に近い
type Expense struct {
	ID string `json:"id"`//支出のID
	//   今は簡易的に「作成時刻」から作る
	//   将来はUUIDやDBの自動採番に置き換える
	Title string `json:"title"`//何の支出か（例：トイレットペーパー）
	TotalAmount int `json:"totalAmount"`//この支出の「総額」
	//   ⚠ 割り勘後の金額ではない
	//   将来割り勘を入れるときも、この意味は変えない
	PaidBy string `json:"paidBy"`//実際にお金を払った人
	//   今は名前の文字列
	//   将来は userId に変える想定

	CreatedAt time.Time `json:"createdAt"`//この支出が登録された日時	
}

// ===== 一時的な保存場所 =====
// 本来はDBに保存するが、
// 今は「APIの流れを理解する」ためにメモリ上の配列を使う
//
// プログラムを止めると中身は消える
var expenses []Expense

func main() {
	// Echoの初期化（Webサーバー本体を作る）
	e := echo.New()
	
	e.Use(middleware.CORS())

	// POST /expenses（支出を1件登録）
	e.POST("/expenses", func(c echo.Context) error {
		// ① 受け取るJSONの形（入力用の箱）
		var input struct {
			Title       string `json:"title"`
			TotalAmount int    `json:"totalAmount"`
			PaidBy      string `json:"paidBy"`
		}

		// ② JSONをinputに詰める（Bind）
		if err := c.Bind(&input); err != nil {
			return c.JSON(http.StatusBadRequest, map[string]string{
				"error": "リクエストの形式が正しくありません",
			})
		}

		// ③ 入力チェック（バリデーション）
		if input.Title == "" {
			return c.JSON(http.StatusBadRequest, map[string]string{
				"error": "title は必須です",
			})
		}

		if input.TotalAmount <= 0 {
			return c.JSON(http.StatusBadRequest, map[string]string{
				"error": "totalAmount は1以上である必要があります",
			})
		}

		if input.PaidBy == "" {
			return c.JSON(http.StatusBadRequest, map[string]string{
				"error": "paidBy は必須です",
			})
		}

		// ④ サーバー側で正式な Expense を作る
		now := time.Now()

		expense := Expense{
			ID:          now.Format("20060102150405"),
			Title:       input.Title,
			TotalAmount: input.TotalAmount,
			PaidBy:      input.PaidBy,
			CreatedAt:   now,
		}

		// ⑤ 保存（DBなしなので配列に追加）
		expenses = append(expenses, expense)
		// ⑥ 成功レスポンス（201 Created）
		return c.JSON(http.StatusCreated,expense)
	})

// =====================================================
// GET /expenses
// 登録されている支出一覧を取得する
// =====================================================

e.GET("/expenses",func(c echo.Context) error {
	return c.JSON(http.StatusOK,expenses)
})

	// サーバー起動
	e.Logger.Fatal(e.Start(":8080"))
}
