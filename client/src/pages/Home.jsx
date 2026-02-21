import Navbar from '../components/Navbar';
import { Link } from 'react-router-dom';
import { Rocket, Shield, Globe, Zap, ArrowRight } from 'lucide-react';

const Home = () => {
    return (
        <div className="min-h-screen bg-white">
            <Navbar />

            {/* Hero Section */}
            <section className="relative pt-20 pb-32 overflow-hidden">
                <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-[600px] h-[600px] bg-primary-50 rounded-full blur-3xl opacity-50"></div>
                <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/2 w-[400px] h-[400px] bg-primary-100 rounded-full blur-3xl opacity-30"></div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
                    <div className="text-center max-w-3xl mx-auto">
                        <h1 className="text-5xl md:text-6xl lg:text-7xl font-outfit font-bold text-gray-910 mb-8 leading-[1.15]">
                            Build Your Professional <br />
                            <span className="bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent">
                                Portfolio in Minutes
                            </span>
                        </h1>
                        <p className="text-xl text-gray-600 mb-10 leading-relaxed">
                            Designed for students and job seekers. Showcase your skills, projects, and bio with a stunning, shareable website. No coding required.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link to="/login" className="btn-primary text-lg px-10 py-4 flex items-center justify-center gap-2">
                                Start Building Free <ArrowRight size={20} />
                            </Link>
                            <a href="#features" className="btn-secondary text-lg px-10 py-4">
                                Explore Features
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features */}
            <section id="features" className="py-24 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid md:grid-cols-3 gap-8">
                        <FeatureCard
                            icon={<Rocket className="text-primary-600" size={32} />}
                            title="Fast & Simple"
                            description="Fill in your details and see your portfolio come to life instantly with our real-time editor."
                        />
                        <FeatureCard
                            icon={<Globe className="text-primary-600" size={32} />}
                            title="Shareable Link"
                            description="Get a unique URL you can put on your resume, LinkedIn, or send directly to recruiters."
                        />
                        <FeatureCard
                            icon={<Shield className="text-primary-600" size={32} />}
                            title="Modern Design"
                            description="Professionally crafted templates that look great on any device, from mobile to desktop."
                        />
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="py-12 border-t border-gray-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-gray-500">
                    <p>&copy; 2026 FolioBuild. Built with passion for students.</p>
                </div>
            </footer>
        </div>
    );
};

const FeatureCard = ({ icon, title, description }) => (
    <div className="card text-left">
        <div className="w-16 h-16 bg-primary-50 rounded-2xl flex items-center justify-center mb-6">
            {icon}
        </div>
        <h3 className="text-xl font-bold mb-3">{title}</h3>
        <p className="text-gray-600 leading-relaxed">{description}</p>
    </div>
);

export default Home;
