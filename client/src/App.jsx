import { Routes, Route, Navigate } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import PublicPortfolio from './pages/PublicPortfolio'
import SelectModePage from './pages/SelectModePage'
import ResumeImportPage from './pages/ResumeImportPage'
import { AuthProvider, useAuth } from './context/AuthContext'
import { PortfolioProvider } from './context/PortfolioContext'

const ProtectedRoute = ({ children }) => {
    const { user, loading } = useAuth();
    if (loading) return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
    if (!user) return <Navigate to="/login" />;
    return children;
};

function App() {
    return (
        <AuthProvider>
            <PortfolioProvider>
                <div className="min-h-screen bg-gray-50">
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/login" element={<Login />} />
                        <Route
                            path="/dashboard"
                            element={
                                <ProtectedRoute>
                                    <Dashboard />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/select-mode"
                            element={
                                <ProtectedRoute>
                                    <SelectModePage />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/import-resume"
                            element={
                                <ProtectedRoute>
                                    <ResumeImportPage />
                                </ProtectedRoute>
                            }
                        />
                        <Route path="/portfolio/:username" element={<PublicPortfolio />} />
                    </Routes>
                </div>
            </PortfolioProvider>
        </AuthProvider>
    )
}

export default App
