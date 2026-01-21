package expense

import "sync"

// Store：一時的なメモリ保存（将来 DB に差し替え可能）
type Store struct {
	mu       sync.RWMutex
	expenses []Expense
}

// NewStore：Store を初期化して返す
func NewStore() *Store {
	return &Store{
		expenses: make([]Expense, 0),
	}
}

// Add：支出を 1 件追加する（排他ロックで保護）
func (s *Store) Add(expense Expense) {
	s.mu.Lock()
	defer s.mu.Unlock()
	s.expenses = append(s.expenses, expense)
}

// List：支出一覧を返す（内部 slice を直接返さずコピーを返して外部からの改変を防ぐ）
func (s *Store) List() []Expense {
	s.mu.RLock()
	defer s.mu.RUnlock()

	cp := make([]Expense, len(s.expenses))
	copy(cp, s.expenses)
	return cp
}
