import { useState, useEffect } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import Navbar from '../components/Navbar';
import { Input, TextArea } from '../components/Input';
import { Button } from '../components/Button';
import PortfolioPreview from '../components/PortfolioPreview';
import { Plus, Trash2, Save, Share, Check } from 'lucide-react';
import { toast } from 'react-hot-toast';

const Dashboard = () => {
    const { portfolio, loading, updatePortfolio, setLocalPortfolio } = usePortfolio();
    const [activeTab, setActiveTab] = useState('profile');
    const [formData, setFormData] = useState(null);
    const [isCopied, setIsCopied] = useState(false);

    useEffect(() => {
        if (portfolio) {
            setFormData(portfolio);
        }
    }, [portfolio]);

    if (loading || !formData) return <div className="flex items-center justify-center min-h-screen">Loading...</div>;

    const handleInputChange = (section, field, value) => {
        const updated = { ...formData };
        if (section === 'socialLinks') {
            updated.socialLinks = { ...updated.socialLinks, [field]: value };
        } else if (section === 'profile') {
            updated.profile = { ...updated.profile, [field]: value };
        }
        setFormData(updated);
        setLocalPortfolio(updated);
    };

    const handleProjectChange = (index, field, value) => {
        const updated = { ...formData };
        updated.projects[index] = { ...updated.projects[index], [field]: value };
        if (field === 'techStack' && typeof value === 'string') {
            updated.projects[index].techStack = value.split(',').map(s => s.trim());
        }
        setFormData(updated);
        setLocalPortfolio(updated);
    };

    const addProject = () => {
        const updated = { ...formData };
        updated.projects.push({ title: '', description: '', techStack: [], githubLink: '', liveLink: '' });
        setFormData(updated);
        setLocalPortfolio(updated);
    };

    const removeProject = (index) => {
        const updated = { ...formData };
        updated.projects.splice(index, 1);
        setFormData(updated);
        setLocalPortfolio(updated);
    };

    const handleSave = async () => {
        await updatePortfolio(formData);
    };

    const copyLink = () => {
        const url = `${window.location.origin}/portfolio/${portfolio.username || ''}`;
        navigator.clipboard.writeText(url);
        setIsCopied(true);
        toast.success('Link copied to clipboard!');
        setTimeout(() => setIsCopied(false), 2000);
    };

    return (
        <div className="h-screen flex flex-col bg-gray-50 overflow-hidden text-gray-900">
            <Navbar />

            <div className="flex-1 flex overflow-hidden">
                {/* Editor Sidebar */}
                <div className="w-full md:w-1/2 lg:w-[450px] bg-white border-r border-gray-200 flex flex-col">
                    <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-white z-10">
                        <div>
                            <h2 className="text-xl font-bold">Portfolio Editor</h2>
                            <p className="text-xs text-gray-500">Changes reflect instantly in the preview</p>
                        </div>
                        <div className="flex gap-2">
                            <button
                                onClick={copyLink}
                                className="p-2.5 rounded-xl border border-gray-200 hover:bg-gray-50 transition-colors text-gray-600"
                                title="Share Portfolio"
                            >
                                {isCopied ? <Check size={18} className="text-green-500" /> : <Share size={18} />}
                            </button>
                            <Button onClick={handleSave} className="!px-4 !py-2">
                                <Save size={18} className="mr-2" /> Save
                            </Button>
                        </div>
                    </div>

                    <div className="flex-1 overflow-y-auto p-6 scrollbar-hide">
                        <div className="flex gap-2 mb-8 bg-gray-100 p-1 rounded-xl">
                            {['profile', 'skills', 'projects'].map(tab => (
                                <button
                                    key={tab}
                                    onClick={() => setActiveTab(tab)}
                                    className={`flex-1 py-2 text-sm font-medium rounded-lg capitalize transition-all ${activeTab === tab ? 'bg-white text-primary-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
                                >
                                    {tab}
                                </button>
                            ))}
                        </div>

                        {activeTab === 'profile' && (
                            <div className="space-y-4">
                                <Input
                                    label="Full Name"
                                    value={formData.profile?.fullName || ''}
                                    onChange={(e) => handleInputChange('profile', 'fullName', e.target.value)}
                                />
                                <Input
                                    label="Professional Title"
                                    value={formData.profile?.title || ''}
                                    placeholder="e.g. Full Stack Developer | Java Specialist"
                                    onChange={(e) => handleInputChange('profile', 'title', e.target.value)}
                                />
                                <TextArea
                                    label="Bio"
                                    value={formData.profile?.bio || ''}
                                    onChange={(e) => handleInputChange('profile', 'bio', e.target.value)}
                                />
                                <Input
                                    label="Location"
                                    value={formData.profile?.location || ''}
                                    placeholder="e.g. Hyderabad, India"
                                    onChange={(e) => handleInputChange('profile', 'location', e.target.value)}
                                />
                                <Input
                                    label="Phone Number"
                                    value={formData.profile?.phone || ''}
                                    placeholder="+91 9989525560"
                                    onChange={(e) => handleInputChange('profile', 'phone', e.target.value)}
                                />

                                <div className="pt-6 border-t border-gray-100">
                                    <h3 className="font-bold mb-4">About Me Cards (Specializations)</h3>
                                    <div className="space-y-4">
                                        {(formData.specializations || []).map((spec, index) => (
                                            <div key={index} className="p-4 bg-gray-50 rounded-xl border border-gray-100 relative">
                                                <button
                                                    onClick={() => {
                                                        const updated = { ...formData };
                                                        updated.specializations.splice(index, 1);
                                                        setFormData(updated);
                                                        setLocalPortfolio(updated);
                                                    }}
                                                    className="absolute top-2 right-2 text-gray-400 hover:text-red-500"
                                                >
                                                    <Trash2 size={14} />
                                                </button>
                                                <Input
                                                    label="Card Title"
                                                    value={spec.title}
                                                    onChange={(e) => {
                                                        const updated = { ...formData };
                                                        updated.specializations[index].title = e.target.value;
                                                        setFormData(updated);
                                                        setLocalPortfolio(updated);
                                                    }}
                                                />
                                                <TextArea
                                                    label="Description"
                                                    value={spec.description}
                                                    onChange={(e) => {
                                                        const updated = { ...formData };
                                                        updated.specializations[index].description = e.target.value;
                                                        setFormData(updated);
                                                        setLocalPortfolio(updated);
                                                    }}
                                                />
                                                <select
                                                    className="input-field mt-2"
                                                    value={spec.icon}
                                                    onChange={(e) => {
                                                        const updated = { ...formData };
                                                        updated.specializations[index].icon = e.target.value;
                                                        setFormData(updated);
                                                        setLocalPortfolio(updated);
                                                    }}
                                                >
                                                    <option value="java">Java/Backend</option>
                                                    <option value="frontend">Frontend</option>
                                                    <option value="web">Web Development</option>
                                                </select>
                                            </div>
                                        ))}
                                        <button
                                            onClick={() => {
                                                const updated = { ...formData };
                                                if (!updated.specializations) updated.specializations = [];
                                                updated.specializations.push({ title: '', description: '', icon: 'java' });
                                                setFormData(updated);
                                                setLocalPortfolio(updated);
                                            }}
                                            className="w-full py-2 border border-dashed border-gray-300 rounded-lg text-xs font-medium text-gray-500"
                                        >
                                            + Add Specialization Card
                                        </button>
                                    </div>
                                </div>

                                <div className="pt-6 border-t border-gray-100">
                                    <h3 className="font-bold mb-4">Social Links</h3>
                                    <Input label="GitHub Username" value={formData.socialLinks?.github || ''} onChange={(e) => handleInputChange('socialLinks', 'github', e.target.value)} />
                                    <Input label="LinkedIn" value={formData.socialLinks?.linkedin || ''} onChange={(e) => handleInputChange('socialLinks', 'linkedin', e.target.value)} />
                                    <Input label="Twitter/X" value={formData.socialLinks?.twitter || ''} onChange={(e) => handleInputChange('socialLinks', 'twitter', e.target.value)} />
                                    <Input label="Instagram" value={formData.socialLinks?.instagram || ''} onChange={(e) => handleInputChange('socialLinks', 'instagram', e.target.value)} />
                                    <Input label="Personal Website" value={formData.socialLinks?.website || ''} onChange={(e) => handleInputChange('socialLinks', 'website', e.target.value)} />
                                    <Input label="Public Email" value={formData.socialLinks?.email || ''} onChange={(e) => handleInputChange('socialLinks', 'email', e.target.value)} />
                                </div>
                            </div>
                        )}

                        {activeTab === 'skills' && (
                            <div className="space-y-6">
                                {formData.skills?.map((skill, index) => (
                                    <div key={index} className="p-4 bg-gray-50 rounded-2xl border border-gray-100 flex gap-4 items-end">
                                        <div className="flex-1">
                                            <Input
                                                label="Skill Name"
                                                value={typeof skill === 'string' ? skill : skill.name}
                                                onChange={(e) => {
                                                    const updated = { ...formData };
                                                    if (typeof skill === 'string') {
                                                        updated.skills[index] = { name: e.target.value, level: 85 };
                                                    } else {
                                                        updated.skills[index].name = e.target.value;
                                                    }
                                                    setFormData(updated);
                                                    setLocalPortfolio(updated);
                                                }}
                                            />
                                        </div>
                                        <div className="w-24">
                                            <Input
                                                label="Level %"
                                                type="number"
                                                value={typeof skill === 'string' ? 85 : skill.level}
                                                onChange={(e) => {
                                                    const updated = { ...formData };
                                                    if (typeof skill === 'string') {
                                                        updated.skills[index] = { name: skill, level: parseInt(e.target.value) };
                                                    } else {
                                                        updated.skills[index].level = parseInt(e.target.value);
                                                    }
                                                    setFormData(updated);
                                                    setLocalPortfolio(updated);
                                                }}
                                            />
                                        </div>
                                        <button
                                            onClick={() => {
                                                const updated = { ...formData };
                                                updated.skills.splice(index, 1);
                                                setFormData(updated);
                                                setLocalPortfolio(updated);
                                            }}
                                            className="p-2.5 mb-4 text-gray-400 hover:text-red-500"
                                        >
                                            <Trash2 size={18} />
                                        </button>
                                    </div>
                                ))}
                                <button
                                    onClick={() => {
                                        const updated = { ...formData };
                                        if (!updated.skills) updated.skills = [];
                                        updated.skills.push({ name: '', level: 80, category: 'Frontend' });
                                        setFormData(updated);
                                        setLocalPortfolio(updated);
                                    }}
                                    className="w-full py-4 border-2 border-dashed border-gray-200 rounded-2xl text-gray-500 hover:text-primary-600 flex items-center justify-center gap-2 font-medium"
                                >
                                    <Plus size={20} /> Add New Skill
                                </button>
                            </div>
                        )}

                        {activeTab === 'projects' && (
                            <div className="space-y-8">
                                {formData.projects.map((project, index) => (
                                    <div key={index} className="p-4 bg-gray-50 rounded-2xl border border-gray-100 relative group">
                                        <button
                                            onClick={() => removeProject(index)}
                                            className="absolute top-4 right-4 text-gray-400 hover:text-red-500 transition-colors"
                                        >
                                            <Trash2 size={16} />
                                        </button>
                                        <Input
                                            label="Project Title"
                                            value={project.title}
                                            onChange={(e) => handleProjectChange(index, 'title', e.target.value)}
                                        />
                                        <TextArea
                                            label="Description"
                                            value={project.description}
                                            onChange={(e) => handleProjectChange(index, 'description', e.target.value)}
                                        />
                                        <Input
                                            label="Tech Stack (comma separated)"
                                            value={project.techStack?.join(', ') || ''}
                                            onChange={(e) => handleProjectChange(index, 'techStack', e.target.value)}
                                        />
                                        <Input
                                            label="Image URL"
                                            value={project.image || ''}
                                            onChange={(e) => handleProjectChange(index, 'image', e.target.value)}
                                        />
                                        <div className="grid grid-cols-2 gap-4">
                                            <Input
                                                label="Live Link"
                                                value={project.liveLink || ''}
                                                onChange={(e) => handleProjectChange(index, 'liveLink', e.target.value)}
                                            />
                                            <Input
                                                label="GitHub Link"
                                                value={project.githubLink || ''}
                                                onChange={(e) => handleProjectChange(index, 'githubLink', e.target.value)}
                                            />
                                        </div>
                                    </div>
                                ))}
                                <button
                                    onClick={addProject}
                                    className="w-full py-4 border-2 border-dashed border-gray-200 rounded-2xl text-gray-500 hover:text-primary-600 hover:border-primary-200 transition-all flex items-center justify-center gap-2 font-medium"
                                >
                                    <Plus size={20} /> Add New Project
                                </button>
                            </div>
                        )}
                    </div>
                </div>

                {/* Live Preview Panel */}
                <div className="hidden md:block flex-1 bg-gray-100 p-8 lg:p-12 overflow-y-auto">
                    <div className="max-w-4xl mx-auto h-full bg-white shadow-soft-lg rounded-3xl overflow-hidden border border-gray-200">
                        <PortfolioPreview data={formData} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
