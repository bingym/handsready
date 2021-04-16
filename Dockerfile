FROM golang:1.15.8
ENV GOPROXY https://goproxy.cn
COPY . /app
WORKDIR /app
RUN go build
EXPOSE 5200
ENTRYPOINT ["./taiyuan"]
