import React, { useState } from "react";
import { Eye, EyeOff, LogIn, Mail, ArrowLeft } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const formVariants = {
    hidden: { opacity: 0, x: 40 },
    visible: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -40 },
};

const Login = () => {
    const [rememberMe, setRememberMe] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [forgot, setForgot] = useState(false);

    const handleLogin = (e) => {
        e.preventDefault();
        setError("");

        if (!email || !password) {
            setError("Please fill in all fields");
            return;
        }

        setLoading(true);
        setTimeout(() => setLoading(false), 1500);
    };

    const handleForgot = (e) => {
        e.preventDefault();
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            alert("Password reset link sent to email");
        }, 1500);
    };

    return (
        <div className="relative min-h-screen bg-[#070b18] flex items-center justify-center px-4 overflow-hidden">

            {/* Background glow */}
            <div className="absolute -top-32 -left-32 w-96 h-96 bg-blue-600/30 rounded-full blur-3xl" />
            <div className="absolute bottom-0 -right-32 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl" />

            {/* Glass Card */}
            <motion.div
                initial={{ opacity: 0, y: 50, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.8 }}
                className="relative z-10 w-full max-w-md sm:max-w-lg
        bg-white/10 backdrop-blur-2xl border border-white/20
        rounded-2xl p-6 sm:p-8
        shadow-[0_0_50px_rgba(59,130,246,0.35)]"
            >

                {/* Header */}
                <div className="text-center mb-8">
                    <div className="mx-auto w-16 h-16 rounded-full bg-blue-500/20
          flex items-center justify-center
          shadow-[0_0_30px_rgba(59,130,246,0.8)]">
                        {forgot ? (
                            <Mail className="text-blue-400 w-7 h-7" />
                        ) : (
                            <LogIn className="text-blue-400 w-7 h-7" />
                        )}
                    </div>
                    <h1 className="text-2xl sm:text-3xl font-bold text-white mt-4">
                        {forgot ? "Forgot Password" : "Secure Login"}
                    </h1>
                    <p className="text-gray-400 text-sm mt-2">
                        {forgot
                            ? "We’ll send a reset link to your email"
                            : "Access your admin dashboard"}
                    </p>
                </div>

                {/* Forms */}
                <AnimatePresence mode="wait">
                    {!forgot ? (
                        /* 🔐 LOGIN FORM */
                        <motion.form
                            key="login"
                            variants={formVariants}
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                            onSubmit={handleLogin}
                            className="space-y-6"
                        >
                            <div>
                                <label className="text-sm text-gray-300 block mb-1">Email</label>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full px-4 py-3 rounded-lg bg-black/40
                  text-white border border-white/20 outline-none
                  focus:ring-2 focus:ring-blue-500/40"
                                />
                            </div>

                            <div>
                                <label className="text-sm text-gray-300 block mb-1">Password</label>
                                <div className="relative">
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="w-full px-4 py-3 rounded-lg bg-black/40
                    text-white border border-white/20 outline-none
                    focus:ring-2 focus:ring-blue-500/40"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="cursor-pointer absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                                    >
                                        {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                    </button>
                                </div>
                            </div>

                            {error && (
                                <div className="text-sm text-red-400 bg-red-500/10 p-3 rounded-lg">
                                    {error}
                                </div>
                            )}

                            <div className="flex justify-between text-sm">
                                <label className="flex items-center gap-2 text-gray-300 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={rememberMe}
                                        onChange={() => setRememberMe(!rememberMe)}
                                        className="accent-blue-500 cursor-pointer w-4 h-4 rounded"
                                    />
                                    Remember me
                                </label>
                                <button
                                    type="button"
                                    onClick={() => setForgot(true)}
                                    className="text-blue-400 cursor-pointer hover:underline"
                                >
                                    Forgot password?
                                </button>
                            </div>

                            <motion.button
                                whileHover={{ scale: 1.04 }}
                                whileTap={{ scale: 0.95 }}
                                disabled={loading}
                                className="w-full cursor-pointer py-3 rounded-lg
                bg-cyan-500
                text-white font-semibold"
                            >
                                {loading ? "Authenticating..." : "Login"}
                            </motion.button>
                        </motion.form>
                    ) : (
                        /* 📧 FORGOT FORM */
                        <motion.form
                            key="forgot"
                            variants={formVariants}
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                            onSubmit={handleForgot}
                            className="space-y-6"
                        >
                            <div>
                                <label className="text-sm text-gray-300 block mb-1">
                                    Email Address
                                </label>
                                <input
                                    type="email"
                                    className="w-full px-4 py-3 rounded-lg bg-black/40
                  text-white border border-white/20 outline-none
                  focus:ring-2 focus:ring-blue-500/40"
                                />
                            </div>

                            <motion.button
                                whileHover={{ scale: 1.04 }}
                                whileTap={{ scale: 0.95 }}
                                disabled={loading}
                                className="w-full cursor-pointer py-3 rounded-lg
                bg-cyan-500
                text-white font-semibold"
                            >
                                {loading ? "Sending..." : "Send Reset Link"}
                            </motion.button>

                            <button
                                type="button"
                                onClick={() => setForgot(false)}
                                className="cursor-pointer flex items-center gap-2 text-sm text-gray-400 hover:text-white mx-auto"
                            >
                                <ArrowLeft size={16} />
                                Back to login
                            </button>
                        </motion.form>
                    )}
                </AnimatePresence>

                <p className="text-xs text-gray-500 text-center mt-6">
                    © 2026 Secure Admin
                </p>
            </motion.div>
        </div>
    );
};

export default Login;
