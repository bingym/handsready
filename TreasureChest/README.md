# Treasure Chest 前端应用

这是一个基于 React + TypeScript + Vite + Ant Design 的前端工具网站应用。

## 特性

- ✅ **完全独立运行**：前端应用可以独立运行，不依赖后端服务
- ✅ **Browser Router**：使用 BrowserRouter，由 Nginx 代理支持
- ✅ **数据内置**：所有工具和参考链接数据都内置在前端代码中
- ✅ **响应式设计**：支持移动端和桌面端
- ✅ **Docker 部署**：支持 Docker 容器化部署

## 开发

### 安装依赖

```bash
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

构建产物将输出到 `../static` 目录。

## 项目结构

```
src/
├── components/        # 通用组件
│   └── Layout/       # 布局组件（Header, Footer）
├── pages/            # 页面组件
│   ├── tool/         # 工具页面
│   └── reference/    # 参考页面
├── data/             # 数据文件
│   ├── toolData.ts   # 工具数据
│   └── referenceData.ts  # 参考链接数据
├── services/         # API服务（当前未使用）
├── types/            # TypeScript类型定义
└── App.tsx           # 主应用组件
```

## 数据管理

所有数据都定义在 `src/data/` 目录下：
- `toolData.ts`：工具分类和工具列表
- `referenceData.ts`：参考链接分类和链接列表

如需修改数据，直接编辑这些文件即可。

## 路由

应用使用 HashRouter，所有路由都使用 `#` 前缀：
- `#/tool` - 工具首页
- `#/tool/json-format` - JSON格式化工具
- `#/reference` - 参考首页
- 等等...

## 部署

### 静态部署

构建后的应用可以部署到任何静态文件服务器：
- GitHub Pages
- Netlify
- Vercel
- Nginx
- 等等...

### 与后端集成

如果需要与 Go 后端集成：
1. 构建前端：`yarn build`
2. 构建产物会自动输出到 `../static` 目录
3. Go 后端会自动服务这些静态文件

## 技术栈

- React 19
- TypeScript
- Vite 7
- Ant Design 6
- React Router (HashRouter)
