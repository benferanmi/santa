import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Mail,
    Phone,
    MapPin,
    Clock,
    Send,
    Star,
    Gift,
    MessageCircle,
    Users,
    Sparkles
} from 'lucide-react';
import AppLayout from '../ui/AppLayout';

const ContactUsPage = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: '',
        wishType: 'general'
    });
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [hoveredCard, setHoveredCard] = useState(null);

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsSubmitted(true);
        setTimeout(() => setIsSubmitted(false), 3000);
    };

    const contactMethods = [
        {
            id: 'email',
            icon: Mail,
            title: 'Send a Letter to Santa',
            description: 'Drop us an email and we\'ll get back to you faster than Rudolph!',
            contact: 'hello@northpole.com',
            action: 'Send Email',
            color: 'from-red-500 to-red-600'
        },
        {
            id: 'phone',
            icon: Phone,
            title: 'Call the North Pole',
            description: 'Ring us up! Our elves are standing by to help.',
            contact: '+1 (800) HO-HO-HO',
            action: 'Call Now',
            color: 'from-green-500 to-green-600'
        },
        {
            id: 'location',
            icon: MapPin,
            title: 'Visit Our Workshop',
            description: 'Come see where all the magic happens!',
            contact: '123 North Pole Lane, Arctic Circle',
            action: 'Get Directions',
            color: 'from-red-600 to-green-600'
        },
        {
            id: 'hours',
            icon: Clock,
            title: 'Workshop Hours',
            description: 'We\'re working around the clock for Christmas!',
            contact: '24/7 During Holiday Season',
            action: 'View Schedule',
            color: 'from-green-600 to-red-600'
        }
    ];

    const wishTypes = [
        { value: 'general', label: '🎅 General Inquiry', icon: MessageCircle },
        { value: 'gift', label: '🎁 Gift Request', icon: Gift },
        { value: 'partnership', label: '🤝 Partnership', icon: Users },
        { value: 'feedback', label: '⭐ Feedback', icon: Star }
    ];

    const floatingElements = Array.from({ length: 20 }, (_, i) => ({
        id: i,
        delay: Math.random() * 5,
        duration: 3 + Math.random() * 2,
        x: Math.random() * 100,
        y: Math.random() * 100
    }));

    return (
        <AppLayout className="bg-gradient-to-br from-red-50 via-white to-green-50 relative overflow-hidden">
            {/* Floating Holiday Elements */}
            {floatingElements.map((element) => (
                <motion.div
                    key={element.id}
                    className="absolute text-2xl opacity-20"
                    style={{
                        left: `${element.x}%`,
                        top: `${element.y}%`
                    }}
                    animate={{
                        y: [0, -20, 0],
                        rotate: [0, 10, -10, 0],
                        scale: [1, 1.1, 1]
                    }}
                    transition={{
                        duration: element.duration,
                        delay: element.delay,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                >
                    {['❄️', '🎄', '⭐', '🎁', '🔔', '🦌'][element.id % 6]}
                </motion.div>
            ))}

            {/* Header Section */}
            <motion.div
                className="relative bg-red-600 text-white overflow-hidden"
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
            >
                <div className="absolute inset-0 bg-black opacity-10"></div>
                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                    <div className="text-center">
                        <motion.div
                            initial={{ scale: 0, rotate: -180 }}
                            animate={{ scale: 1, rotate: 0 }}
                            transition={{ delay: 0.3, duration: 0.8, type: "spring" }}
                            className="text-8xl mb-6"
                        >
                            🎅
                        </motion.div>
                        <motion.h1
                            className="text-5xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-red-100"
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5, duration: 0.8 }}
                        >
                            Ho Ho Ho! Contact Us
                        </motion.h1>
                        <motion.p
                            className="text-xl md:text-2xl mb-8 text-red-100"
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.7, duration: 0.8 }}
                        >
                            Send your wishes to the North Pole! We're here to make your dreams come true ✨
                        </motion.p>
                        <motion.div
                            initial={{ opacity: 0, scale: 0 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.9, duration: 0.6 }}
                            className="flex justify-center space-x-4"
                        >
                            {['🎄', '🎁', '⭐', '🔔', '🦌'].map((emoji, index) => (
                                <motion.span
                                    key={index}
                                    className="text-3xl"
                                    animate={{
                                        rotate: [0, 10, -10, 0],
                                        scale: [1, 1.2, 1]
                                    }}
                                    transition={{
                                        duration: 2,
                                        delay: index * 0.2,
                                        repeat: Infinity,
                                        ease: "easeInOut"
                                    }}
                                >
                                    {emoji}
                                </motion.span>
                            ))}
                        </motion.div>
                    </div>
                </div>
            </motion.div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="grid lg:grid-cols-2 gap-16">
                    {/* Contact Form */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3, duration: 0.8 }}
                    >
                        <div className="bg-white rounded-3xl shadow-2xl p-8 border-4 border-red-100 relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-red-500 to-green-500 rounded-full opacity-10 transform translate-x-16 -translate-y-16"></div>
                            <div className="relative">
                                <div className="text-center mb-8">
                                    <motion.div
                                        animate={{ rotate: [0, 10, -10, 0] }}
                                        transition={{ duration: 2, repeat: Infinity }}
                                        className="text-4xl mb-4"
                                    >
                                        📝
                                    </motion.div>
                                    <h2 className="text-3xl font-bold text-gray-800 mb-2">
                                        Write to Santa
                                    </h2>
                                    <p className="text-gray-600">
                                        Tell us what's on your wishlist this year!
                                    </p>
                                </div>

                                <AnimatePresence>
                                    {isSubmitted ? (
                                        <motion.div
                                            initial={{ opacity: 0, scale: 0.8 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            exit={{ opacity: 0, scale: 0.8 }}
                                            className="text-center py-12"
                                        >
                                            <motion.div
                                                animate={{ scale: [1, 1.2, 1] }}
                                                transition={{ duration: 0.6, repeat: 3 }}
                                                className="text-6xl mb-4"
                                            >
                                                🎄
                                            </motion.div>
                                            <h3 className="text-2xl font-bold text-green-600 mb-2">
                                                Message Sent to Santa!
                                            </h3>
                                            <p className="text-gray-600">
                                                Your wish has been delivered to the North Pole. Santa will get back to you soon!
                                            </p>
                                        </motion.div>
                                    ) : (
                                        <motion.form
                                            initial={{ opacity: 1 }}
                                            onSubmit={handleSubmit}
                                            className="space-y-6"
                                        >
                                            <div className="grid md:grid-cols-2 gap-6">
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                                        Your Name
                                                    </label>
                                                    <input
                                                        type="text"
                                                        name="name"
                                                        value={formData.name}
                                                        onChange={handleInputChange}
                                                        className="w-full px-4 py-3 border-2 border-red-200 rounded-xl focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all duration-200"
                                                        placeholder="Santa needs to know who's been nice!"
                                                        required
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                                        Email Address
                                                    </label>
                                                    <input
                                                        type="email"
                                                        name="email"
                                                        value={formData.email}
                                                        onChange={handleInputChange}
                                                        className="w-full px-4 py-3 border-2 border-red-200 rounded-xl focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all duration-200"
                                                        placeholder="your@email.com"
                                                        required
                                                    />
                                                </div>
                                            </div>

                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                                    Type of Wish
                                                </label>
                                                <div className="grid grid-cols-2 gap-3">
                                                    {wishTypes.map((type) => {
                                                        const Icon = type.icon;
                                                        return (
                                                            <motion.label
                                                                key={type.value}
                                                                className={`flex items-center p-3 border-2 rounded-xl cursor-pointer transition-all duration-200 ${formData.wishType === type.value
                                                                    ? 'border-green-500 bg-green-50'
                                                                    : 'border-red-200 hover:border-red-300'
                                                                    }`}
                                                                whileHover={{ scale: 1.02 }}
                                                                whileTap={{ scale: 0.98 }}
                                                            >
                                                                <input
                                                                    type="radio"
                                                                    name="wishType"
                                                                    value={type.value}
                                                                    checked={formData.wishType === type.value}
                                                                    onChange={handleInputChange}
                                                                    className="sr-only"
                                                                />
                                                                <Icon className="w-5 h-5 mr-2 text-red-600" />
                                                                <span className="text-sm font-medium text-gray-700">
                                                                    {type.label}
                                                                </span>
                                                            </motion.label>
                                                        );
                                                    })}
                                                </div>
                                            </div>

                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                                    Subject
                                                </label>
                                                <input
                                                    type="text"
                                                    name="subject"
                                                    value={formData.subject}
                                                    onChange={handleInputChange}
                                                    className="w-full px-4 py-3 border-2 border-red-200 rounded-xl focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all duration-200"
                                                    placeholder="What's this about?"
                                                    required
                                                />
                                            </div>

                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                                    Your Message to Santa
                                                </label>
                                                <textarea
                                                    name="message"
                                                    value={formData.message}
                                                    onChange={handleInputChange}
                                                    rows={6}
                                                    className="w-full px-4 py-3 border-2 border-red-200 rounded-xl focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all duration-200 resize-none"
                                                    placeholder="Dear Santa, I've been really good this year..."
                                                    required
                                                />
                                            </div>

                                            <motion.button
                                                type="submit"
                                                className="w-full bg-red-800 text-white font-bold py-4 px-8 rounded-xl transition-all duration-300 flex items-center justify-center space-x-2 text-lg shadow-lg"
                                                whileHover={{ scale: 1.02, y: -2 }}
                                                whileTap={{ scale: 0.98 }}
                                            >
                                                <Send className="w-5 h-5" />
                                                <span>Send to North Pole</span>
                                                <Sparkles className="w-5 h-5" />
                                            </motion.button>
                                        </motion.form>
                                    )}
                                </AnimatePresence>
                            </div>
                        </div>
                    </motion.div>

                    {/* Contact Information */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.5, duration: 0.8 }}
                        className="space-y-6"
                    >
                        {contactMethods.map((method, index) => {
                            const Icon = method.icon;
                            return (
                                <motion.div
                                    key={method.id}
                                    className="group"
                                    initial={{ opacity: 0, y: 30 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.7 + index * 0.1, duration: 0.6 }}
                                    onHoverStart={() => setHoveredCard(method.id)}
                                    onHoverEnd={() => setHoveredCard(null)}
                                >
                                    <motion.div
                                        className={`bg-gradient-to-r ${method.color} p-6 rounded-2xl text-white relative overflow-hidden cursor-pointer shadow-lg`}
                                        whileHover={{ scale: 1.03, y: -5 }}
                                        transition={{ duration: 0.2 }}
                                    >
                                        <div className="absolute inset-0 bg-black opacity-10"></div>
                                        <div className="absolute top-0 right-0 w-24 h-24 bg-white opacity-10 rounded-full transform translate-x-8 -translate-y-8"></div>

                                        <div className="relative flex items-start space-x-4">
                                            <motion.div
                                                animate={hoveredCard === method.id ? { rotate: [0, -10, 10, 0] } : {}}
                                                transition={{ duration: 0.6 }}
                                                className="bg-white fill-black bg-opacity-20 p-3 rounded-xl"
                                            >
                                                <Icon className="w-8 h-8 stroke-black" />
                                            </motion.div>

                                            <div className="flex-1">
                                                <h3 className="text-xl font-bold mb-2">{method.title}</h3>
                                                <p className="text-white text-opacity-90 mb-3">{method.description}</p>
                                                <p className="font-semibold text-lg mb-4">{method.contact}</p>

                                                <motion.div
                                                    className="inline-flex items-center bg-white text-black bg-opacity-20 px-4 py-2 rounded-lg font-medium hover:bg-opacity-30 transition-all duration-200"
                                                    whileHover={{ scale: 1.05 }}
                                                    whileTap={{ scale: 0.95 }}
                                                >
                                                    {method.action}
                                                    <motion.div
                                                        animate={hoveredCard === method.id ? { x: 5 } : { x: 0 }}
                                                        transition={{ duration: 0.2 }}
                                                    >
                                                        ✨
                                                    </motion.div>
                                                </motion.div>
                                            </div>
                                        </div>
                                    </motion.div>
                                </motion.div>
                            );
                        })}

                        {/* Fun Stats */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 1.1, duration: 0.6 }}
                            className="bg-white rounded-2xl shadow-xl p-6 border-4 border-green-100"
                        >
                            <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">
                                North Pole Statistics 🎯
                            </h3>
                            <div className="grid grid-cols-2 gap-4">
                                {[
                                    { label: 'Wishes Granted', value: '1,000,000+', icon: '⭐' },
                                    { label: 'Happy Customers', value: '999,999', icon: '😊' },
                                    { label: 'Cookies Eaten', value: '∞', icon: '🍪' },
                                    { label: 'Ho Ho Ho\'s', value: '24/7', icon: '🎅' }
                                ].map((stat, index) => (
                                    <motion.div
                                        key={index}
                                        className="text-center p-4 bg-gradient-to-br from-red-50 to-green-50 rounded-xl"
                                        whileHover={{ scale: 1.05 }}
                                        transition={{ duration: 0.2 }}
                                    >
                                        <div className="text-2xl mb-2">{stat.icon}</div>
                                        <div className="text-2xl font-bold text-red-600">{stat.value}</div>
                                        <div className="text-sm text-gray-600">{stat.label}</div>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>
                    </motion.div>
                </div>
            </div>

            {/* Bottom CTA */}
            <motion.div
                className="bg-cover bg-no-repeat bg-center bg-[url('https://res.cloudinary.com/dtcbirvxc/image/upload/v1748293561/exegm2pbzscve67pnhga.jpg')] py-16 lg:py-25 mt-16 relative"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.3, duration: 0.8 }}
            >
                <div className="absolute inset-0 bg-black opacity-10" />

                <div className="max-w-4xl mx-auto text-center px-4">
                    <motion.div
                        animate={{ scale: [1, 1.1, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="text-6xl mb-6"
                    >
                        🎄
                    </motion.div>
                    <h2 className="text-4xl font-bold text-white mb-4">
                        The Magic Never Stops!
                    </h2>
                    <p className="text-xl text-green-100 mb-8">
                        Join millions of believers who trust us to make their dreams come true every day.
                    </p>
                    <motion.div
                        className="flex justify-center space-x-4"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1.5, duration: 0.6 }}
                    >
                        {['Follow the North Star', 'Spread Holiday Cheer', 'Believe in Magic'].map((text, index) => (
                            <motion.div
                                key={index}
                                className="bg-white bg-opacity-20 px-6 py-3 rounded-full text-black font-medium"
                                whileHover={{ scale: 1.05, backgroundColor: 'rgba(255,255,255,0.3)' }}
                                transition={{ duration: 0.2 }}
                            >
                                {text}
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </motion.div>
        </AppLayout>
    );
};

export default ContactUsPage;