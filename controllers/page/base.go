package page

type SingleFunc struct {
	Name string
	Path string
}

type FuncGroup struct {
	Name string
	Data []SingleFunc
}

type Link struct {
	Title string
	URL   string
}

type LinkSubGroup struct {
	Name  string
	Links []Link
}

type LinkGroup struct {
	Name string
	Data []LinkSubGroup
}

type Repo struct {
	Name        string
	Description string
	URL         string
}

type RepoGroup struct {
	Name  string
	Repos []Repo
}

type Ebook struct {
	Name        string
	Description string
	URL         string
}

type EbookGroup struct {
	Name  string
	Books []Ebook
}
