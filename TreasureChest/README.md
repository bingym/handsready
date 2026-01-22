# Treasure Chest Frontend Application

This is a frontend tool website application based on React + TypeScript + Vite + Tailwind CSS.

## Features

- ✅ **Fully Independent**: The frontend application can run independently without backend services
- ✅ **Browser Router**: Uses BrowserRouter, supported by Nginx proxy
- ✅ **Built-in Data**: All tool and reference link data are built into the frontend code
- ✅ **Responsive Design**: Supports both mobile and desktop devices
- ✅ **Docker Deployment**: Supports Docker containerized deployment

## Development

### Install Dependencies

```bash
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

The build output will be generated in the `../static` directory.

## Project Structure

```
src/
├── components/        # Common components
│   └── Layout/       # Layout components (Header, Footer)
├── pages/            # Page components
│   ├── tool/         # Tool pages
│   └── reference/    # Reference pages
├── data/             # Data files
│   ├── toolData.ts   # Tool data
│   └── referenceData.ts  # Reference link data
├── services/         # API services (currently unused)
├── types/            # TypeScript type definitions
└── App.tsx           # Main application component
```

## Data Management

All data is defined in the `src/data/` directory:
- `toolData.ts`: Tool categories and tool list
- `referenceData.ts`: Reference link categories and link list

To modify data, simply edit these files directly.

## Routing

The application uses BrowserRouter, all routes are standard paths:
- `/tool` - Tools homepage
- `/tool/json-format` - JSON formatting tool
- `/reference` - Reference homepage
- etc...

## Deployment

### Static Deployment

The built application can be deployed to any static file server:
- GitHub Pages
- Netlify
- Vercel
- Nginx
- etc...

### Backend Integration

If integration with Go backend is needed:
1. Build frontend: `yarn build`
2. Build output will be automatically generated in `../static` directory
3. Go backend will automatically serve these static files

## Tech Stack

- React 19
- TypeScript
- Vite 7
- Tailwind CSS 4
- React Router (BrowserRouter)
- Lucide React (Icons)
- Sonner (Toast Notifications)
