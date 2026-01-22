# Treasure Chest

A frontend tool website application based on React + TypeScript + Vite + Tailwind CSS.

## Features

- ✅ **Pure Frontend Application**: Runs completely independently, no backend service required
- ✅ **Browser Router**: Uses BrowserRouter, supported by Nginx proxy
- ✅ **Built-in Data**: All tool and reference link data are built into the frontend code
- ✅ **Responsive Design**: Supports both mobile and desktop devices
- ✅ **Docker Deployment**: Supports Docker containerized deployment

## Development

### Install Dependencies

```bash
cd TreasureChest
yarn install
```

### Start Development Server

```bash
yarn dev
```

The application will start at `http://localhost:3000`.

### Build Production Version

```bash
yarn build
```

The build output will be generated in the `TreasureChest/dist` directory.

## Deployment

### Docker Deployment

```bash
docker build -t treasure-chest .
docker run -p 80:80 treasure-chest
```

### Project Structure

```
.
├── TreasureChest/          # Frontend project
│   ├── src/
│   │   ├── components/     # Common components
│   │   ├── pages/          # Page components
│   │   ├── data/           # Data files (tools and reference links)
│   │   └── ...
│   └── ...
├── Dockerfile              # Docker build file
├── nginx.conf              # Nginx configuration file
└── docker-compose.yml      # Docker Compose configuration (optional)
```

## Data Management

All data is defined in the `TreasureChest/src/data/` directory:
- `toolData.ts`: Tool categories and tool list
- `referenceData.ts`: Reference link categories and link list

To modify data, simply edit these files directly.

## Routing

The application uses BrowserRouter, all routes are standard paths:
- `/tool` - Tools homepage
- `/tool/json-format` - JSON formatting tool
- `/reference` - Reference homepage
- etc...

Nginx is configured with `try_files` to support frontend routing, all unmatched paths will return `index.html`.

## Tech Stack

- React 19
- TypeScript
- Vite 7
- Tailwind CSS 4
- React Router (BrowserRouter)
- Lucide React (Icons)
- Sonner (Toast Notifications)
- Nginx