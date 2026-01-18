import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';

const logoPath = '/static/images/logo.png';

const menuItems = [
  { path: '/tool', label: 'Tools' },
  { path: '/reference', label: 'Reference' },
  { path: '/about', label: 'About' },
];

export const Sidebar = () => {
  const location = useLocation();

  return (
    <div className="w-64 bg-white border-r border-gray-200 h-screen fixed left-0 top-0 flex flex-col">
      <div className="p-6 border-b border-gray-200">
        <Link to="/" className="flex items-center space-x-2">
          <img 
            src={logoPath} 
            alt="Logo" 
            className="h-8 w-auto"
            onError={(e) => {
              (e.target as HTMLImageElement).style.display = 'none';
            }} 
          />
          <span className="text-xl font-bold">Treasure Chest</span>
        </Link>
      </div>
      <nav className="flex-1 p-4 space-y-2">
        {menuItems.map((item) => {
          const isActive = location.pathname === item.path || 
                         (item.path !== '/' && location.pathname.startsWith(item.path));
          return (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "block px-4 py-2 rounded-lg transition-colors",
                isActive
                  ? "bg-gray-100 text-gray-900 font-medium"
                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              )}
            >
              {item.label}
            </Link>
          );
        })}
      </nav>
    </div>
  );
};
