import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FileText, Edit3, ArrowRight } from 'lucide-react';

const SelectModePage = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
            <div className="max-w-4xl w-full">
                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-910 mb-4 font-outfit">
                        How would you like to <span className="text-purple-600">start?</span>
                    </h1>
                    <p className="text-gray-600 text-lg">Choose a method to build your professional portfolio</p>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                    {/* Manual Mode */}
                    <div
                        onClick={() => navigate('/dashboard')}
                        className="group bg-white p-8 rounded-[32px] border border-gray-100 shadow-sm hover:shadow-xl hover:border-purple-500/30 transition-all cursor-pointer relative overflow-hidden"
                    >
                        <div className="absolute top-0 right-0 p-6 opacity-0 group-hover:opacity-100 transition-all transform translate-x-4 group-hover:translate-x-0">
                            <ArrowRight className="text-purple-500" />
                        </div>
                        <div className="w-16 h-16 rounded-2xl bg-purple-600/10 flex items-center justify-center text-purple-600 mb-6 border border-purple-500/20 group-hover:bg-purple-600 group-hover:text-white transition-all">
                            <Edit3 size={32} />
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-4 font-outfit">Build Manually</h3>
                        <p className="text-gray-600 leading-relaxed mb-6">
                            Start from scratch and enter your details step-by-step. Full control over every section.
                        </p>
                        <div className="flex items-center text-purple-600 font-bold group-hover:gap-2 transition-all">
                            <span>Get Started</span>
                            <ArrowRight size={18} className="ml-1" />
                        </div>
                    </div>

                    {/* Resume Import Mode */}
                    <div
                        onClick={() => navigate('/import-resume')}
                        className="group bg-white p-8 rounded-[32px] border border-gray-100 shadow-sm hover:shadow-xl hover:border-blue-500/30 transition-all cursor-pointer relative overflow-hidden"
                    >
                        <div className="absolute top-0 right-0 p-6 opacity-0 group-hover:opacity-100 transition-all transform translate-x-4 group-hover:translate-x-0">
                            <ArrowRight className="text-blue-500" />
                        </div>
                        <div className="w-16 h-16 rounded-2xl bg-blue-600/10 flex items-center justify-center text-blue-600 mb-6 border border-blue-500/20 group-hover:bg-blue-600 group-hover:text-white transition-all">
                            <FileText size={32} />
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-4 font-outfit">Import Resume</h3>
                        <p className="text-gray-600 leading-relaxed mb-6">
                            Upload your existing resume (PDF/DOCX) and we'll automatically fill in your details for you.
                        </p>
                        <div className="flex items-center text-blue-600 font-bold group-hover:gap-2 transition-all">
                            <span>Upload Resume</span>
                            <ArrowRight size={18} className="ml-1" />
                        </div>
                    </div>
                </div>

                <div className="mt-12 text-center text-gray-500 text-sm">
                    <p>Both options allow you to edit and preview your portfolio in real-time.</p>
                </div>
            </div>
        </div>
    );
};

export default SelectModePage;
