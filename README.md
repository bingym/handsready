# Treasure Chest

一个基于 React + TypeScript + Vite + Ant Design 的前端工具网站应用。

## 特性

- ✅ **纯前端应用**：完全独立运行，不依赖后端服务
- ✅ **Browser Router**：使用 BrowserRouter，由 Nginx 代理支持
- ✅ **数据内置**：所有工具和参考链接数据都内置在前端代码中
- ✅ **响应式设计**：支持移动端和桌面端
- ✅ **Docker 部署**：支持 Docker 容器化部署

## 开发

### 安装依赖

```bash
cd TreasureChest
yarn install
```

### 启动开发服务器

```bash
yarn dev
```

应用将在 `http://localhost:3000` 启动。

### 构建生产版本

```bash
yarn build
```

构建产物将输出到 `TreasureChest/dist` 目录。

## 部署

### Docker 部署

```bash
docker build -t treasure-chest .
docker run -p 80:80 treasure-chest
```

### 项目结构

```
.
├── TreasureChest/          # 前端项目
│   ├── src/
│   │   ├── components/     # 通用组件
│   │   ├── pages/          # 页面组件
│   │   ├── data/           # 数据文件（工具和参考链接）
│   │   └── ...
│   └── ...
├── Dockerfile              # Docker 构建文件
├── nginx.conf              # Nginx 配置文件
└── docker-compose.yml      # Docker Compose 配置（可选）
```

## 数据管理

所有数据都定义在 `TreasureChest/src/data/` 目录下：
- `toolData.ts`：工具分类和工具列表
- `referenceData.ts`：参考链接分类和链接列表

如需修改数据，直接编辑这些文件即可。

## 路由

应用使用 BrowserRouter，所有路由都是标准路径：
- `/tool` - 工具首页
- `/tool/json-format` - JSON格式化工具
- `/reference` - 参考首页
- 等等...

Nginx 配置了 `try_files` 来支持前端路由，所有未匹配的路径都会返回 `index.html`。

## 技术栈

- React 19
- TypeScript
- Vite 7
- Ant Design 6
- React Router (BrowserRouter)
- Nginx