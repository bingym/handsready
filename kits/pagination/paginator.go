package pagination

type paginator interface {
	Pages() int
	HasPrev() bool
	HasNext() bool
	PrevNum() int
	NextNum() int
	CurrentPage() int
	PaginateRet() map[string]interface{}
}

type SimplePaginator struct {
	Total             int         `json:"total"`
	Page              int         `json:"page"`
	PaginationPerPage int         `json:"pagination_per_page"`
	Data              interface{} `json:"data"`
}

func (p *SimplePaginator) CurrentPage() int {
	return p.Page
}

func (p *SimplePaginator) Pages() int {
	if p.Total%p.PaginationPerPage == 0 {
		return p.Total / p.PaginationPerPage
	} else {
		return p.Total/p.PaginationPerPage + 1
	}
}

func (p *SimplePaginator) HasPrev() bool {
	// 是否有上一页
	return p.Page > 1
}

func (p *SimplePaginator) HasNext() bool {
	// 是否有下一页
	return p.Page < p.Pages()
}

func (p *SimplePaginator) NextNum() int {
	// 下页页码
	return p.Page + 1
}

func (p *SimplePaginator) PrevNum() int {
	// 上页页码
	return p.Page - 1
}

func (p *SimplePaginator) PaginateRet() map[string]interface{} {
	return map[string]interface{}{
		"data":     p.Data,
		"has_prev": p.HasPrev(),
		"has_next": p.HasNext(),
		"total":    p.Total,
		"prev_num": p.PrevNum(),
		"next_num": p.NextNum(),
		"page":     p.Page,
	}
}
