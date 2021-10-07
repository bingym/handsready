package page

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"os"
)

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

func loadDataFile(fileName string, v interface{}) {
	filePath := fmt.Sprintf("./data/%s", fileName)
	file, err := os.Open(filePath)
	defer file.Close()
	if err != nil {
		panic(fmt.Sprintf("read %s failed!", fileName))
	}
	content, err := ioutil.ReadAll(file)
	if err != nil {
		panic(fmt.Sprintf("read %s failed!", fileName))
	}
	if err = json.Unmarshal(content, v); err != nil {
		panic(fmt.Sprintf("json unmarshal %s failed, please check file!", fileName))
	}
}
