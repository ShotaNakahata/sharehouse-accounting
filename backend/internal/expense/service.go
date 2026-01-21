package expense

// Service：業務ロジック層
type Service struct {
	store *Store
}

func NewService(store *Store) *Service {
	return &Service{store: store}
}

func (s *Service) CreateExpense(e Expense) {
	s.store.Add(e)
}

func (s *Service) ListExpenses() []Expense {
	return s.store.List()
}

func (s *Service) GetMonthlySummary(month string) MonthlySummary {
	expenses := s.store.List()
	return BuildMonthlySummary(expenses, month)
}
