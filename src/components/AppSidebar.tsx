
import React from 'react';
import { Home, Calendar, Package, Truck, Users, BarChart3, Settings, MapPin, HelpCircle } from 'lucide-react';

interface AppSidebarProps {
  collapsed?: boolean;
}

export const AppSidebar: React.FC<AppSidebarProps> = ({ collapsed = false }) => {
  const menuItems = [
    { icon: Home, label: 'Home', active: false },
    { icon: Package, label: 'Inventory', active: true },
    // { icon: Calendar, label: 'Trip Execution Management', active: true },
    { icon: MapPin, label: 'Route Management', active: false },
    { icon: Truck, label: 'Fleet Management', active: false },
    // { icon: Users, label: 'Driver Management', active: false },
    // { icon: BarChart3, label: 'Analytics', active: false },
    // { icon: Settings, label: 'Settings', active: false },
  ];

  return (
    <div className="w-16 bg-white border-r border-gray-200 flex flex-col items-center py-4">
      <div className="w-8 h-8 flex items-center justify-center mb-8">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path d="M2.5 10H12.5M2.5 5H17.5M2.5 15H17.5" stroke="#475467" />
        </svg>
      </div>
      
      {/* Menu Items */}
      <div className="flex flex-col space-y-3">
        {menuItems.map((item, index) => (
          <button
            key={index}
            className={`w-10 h-10 rounded-lg flex items-center justify-center transition-colors ${
              item.active ? 'bg-blue-50 text-blue-600' : 'text-gray-500 hover:bg-gray-50 hover:text-gray-700'
            }`}
          >
            <item.icon size={20} />
          </button>
        ))}
      </div>
      
      {/* Bottom Icons */}
      <div className="flex flex-col space-y-3 mt-auto">
        <button className="w-10 h-10 rounded-lg flex items-center justify-center text-gray-500 hover:bg-gray-50 hover:text-gray-700 transition-colors">
          <Settings size={20} />
        </button>
        <button className="w-10 h-10 rounded-lg flex items-center justify-center text-gray-500 hover:bg-gray-50 hover:text-gray-700 transition-colors">
          <HelpCircle size={20} />
        </button>
      </div>
    </div>
  );
};