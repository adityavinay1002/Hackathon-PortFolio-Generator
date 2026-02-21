import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { Link } from 'react-router-dom';
import { User, Mail, Lock, Sparkles } from 'lucide-react';

const Login = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [formData, setFormData] = useState({ username: '', email: '', password: '' });
    const [loading, setLoading] = useState(false);
    const { login, register } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        if (isLogin) {
            await login(formData.email, formData.password);
        } else {
            await register(formData.username, formData.email, formData.password);
        }
        setLoading(false);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-12">
            <div className="max-w-md w-full">
                <div className="text-center mb-10">
                    <Link to="/" className="text-3xl font-outfit font-bold text-primary-600 inline-block mb-4">
                        FolioBuild
                    </Link>
                    <h2 className="text-2xl font-bold text-gray-900">
                        {isLogin ? 'Welcome back!' : 'Create your account'}
                    </h2>
                    <p className="text-gray-600 mt-2">
                        {isLogin ? "Don't have an account?" : "Already have an account?"}
                        <button
                            onClick={() => setIsLogin(!isLogin)}
                            className="ml-2 text-primary-600 font-medium hover:underline"
                        >
                            {isLogin ? 'Sign up' : 'Login'}
                        </button>
                    </p>
                </div>

                <div className="card">
                    <form onSubmit={handleSubmit}>
                        {!isLogin && (
                            <Input
                                label="Username"
                                placeholder="johndoe"
                                required
                                value={formData.username}
                                onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                            />
                        )}
                        <Input
                            label="Email"
                            type="email"
                            placeholder="john@example.com"
                            required
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        />
                        <Input
                            label="Password"
                            type="password"
                            placeholder="••••••••"
                            required
                            value={formData.password}
                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        />
                        <Button type="submit" className="w-full mt-2" loading={loading}>
                            {isLogin ? 'Login' : 'Create Account'}
                        </Button>
                    </form>

                    <div className="mt-8 pt-6 border-t border-gray-100 flex items-center justify-center gap-2 text-sm text-gray-500">
                        <Sparkles size={16} className="text-amber-400" />
                        Join 5,000+ students building their future.
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
