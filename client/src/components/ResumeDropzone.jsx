import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, FileText, X } from 'lucide-react';

const ResumeDropzone = ({ onFileSelect, selectedFile, onClear }) => {
    const onDrop = useCallback(acceptedFiles => {
        if (acceptedFiles.length > 0) {
            onFileSelect(acceptedFiles[0]);
        }
    }, [onFileSelect]);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: {
            'application/pdf': ['.pdf'],
            'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx']
        },
        maxFiles: 1,
        multiple: false
    });

    return (
        <div className="w-full">
            {!selectedFile ? (
                <div
                    {...getRootProps()}
                    className={`border-2 border-dashed rounded-[32px] p-12 text-center cursor-pointer transition-all
                        ${isDragActive
                            ? 'border-purple-500 bg-purple-500/5'
                            : 'border-white/10 hover:border-white/20 bg-slate-800/20'}`}
                >
                    <input {...getInputProps()} />
                    <div className="w-20 h-20 rounded-full bg-purple-600/10 flex items-center justify-center text-purple-400 mx-auto mb-6 border border-purple-500/20">
                        <Upload size={32} />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2 font-outfit">
                        {isDragActive ? 'Drop your resume here' : 'Drag & drop your resume'}
                    </h3>
                    <p className="text-gray-400">
                        Supports PDF and DOCX (Max 5MB)
                    </p>
                </div>
            ) : (
                <div className="bg-slate-800/40 p-6 rounded-[32px] border border-purple-500/30 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-purple-600/20 flex items-center justify-center text-purple-400 border border-purple-500/10">
                            <FileText size={24} />
                        </div>
                        <div>
                            <p className="text-white font-bold truncate max-w-[200px] md:max-w-md">
                                {selectedFile.name}
                            </p>
                            <p className="text-gray-500 text-sm">
                                {(selectedFile.size / (1024 * 1024)).toFixed(2)} MB
                            </p>
                        </div>
                    </div>
                    <button
                        onClick={onClear}
                        className="p-2 hover:bg-white/5 rounded-full text-gray-400 hover:text-white transition-all"
                    >
                        <X size={20} />
                    </button>
                </div>
            )}
        </div>
    );
};

export default ResumeDropzone;
