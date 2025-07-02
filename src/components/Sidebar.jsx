import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export default function Sidebar() {
  const location = useLocation();
  const { logout } = useAuth();

  const menuItems = [
    { path: '/welcome', label: '歡迎頁面', icon: '🏠' },
    { path: '/users', label: '使用者管理', icon: '👥' },
    { path: '/orders', label: '訂單查詢', icon: '📦' },
  ];

  return (
    <div className="bg-gray-800 text-white w-64 min-h-screen p-4">
      <div className="mb-8">
        <h1 className="text-2xl font-bold">電商後台</h1>
      </div>
      
      <nav className="space-y-2">
        {menuItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`flex items-center space-x-3 p-3 rounded-lg transition-colors ${
              location.pathname === item.path
                ? 'bg-gray-700'
                : 'hover:bg-gray-700'
            }`}
          >
            <span className="text-xl">{item.icon}</span>
            <span>{item.label}</span>
          </Link>
        ))}
      </nav>
      
      <div className="mt-auto pt-8">
        <button
          onClick={logout}
          className="w-full flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-700 transition-colors"
        >
          <span className="text-xl">🚪</span>
          <span>登出</span>
        </button>
      </div>
    </div>
  );
}