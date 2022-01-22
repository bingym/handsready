FROM golang:1.17
ENV GOPROXY https://goproxy.cn
COPY . /app
WORKDIR /app
RUN go build
EXPOSE 5200
ENTRYPOINT ["./boot.sh"]
