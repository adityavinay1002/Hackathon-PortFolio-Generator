import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import PortfolioPreview from '../components/PortfolioPreview';
import { ArrowLeft, Share2 } from 'lucide-react';
import { toast } from 'react-hot-toast';

const PublicPortfolio = () => {
    const { username } = useParams();
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPublicPortfolio = async () => {
            try {
                setLoading(true);
                const res = await axios.get(`/api/portfolio/public/${username}`);
                setData(res.data.data);
            } catch (err) {
                setError('Portfolio not found');
            } finally {
                setLoading(false);
            }
        };
        fetchPublicPortfolio();
    }, [username]);

    const copyLink = () => {
        navigator.clipboard.writeText(window.location.href);
        toast.success('Link copied!');
    };

    if (loading) return (
        <div className="min-h-screen flex flex-col items-center justify-center p-4">
            <div className="animate-spin h-10 w-10 text-primary-600 mb-4" />
            <p className="text-gray-500 font-medium">Loading Portfolio...</p>
        </div>
    );

    if (error) return (
        <div className="min-h-screen flex flex-col items-center justify-center p-4 text-center">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">404</h2>
            <p className="text-xl text-gray-600 mb-8">{error}</p>
            <Link to="/" className="btn-primary">Back to Home</Link>
        </div>
    );

    return (
        <div className="min-h-screen">
            {/* Floating Action Bar (Visible for viewers) */}
            <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[60] dark-glass px-6 py-3 rounded-2xl flex items-center gap-6 shadow-2xl">
                <Link to="/" className="text-gray-400 hover:text-white transition-colors">
                    <ArrowLeft size={20} />
                </Link>
                <div className="w-px h-6 bg-white/10" />
                <p className="text-sm font-medium text-gray-400">Built with FolioBuild</p>
                <button onClick={copyLink} className="p-2 text-gray-400 hover:text-white transition-colors">
                    <Share2 size={20} />
                </button>
            </div>

            <PortfolioPreview data={data} />
        </div>
    );
};

export default PublicPortfolio;
