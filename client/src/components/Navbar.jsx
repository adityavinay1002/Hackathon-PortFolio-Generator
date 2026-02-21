import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { LogOut, User, LayoutDashboard, ExternalLink } from 'lucide-react';

const Navbar = () => {
    const { user, logout } = useAuth();

    return (
        <nav className="glass sticky top-0 z-50 border-b border-gray-200 py-4">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
                <Link to="/" className="text-2xl font-outfit font-bold text-primary-600">
                    Folio<span className="text-gray-900">Build.</span>
                </Link>
                <div className="flex items-center gap-6">
                    {user ? (
                        <>
                            <Link to="/dashboard" className="text-gray-600 hover:text-primary-600 font-medium flex items-center gap-2">
                                <LayoutDashboard size={18} />
                                Dashboard
                            </Link>
                            <Link to={`/portfolio/${user.username}`} target="_blank" className="text-gray-600 hover:text-primary-600 font-medium flex items-center gap-2">
                                <ExternalLink size={18} />
                                Live View
                            </Link>
                            <div className="flex items-center gap-3 pl-6 border-l border-gray-200">
                                <div className="text-sm">
                                    <p className="font-semibold text-gray-900">{user.username}</p>
                                </div>
                                <button
                                    onClick={logout}
                                    className="p-2 text-gray-500 hover:text-red-600 transition-colors"
                                    title="Logout"
                                >
                                    <LogOut size={20} />
                                </button>
                            </div>
                        </>
                    ) : (
                        <Link to="/login" className="btn-primary">
                            Get Started
                        </Link>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
