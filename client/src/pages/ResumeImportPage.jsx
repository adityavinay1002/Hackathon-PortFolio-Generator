import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { Loader2, ArrowLeft, Wand2 } from 'lucide-react';
import ResumeDropzone from '../components/ResumeDropzone';
import { usePortfolio } from '../context/PortfolioContext';

const ResumeImportPage = () => {
    const navigate = useNavigate();
    const { portfolio, setLocalPortfolio } = usePortfolio();
    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleFileUpload = async () => {
        if (!file) {
            toast.error('Please select a file first');
            return;
        }

        setLoading(true);
        const formData = new FormData();
        formData.append('resume', file);

        try {
            const token = localStorage.getItem('token');
            const res = await axios.post('/api/resume/parse', formData, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            if (res.data.success) {
                toast.success('Resume parsed successfully!');

                // Merge parsed data with existing portfolio to preserve fields like username, _id, etc.
                const updatedPortfolio = {
                    ...portfolio,
                    ...res.data.data,
                    profile: {
                        ...portfolio?.profile,
                        ...res.data.data.profile
                    },
                    socialLinks: {
                        ...portfolio?.socialLinks,
                        ...res.data.data.socialLinks
                    }
                };

                setLocalPortfolio(updatedPortfolio);
                navigate('/dashboard', { state: { fromImport: true } });
            }
        } catch (err) {
            console.error('Error parsing resume:', err);
            toast.error(err.response?.data?.message || 'Failed to parse resume');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#0b0e14] flex flex-col items-center justify-center px-4 py-12">
            <div className="max-w-2xl w-full">
                <button
                    onClick={() => navigate('/select-mode')}
                    className="flex items-center gap-2 text-gray-400 hover:text-white mb-8 transition-all group"
                >
                    <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-all" />
                    <span>Back to selection</span>
                </button>

                <div className="bg-slate-800/20 border border-white/5 rounded-[40px] p-8 md:p-12">
                    <div className="text-center mb-10">
                        <div className="w-20 h-20 rounded-3xl bg-blue-600/10 flex items-center justify-center text-blue-400 mx-auto mb-6 border border-blue-500/20">
                            <Wand2 size={40} />
                        </div>
                        <h1 className="text-3xl md:text-4xl font-bold text-white mb-4 font-outfit">
                            Import your <span className="text-blue-500">Resume</span>
                        </h1>
                        <p className="text-gray-400 max-w-md mx-auto">
                            Upload your resume and our AI-powered parser will automatically extract your info.
                        </p>
                    </div>

                    <ResumeDropzone
                        onFileSelect={setFile}
                        selectedFile={file}
                        onClear={() => setFile(null)}
                    />

                    <div className="mt-10">
                        <button
                            onClick={handleFileUpload}
                            disabled={!file || loading}
                            className={`w-full py-4 rounded-2xl flex items-center justify-center gap-3 font-bold text-lg transition-all
                                ${!file || loading
                                    ? 'bg-slate-800 text-gray-500 cursor-not-allowed border border-white/5'
                                    : 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:opacity-90 shadow-lg shadow-blue-600/20'}`}
                        >
                            {loading ? (
                                <>
                                    <Loader2 className="animate-spin" size={20} />
                                    <span>Processing Resume...</span>
                                </>
                            ) : (
                                <>
                                    <Wand2 size={20} />
                                    <span>Generate Portfolio</span>
                                </>
                            )}
                        </button>
                    </div>

                    <p className="mt-8 text-center text-xs text-gray-500">
                        By uploading, you agree to our processing of your resume data.
                        Don't worry, you can edit everything later.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default ResumeImportPage;
