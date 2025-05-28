import { useState } from 'react';
import { Eye, EyeOff, Snowflake, Star } from 'lucide-react';
import AppLayout from '../ui/AppLayout';

const Registation = () => {
    const [isSignUp, setIsSignUp] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        confirmPassword: '',
        firstName: '',
        lastName: ''
    });

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    // eslint-disable-next-line no-unused-vars
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form submitted:', formData);
    };

    return (
        <AppLayout className=" bg-red-900 relative overflow-hidden">
            {/* Christmas Background Pattern */}
            <div className="absolute opacity-10">
                <div className="absolute top-10 left-10 text-white text-6xl">❄</div>
                <div className="absolute top-32 right-20 text-white text-4xl">⭐</div>
                <div className="absolute top-64 left-32 text-white text-5xl">🎄</div>
                <div className="absolute bottom-32 right-40 text-white text-6xl">❄</div>
                <div className="absolute bottom-64 left-20 text-white text-4xl">⭐</div>
                <div className="absolute top-48 right-60 text-white text-3xl">🎁</div>
                <div className="absolute bottom-48 right-10 text-white text-5xl">🎄</div>
                <div className="absolute top-20 left-1/2 text-white text-4xl">❄</div>
            </div>

            {/* Floating Snowflakes */}
            <div className="absolute inset-0 pointer-events-none">
                {[...Array(20)].map((_, i) => (
                    <div
                        key={i}
                        className="absolute text-white opacity-30 animate-pulse"
                        style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                            animationDelay: `${Math.random() * 3}s`,
                            fontSize: `${Math.random() * 20 + 10}px`
                        }}
                    >
                        ❄
                    </div>
                ))}
            </div>

            <div className="relative z-10 flex px-8 w-[90%] md:w-[80%] mx-auto py-20">
                {/* Left Side - Auth Form */}
                <div className="w-1/2 flex full1000 items-center justify-center p-8">
                    <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl p-8 w-full max-w-md border border-red-200">
                        {/* Header */}
                        <div className="text-center mb-8">
                            <div className="text-4xl mb-2">🎅</div>
                            <h1 className="text-3xl font-bold text-red-800 mb-2">
                                Welcome to Wishes
                            </h1>
                            <p className="text-red-600">
                                {isSignUp ? 'Create your magical account' : 'Sign in to your account'}
                            </p>
                        </div>

                        {/* Form */}
                        <div className="space-y-6">
                            {isSignUp && (
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-red-700 mb-2">
                                            First Name
                                        </label>
                                        <input
                                            type="text"
                                            name="firstName"
                                            value={formData.firstName}
                                            onChange={handleInputChange}
                                            className="w-full px-4 py-3 border border-red-200 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200 bg-white/90"
                                            placeholder="First name"
                                            required={isSignUp}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-red-700 mb-2">
                                            Last Name
                                        </label>
                                        <input
                                            type="text"
                                            name="lastName"
                                            value={formData.lastName}
                                            onChange={handleInputChange}
                                            className="w-full px-4 py-3 border border-red-200 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200 bg-white/90"
                                            placeholder="Last name"
                                            required={isSignUp}
                                        />
                                    </div>
                                </div>
                            )}

                            <div>
                                <label className="block text-sm font-medium text-red-700 mb-2">
                                    Email Address
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-3 border border-red-200 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200 bg-white/90"
                                    placeholder="your@email.com"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-red-700 mb-2">
                                    Password
                                </label>
                                <div className="relative">
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        name="password"
                                        value={formData.password}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-3 pr-12 border border-red-200 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200 bg-white/90"
                                        placeholder="Password"
                                        required
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-red-500 hover:text-red-700 transition-colors"
                                    >
                                        {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                    </button>
                                </div>
                            </div>

                            {isSignUp && (
                                <div>
                                    <label className="block text-sm font-medium text-red-700 mb-2">
                                        Confirm Password
                                    </label>
                                    <input
                                        type="password"
                                        name="confirmPassword"
                                        value={formData.confirmPassword}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-3 border border-red-200 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200 bg-white/90"
                                        placeholder="Confirm password"
                                        required={isSignUp}
                                    />
                                </div>
                            )}

                            {/* Submit Button */}
                            <button
                                type="submit"
                                className="w-full bg-gradient-to-r from-red-600 to-red-700 text-white py-3 px-6 rounded-lg font-semibold hover:from-red-700 hover:to-red-800 transform hover:scale-105 active:scale-95 transition-all duration-200 shadow-lg hover:shadow-xl"
                            >
                                <span className="flex items-center justify-center">
                                    {isSignUp ? 'Create Account' : 'Sign In'}
                                    <Star className="ml-2 w-4 h-4" />
                                </span>
                            </button>

                            {/* Social Login */}
                            <div className="relative">
                                <div className="absolute inset-0 flex items-center">
                                    <div className="w-full border-t border-red-200"></div>
                                </div>
                                <div className="relative flex justify-center text-sm">
                                    <span className="px-2 bg-white text-red-600">Or continue with</span>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <button
                                    type="button"
                                    className="flex items-center justify-center px-4 py-3 border border-red-200 rounded-lg hover:bg-red-50 transition-all duration-200 hover:shadow-md transform hover:scale-105"
                                >
                                    <span className="text-sm font-medium text-red-700">Google</span>
                                </button>
                                <button
                                    type="button"
                                    className="flex items-center justify-center px-4 py-3 border border-red-200 rounded-lg hover:bg-red-50 transition-all duration-200 hover:shadow-md transform hover:scale-105"
                                >
                                    <span className="text-sm font-medium text-red-700">Facebook</span>
                                </button>
                            </div>

                            {/* Toggle Auth Mode */}
                            <div className="text-center">
                                <button
                                    type="button"
                                    onClick={() => setIsSignUp(!isSignUp)}
                                    className="text-red-600 hover:text-red-800 font-medium transition-colors duration-200"
                                >
                                    {isSignUp
                                        ? "Already have an account? Sign In"
                                        : "Don't have an account? Sign Up"
                                    }
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Side - Santa Image Space */}
                <div className="none hidden1000 lg:block  w-1/2 flex items-center justify-center p-8">
                    <div className="relative h-full flex items-center justify-center">
                        {/* Placeholder for Santa Image with Eye-catching Effect */}
                        <div className=" bg-[url(https://res.cloudinary.com/dtcbirvxc/image/upload/w_1000,ar_1:1,c_fill,g_auto,e_art:hokusai/v1748293560/tsasynueb3kbdcdqw6oq.jpg)] w-full h-full bg-contain bg-no-repeat bg-white/20 backdrop-blur-sm rounded-sm border-4 border-white/30 flex items-center justify-center shadow-2xl min-w-[300px]">
                        </div>

                        {/* Glowing Ring Effect */}
                        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-yellow-400 via-red-500 to-green-500 opacity-30 blur-xl animate-pulse"></div>

                        {/* Floating Elements */}
                        <div className="absolute -top-10 -left-10 text-yellow-300 text-4xl animate-spin">⭐</div>
                        <div className="absolute -top-5 -right-10 text-white text-3xl animate-bounce">❄</div>
                        <div className="absolute -bottom-10 -left-5 text-green-400 text-4xl animate-pulse">🎄</div>
                        <div className="absolute -bottom-5 -right-5 text-red-400 text-3xl animate-bounce">🎁</div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
};

export default Registation;