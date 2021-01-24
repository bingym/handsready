package pinyin

import (
	"github.com/mozillazg/go-pinyin"
	"unicode"
)

func GetFirstLetter(str string) string {
	args := pinyin.NewArgs()
	var firstChar rune
	for _, item := range str {
		if unicode.IsDigit(item) {
			continue
		}
		firstChar = item
		break
	}
	if unicode.Is(unicode.Scripts["Han"], firstChar) {
		return pinyin.Pinyin(string(firstChar), args)[0][0][0:1]
	} else {
		return string(unicode.ToLower(firstChar))
	}
}

func GetAllLetters() []string {
	ret := []string{}
	for i := 'a'; i <= 'z'; i++ {
		ret = append(ret, string(i))
	}
	return ret
}
