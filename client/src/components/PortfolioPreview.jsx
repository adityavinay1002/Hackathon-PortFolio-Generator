import { ExternalLink, Github, Mail, Linkedin, Twitter, Sun, Moon, MapPin, Phone, MessageSquare, Download, ChevronDown, Code, Monitor, Server, User, Instagram } from 'lucide-react';
import { useState } from 'react';

const PortfolioPreview = ({ data }) => {
    const [isDark, setIsDark] = useState(true);
    if (!data) return <div className="flex items-center justify-center h-full text-white bg-slate-900">Loading preview...</div>;

    const { profile = {}, socialLinks = {}, skills = [], projects = [], specializations = [] } = data;

    const activeSpecializations = specializations.length > 0 ? specializations : [
        { title: 'Java Programming', description: 'Designing and building secure, scalable backend applications using Java.', icon: 'java' },
        { title: 'Front-End Development', description: 'Creating clean, responsive, and accessible interfaces using modern technologies.', icon: 'frontend' },
        { title: 'Web Development', description: 'Building full stack applications for smooth user experiences.', icon: 'web' }
    ];

    const getIcon = (type) => {
        switch (type) {
            case 'java': return <Code className="text-purple-400" size={24} />;
            case 'frontend': return <Monitor className="text-blue-400" size={24} />;
            case 'web': return <Server className="text-green-400" size={24} />;
            default: return <Code className="text-purple-400" size={24} />;
        }
    };

    return (
        <div className={`${isDark ? 'bg-[#0b0e14] text-gray-300' : 'bg-gray-50 text-gray-700'} min-h-full font-inter overflow-y-auto transition-colors duration-300`}>
            {/* Navigation */}
            <nav className={`px-8 py-6 flex justify-between items-center border-b ${isDark ? 'border-white/5 bg-[#0b0e14]/80 text-white' : 'border-black/5 bg-white/80 text-gray-900'} sticky top-0 backdrop-blur-md z-50 transition-colors duration-300`}>
                <div className="text-xl font-bold">
                    {profile.fullName?.split(' ')[0] || 'User'} <span className="text-purple-500">FolioBuild</span>
                </div>
                <div className="hidden md:flex gap-8 text-sm font-medium">
                    <a href="#home" className="hover:text-purple-500 transition-colors">Home</a>
                    <a href="#about" className="hover:text-purple-500 transition-colors">About</a>
                    <a href="#skills" className="hover:text-purple-500 transition-colors">Skills</a>
                    <a href="#projects" className="hover:text-purple-500 transition-colors">Projects</a>
                    <a href="#contact" className="hover:text-purple-500 transition-colors">Contact</a>
                </div>
                <div
                    onClick={() => setIsDark(!isDark)}
                    className={`w-10 h-10 rounded-full flex items-center justify-center border cursor-pointer transition-all duration-300 ${isDark ? 'bg-purple-600/20 text-purple-400 border-purple-500/20 hover:bg-purple-600/30' : 'bg-purple-100 text-purple-600 border-purple-200 hover:bg-purple-200'}`}
                >
                    {isDark ? <Moon size={20} /> : <Sun size={20} />}
                </div>
            </nav>

            {/* Hero Section */}
            <section id="home" className="px-8 py-24 flex flex-col md:flex-row items-center gap-16 max-w-7xl mx-auto">
                <div className="flex-1 text-center md:text-left">
                    <h2 className={`text-6xl font-bold font-outfit mb-6 leading-tight ${isDark ? 'text-white' : 'text-gray-900'}`}>
                        Hi, I'm <span className="text-purple-500">{profile.fullName || 'User Name'}</span>
                    </h2>
                    <p className={`text-xl mb-10 max-w-xl leading-relaxed ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                        {profile.bio || 'Enter your professional bio and career goals.'}
                    </p>
                    <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                        <a href="#projects" className="btn-accent px-8 py-3.5 flex items-center gap-2">
                            View My Work
                        </a>
                    </div>
                </div>
                <div className="relative">
                    <div className="absolute -top-4 -right-4 w-6 h-6 bg-yellow-400 rounded-full animate-pulse"></div>
                    <div className="absolute top-1/2 -left-8 w-4 h-4 bg-green-400 rounded-full"></div>
                    <div className="absolute -bottom-4 left-1/4 w-5 h-5 bg-pink-500 rounded-full"></div>
                    <div className={`w-[300px] h-[300px] lg:w-[400px] lg:h-[400px] rounded-full border-4 p-2 relative ${isDark ? 'border-slate-800' : 'border-gray-200'}`}>
                        <div className={`w-full h-full rounded-full overflow-hidden border-4 border-purple-500/50 relative ${isDark ? 'bg-slate-800' : 'bg-gray-100'}`}>
                            {profile.avatar ? (
                                <img src={profile.avatar} alt="Profile" className="w-full h-full object-cover" />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center">
                                    <User className={isDark ? 'text-slate-600' : 'text-gray-400'} size={100} />
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </section>

            <div className={`flex flex-col items-center mb-20 text-sm animate-bounce ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
                <span className="mb-2">Scroll</span>
                <ChevronDown size={16} />
            </div>

            {/* About Me */}
            <section id="about" className={`px-8 py-32 relative transition-colors duration-300 ${isDark ? 'bg-[#0d1117]' : 'bg-white'}`}>
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-20">
                        <h3 className={`text-4xl font-bold font-outfit ${isDark ? 'text-white' : 'text-gray-900'}`}>About <span className="text-purple-500">Me</span></h3>
                    </div>

                    <div className="flex flex-col lg:flex-row gap-20">
                        <div className="lg:w-1/2">
                            <h4 className={`text-2xl font-bold mb-8 border-l-4 border-purple-500 pl-4 ${isDark ? 'text-white' : 'text-gray-800'}`}>
                                {profile.title || 'Specialist Title'}
                            </h4>
                            <p className={`text-lg mb-10 leading-relaxed ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                                {profile.bio || 'Your detailed professional description goes here.'}
                            </p>
                            <div className="flex gap-4">
                                <a href="#contact" className="btn-accent py-3">Get In Touch</a>
                                <button className={`px-6 py-3 border border-purple-500 text-purple-400 rounded-xl hover:bg-purple-500/10 transition-all flex items-center gap-2 ${isDark ? 'text-purple-400' : 'text-purple-600 hover:bg-purple-50'}`}>
                                    <Download size={18} /> Download CV
                                </button>
                            </div>
                        </div>

                        <div className="lg:w-1/2 grid gap-6">
                            {activeSpecializations.map((spec, i) => (
                                <div key={i} className={`p-6 rounded-2xl border flex gap-6 hover:transform hover:translate-x-2 transition-all group ${isDark ? 'bg-slate-800/40 border-white/5 hover:bg-slate-800/60' : 'bg-gray-50 border-gray-200 hover:bg-gray-100'}`}>
                                    <div className={`w-14 h-14 rounded-xl flex items-center justify-center shrink-0 border transition-all ${isDark ? 'bg-slate-900 border-white/5 group-hover:border-purple-500/30' : 'bg-white border-gray-200 group-hover:border-purple-300'}`}>
                                        {getIcon(spec.icon)}
                                    </div>
                                    <div>
                                        <h5 className={`text-xl font-bold mb-2 ${isDark ? 'text-white' : 'text-gray-800'}`}>{spec.title}</h5>
                                        <p className={`text-sm leading-relaxed ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>{spec.description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Skills */}
            <section id="skills" className="px-8 py-32 max-w-7xl mx-auto">
                <div className="text-center mb-20">
                    <h3 className={`text-4xl font-bold font-outfit ${isDark ? 'text-white' : 'text-gray-900'}`}>My <span className="text-purple-500">Skills</span></h3>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {skills.length > 0 ? skills.map((skill, i) => (
                        <div key={i} className={`p-6 rounded-2xl border transition-all ${isDark ? 'bg-slate-800/40 border-white/5' : 'bg-white border-gray-100 shadow-sm'}`}>
                            <div className="flex justify-between items-center mb-4">
                                <span className={`font-bold ${isDark ? 'text-white' : 'text-gray-800'}`}>{typeof skill === 'string' ? skill : skill.name}</span>
                                <span className="text-sm font-bold text-purple-500">{typeof skill === 'string' ? '85' : skill.level}%</span>
                            </div>
                            <div className={`w-full h-2.5 rounded-full overflow-hidden ${isDark ? 'bg-slate-700' : 'bg-gray-100'}`}>
                                <div
                                    className="h-full bg-gradient-to-r from-purple-500 to-blue-500 rounded-full"
                                    style={{ width: `${typeof skill === 'string' ? '85' : skill.level}%` }}
                                ></div>
                            </div>
                        </div>
                    )) : (
                        <p className={`col-span-full text-center italic ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>No skills added yet.</p>
                    )}
                </div>
            </section>

            {/* Projects */}
            <section id="projects" className={`px-8 py-32 transition-colors duration-300 ${isDark ? 'bg-[#0d1117]' : 'bg-gray-50/50'}`}>
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-10">
                        <h3 className={`text-4xl font-bold font-outfit ${isDark ? 'text-white' : 'text-gray-900'}`}>Featured <span className="text-purple-500">Projects</span></h3>
                        <p className={`mt-4 max-w-2xl mx-auto ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Here are some of my recent projects. Each project was carefully crafted with attention to detail.</p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10 mt-20">
                        {projects.length > 0 ? projects.map((project, i) => (
                            <div key={i} className={`rounded-3xl border overflow-hidden hover:transform hover:-translate-y-2 transition-all duration-300 ${isDark ? 'bg-slate-800/40 border-white/5 shadow-xl shadow-black/20' : 'bg-white border-gray-200 shadow-lg shadow-gray-200/50'}`}>
                                <div className={`aspect-video relative overflow-hidden ${isDark ? 'bg-slate-900' : 'bg-gray-100'}`}>
                                    {project.image ? (
                                        <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
                                    ) : (
                                        <div className={`w-full h-full flex items-center justify-center ${isDark ? 'text-slate-700' : 'text-gray-300'}`}>
                                            <Code size={48} />
                                        </div>
                                    )}
                                </div>
                                <div className="p-8">
                                    <div className="flex flex-wrap gap-2 mb-6">
                                        {project.techStack?.map((tech, j) => (
                                            <span key={j} className="text-[10px] font-bold uppercase tracking-wider text-purple-400 px-3 py-1 bg-purple-500/10 rounded-full border border-purple-500/20">
                                                {tech}
                                            </span>
                                        ))}
                                    </div>
                                    <h4 className={`text-2xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>{project.title}</h4>
                                    <p className={`text-sm mb-8 leading-relaxed line-clamp-3 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                                        {project.description}
                                    </p>
                                    <div className="flex gap-4">
                                        <a href={project.githubLink} target="_blank" rel="noopener noreferrer" className={`flex-1 flex items-center justify-center gap-2 py-2.5 border rounded-xl text-sm font-bold transition-all ${isDark ? 'bg-slate-900 border-white/5 text-gray-300 hover:bg-slate-800' : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-50'}`}>
                                            <Github size={16} /> Code
                                        </a>
                                        <a href={project.liveLink} target="_blank" rel="noopener noreferrer" className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl text-sm font-bold text-white hover:opacity-90 transition-all shadow-lg shadow-purple-600/20">
                                            <ExternalLink size={16} /> Live Demo
                                        </a>
                                    </div>
                                </div>
                            </div>
                        )) : (
                            <p className="col-span-full text-center text-gray-500 italic">No projects added yet.</p>
                        )}
                    </div>
                </div>
            </section>

            {/* Contact Section */}
            <section id="contact" className="px-8 py-32 max-w-7xl mx-auto">
                <div className="text-center mb-20">
                    <h3 className={`text-4xl font-bold font-outfit ${isDark ? 'text-white' : 'text-gray-900'}`}>Get In <span className="text-purple-500">Touch</span></h3>
                    <p className={`mt-4 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Feel free to reach out. I'm always open to discussing new opportunities.</p>
                </div>

                <div className="grid lg:grid-cols-2 gap-20">
                    <div>
                        <h4 className={`text-xl font-bold mb-10 ${isDark ? 'text-white' : 'text-gray-800'}`}>Contact Information</h4>
                        <div className="space-y-8">
                            <div className="flex gap-6">
                                <div className="w-14 h-14 rounded-2xl bg-purple-600/10 flex items-center justify-center text-purple-400 border border-purple-500/20">
                                    <Mail size={24} />
                                </div>
                                <div>
                                    <p className={`text-sm mb-1 ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>Email</p>
                                    <p className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>{socialLinks.email || 'your.email@example.com'}</p>
                                </div>
                            </div>
                            <div className="flex gap-6">
                                <div className="w-14 h-14 rounded-2xl bg-blue-600/10 flex items-center justify-center text-blue-400 border border-blue-500/20">
                                    <Phone size={24} />
                                </div>
                                <div>
                                    <p className={`text-sm mb-1 ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>Phone</p>
                                    <p className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>{profile.phone || '+91 9989525560'}</p>
                                </div>
                            </div>
                            <div className="flex gap-6">
                                <div className="w-14 h-14 rounded-2xl bg-green-600/10 flex items-center justify-center text-green-400 border border-green-500/20">
                                    <MapPin size={24} />
                                </div>
                                <div>
                                    <p className={`text-sm mb-1 ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>Location</p>
                                    <p className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>{profile.location || 'Your City, Country'}</p>
                                </div>
                            </div>
                        </div>

                        <div className="mt-16">
                            <h4 className={`text-xl font-bold mb-8 ${isDark ? 'text-white' : 'text-gray-800'}`}>Connect With Me</h4>
                            <div className="flex gap-4">
                                {socialLinks.linkedin && (
                                    <a
                                        href={socialLinks.linkedin.startsWith('http') ? socialLinks.linkedin : `https://linkedin.com/in/${socialLinks.linkedin}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="w-12 h-12 rounded-xl bg-blue-600 flex items-center justify-center text-white hover:opacity-90 transition-all"
                                    >
                                        <Linkedin size={20} />
                                    </a>
                                )}
                                {socialLinks.twitter && (
                                    <a
                                        href={socialLinks.twitter.startsWith('http') ? socialLinks.twitter : `https://twitter.com/${socialLinks.twitter}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="w-12 h-12 rounded-xl bg-slate-800 flex items-center justify-center text-white hover:opacity-90 transition-all"
                                    >
                                        <Twitter size={20} />
                                    </a>
                                )}
                                {socialLinks.instagram && (
                                    <a
                                        href={socialLinks.instagram.startsWith('http') ? socialLinks.instagram : `https://instagram.com/${socialLinks.instagram}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="w-12 h-12 rounded-xl bg-gradient-to-tr from-yellow-500 via-red-500 to-purple-500 flex items-center justify-center text-white hover:opacity-90 transition-all"
                                    >
                                        <Instagram size={20} />
                                    </a>
                                )}
                                {socialLinks.github && (
                                    <a
                                        href={socialLinks.github.startsWith('http') ? socialLinks.github : `https://github.com/${socialLinks.github}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="w-12 h-12 rounded-xl bg-slate-800 flex items-center justify-center text-white hover:opacity-90 transition-all"
                                    >
                                        <Github size={20} />
                                    </a>
                                )}
                                {socialLinks.website && (
                                    <a
                                        href={socialLinks.website.startsWith('http') ? socialLinks.website : `https://${socialLinks.website}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="w-12 h-12 rounded-xl bg-purple-600 flex items-center justify-center text-white hover:opacity-90 transition-all"
                                    >
                                        <Globe size={20} />
                                    </a>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className={`p-10 rounded-[32px] border transition-all ${isDark ? 'bg-slate-800/40 border-white/5' : 'bg-white border-gray-100 shadow-xl shadow-gray-200/50'}`}>
                        <h4 className={`text-2xl font-bold mb-8 ${isDark ? 'text-white' : 'text-gray-800'}`}>Send a Message</h4>
                        <form className="space-y-6">
                            <div>
                                <label className={`block text-xs font-bold uppercase mb-3 ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>Your Name</label>
                                <input type="text" className={isDark ? 'dark-input' : 'light-input'} placeholder="John Doe..." />
                            </div>
                            <div>
                                <label className={`block text-xs font-bold uppercase mb-3 ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>Your Email</label>
                                <input type="email" className={isDark ? 'dark-input' : 'light-input'} placeholder="john@gmail.com" />
                            </div>
                            <div>
                                <label className={`block text-xs font-bold uppercase mb-3 ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>Your Message</label>
                                <textarea className={`${isDark ? 'dark-input' : 'light-input'} min-h-[150px]`} placeholder="Hello, I'd like to talk about..."></textarea>
                            </div>
                            <button className="w-full py-4 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl text-white font-bold hover:opacity-90 transition-all shadow-lg shadow-purple-600/20">
                                Send Message
                            </button>
                        </form>
                    </div>
                </div>
            </section>

            <footer className={`py-12 border-t text-center text-sm ${isDark ? 'border-white/5 text-gray-500' : 'border-gray-100 text-gray-400'}`}>
                <p>&copy; 2026 FolioBuild. All rights reserved.</p>
            </footer>
        </div>
    );
};

export default PortfolioPreview;
