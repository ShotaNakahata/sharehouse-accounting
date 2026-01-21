package expense

import (
	"net/http"
	"time"

	"github.com/labstack/echo/v4"
)

// Handler：HTTP 入口
type Handler struct {
	service *Service
}

func NewHandler(service *Service) *Handler {
	return &Handler{service: service}
}

// POST /expenses
func (h *Handler) CreateExpense(c echo.Context) error {
	var input struct {
		Title       string `json:"title"`
		TotalAmount int    `json:"totalAmount"`
		PaidBy      string `json:"paidBy"`
		CategoryID  string `json:"categoryId"`
	}

	if err := c.Bind(&input); err != nil {
		return c.JSON(http.StatusBadRequest, map[string]string{
			"error": "リクエスト形式が不正です",
		})
	}

	if input.Title == "" || input.TotalAmount <= 0 || input.PaidBy == "" {
		return c.JSON(http.StatusBadRequest, map[string]string{
			"error": "必須項目が不足しています",
		})
	}

	now := time.Now()
	expense := Expense{
		ID:          now.Format("20060102150405"),
		Title:       input.Title,
		TotalAmount: input.TotalAmount,
		PaidBy:      input.PaidBy,
		CategoryID:  input.CategoryID,
		CreatedAt:   now,
	}

	h.service.CreateExpense(expense)
	return c.JSON(http.StatusCreated, expense)
}

// GET /expenses
func (h *Handler) ListExpenses(c echo.Context) error {
	return c.JSON(http.StatusOK, h.service.ListExpenses())
}

// GET /summary/monthly
func (h *Handler) GetMonthlySummary(c echo.Context) error {
	month := c.QueryParam("month")
	if month == "" {
		month = CurrentMonth()
	}

	summary := h.service.GetMonthlySummary(month)
	return c.JSON(http.StatusOK, summary)
}
