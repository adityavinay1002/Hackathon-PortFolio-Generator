export const Input = ({ label, error, ...props }) => {
    return (
        <div className="mb-4">
            {label && <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>}
            <input
                className={`input-field ${error ? 'border-red-500 focus:ring-red-500/20 focus:border-red-500' : ''}`}
                {...props}
            />
            {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
        </div>
    );
};

export const TextArea = ({ label, error, ...props }) => {
    return (
        <div className="mb-4">
            {label && <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>}
            <textarea
                className={`input-field min-h-[100px] ${error ? 'border-red-500 focus:ring-red-500/20 focus:border-red-500' : ''}`}
                {...props}
            />
            {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
        </div>
    );
};
