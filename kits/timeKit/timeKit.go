package timeKit

import (
	"log"
	"time"
)

const (
	NORMAL_TIME_LAYOUT = "2006-01-02 15:04:05"
)

func QiniuTimeToTime(qiniuTime string) *time.Time {
	res, err := time.Parse("2006:01:02 15:04:05", qiniuTime)
	if err != nil {
		log.Printf("解析七牛时间失败, %s", err.Error())
	}
	return &res
}

func CreateDate(year int, month int, day int) time.Time {
	return time.Date(
		year, time.Month(month), day, 0, 0, 0, 0, time.Now().Location(),
	)
}

func String2Time(s string) (*time.Time, error) {
	var (
		res time.Time
		err error
	)
	res, err = time.Parse(NORMAL_TIME_LAYOUT, s)
	if err != nil {
		log.Printf("字符串转时间失败，%s", err.Error())
	}
	return &res, err
}

func Time2String(t *time.Time) string {
	return t.Format(NORMAL_TIME_LAYOUT)
}
