import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useAuth } from './AuthContext';

const PortfolioContext = createContext();

export const usePortfolio = () => useContext(PortfolioContext);

export const PortfolioProvider = ({ children }) => {
    const { user } = useAuth();
    const [portfolio, setPortfolio] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (user) {
            fetchPortfolio();
        } else {
            setPortfolio(null);
            setLoading(false);
        }
    }, [user]);

    const fetchPortfolio = async () => {
        try {
            setLoading(true);
            const res = await axios.get('/api/portfolio/me');
            setPortfolio(res.data.data);
        } catch (err) {
            console.error('Error fetching portfolio:', err);
        } finally {
            setLoading(false);
        }
    };

    const updatePortfolio = async (newData) => {
        try {
            const res = await axios.put('/api/portfolio/me', newData);
            setPortfolio(res.data.data);
            toast.success('Portfolio updated');
        } catch (err) {
            toast.error('Failed to update portfolio');
        }
    };

    // Real-time update for preview (local only)
    const setLocalPortfolio = (newData) => {
        setPortfolio(newData);
    };

    return (
        <PortfolioContext.Provider value={{ portfolio, loading, updatePortfolio, setLocalPortfolio, fetchPortfolio }}>
            {children}
        </PortfolioContext.Provider>
    );
};
