import { useState } from "react";
import {
    LayoutDashboard,
    Package,
    Users,
    LogOut,
    Menu,
    X
} from 'lucide-react';
import { useNavigate } from "react-router-dom"
import { Logo } from "../../assets";

const AppLayout = ({ children, activePage = '/dashboard' }) => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const navigate = useNavigate()

    const navigationItems = [
        { id: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
        { id: '/orders', label: 'Orders', icon: Package },
        { id: '/users', label: 'Users', icon: Users },
    ];

    const handleNavClick = (pageId) => {
        console.log(`Navigate to ${pageId}`);
        navigate(pageId)

        setIsMobileMenuOpen(false);
    };

    const handleLogout = () => {
        console.log('Logout clicked');
        setIsMobileMenuOpen(false);
    };

    return (
        <div className="flex h-screen bg-gray-50">
            {/* Mobile Menu Overlay */}
            {isMobileMenuOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
                    onClick={() => setIsMobileMenuOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside className={`
        fixed lg:static inset-y-0 left-0 z-50
        w-16 lg:w-64 bg-white shadow-lg
        transform transition-transform duration-300 ease-in-out
        ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        flex flex-col
      `}>
                {/* Close button for mobile */}
                <button
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="lg:hidden absolute top-4 right-4 p-2 text-gray-500 hover:text-gray-700"
                >
                    <X size={20} />
                </button>

                {/* Logo Section */}
                <div className="p-4 border-b border-gray-200">
                    <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0">
                            <img src={Logo} alt="" />
                        </div>
                        <div className="hidden lg:block">
                            <h1 className="text-lg font-cursive font-bold text-red-800">International</h1>
                            <p className="text-sm text-red-600">ELF HQ</p>
                        </div>
                    </div>
                </div>

                {/* Navigation Menu */}
                <nav className="flex-1 py-4">
                    <ul className="space-y-2 px-2">
                        {navigationItems.map((item) => {
                            const Icon = item.icon;
                            const isActive = activePage === item.id;
                            console.log(isActive)

                            return (
                                <li key={item.id}>
                                    <button
                                        onClick={() => handleNavClick(item.id)}
                                        className={`
                      w-full flex items-center space-x-3 px-3 py-3 rounded-lg
                      transition-colors duration-200
                      ${isActive
                                                ? 'bg-red-800 text-white border-r-2 border-red-100'
                                                : 'text-gray-700 hover:bg-gray-100'
                                            }
                    `}
                                    >
                                        <Icon size={20} className="flex-shrink-0" />
                                        <span className="hidden lg:block font-medium">
                                            {item.label}
                                        </span>
                                    </button>
                                </li>
                            );
                        })}
                    </ul>
                </nav>

                {/* Logout Button */}
                <div className="p-2 border-t border-gray-200">
                    <button
                        onClick={handleLogout}
                        className="
              w-full flex items-center space-x-3 px-3 py-3 rounded-lg
              text-red-600 hover:bg-red-50 transition-colors duration-200
            "
                    >
                        <LogOut size={20} className="flex-shrink-0" />
                        <span className="hidden lg:block font-medium">Logout</span>
                    </button>
                </div>
            </aside>

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col overflow-hidden">
                {/* Mobile Header */}
                <header className="lg:hidden bg-white shadow-sm border-b border-gray-200 px-4 py-3">
                    <div className="flex items-center justify-between">
                        <button
                            onClick={() => setIsMobileMenuOpen(true)}
                            className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg"
                        >
                            <Menu size={20} />
                        </button>
                        <div className="flex items-center space-x-2">
                            <div className="w-6 h-6 bg-blue-600 rounded flex items-center justify-center">
                                <span className="text-white font-bold text-xs">E</span>
                            </div>
                            <span className="font-semibold text-gray-800">ELF HQ</span>
                        </div>
                    </div>
                </header>

                {/* Main Content */}
                <main className="flex-1 overflow-auto p-6">
                    {children}
                </main>
            </div>
        </div>
    );
};


export default AppLayout