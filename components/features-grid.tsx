"use client";

import { motion } from "framer-motion";
import {
  BarChart3,
  Users,
  LayoutDashboard,
  Zap,
  MessageCircle,
  Wifi,
  Bot,
  Puzzle,
  Shield,
  Eye,
} from "lucide-react";

interface Feature {
  icon: React.ReactNode;
  title: string;
  description: string;
  color: string;
}

const features: Feature[] = [
  {
    icon: <Eye className="w-6 h-6" />,
    title: "Overview",
    description: "Complete visibility into your digital ecosystem.",
    color: "from-blue-500/20 to-cyan-500/20",
  },
  {
    icon: <Users className="w-6 h-6" />,
    title: "Teamwork",
    description: "Collaborative tools that unite your team.",
    color: "from-purple-500/20 to-pink-500/20",
  },
  {
    icon: <BarChart3 className="w-6 h-6" />,
    title: "Analytics",
    description: "Track user behavior and make data-driven decisions.",
    color: "from-green-500/20 to-emerald-500/20",
  },
  {
    icon: <LayoutDashboard className="w-6 h-6" />,
    title: "Dashboard",
    description: "Centralized data view for instant insights.",
    color: "from-orange-500/20 to-amber-500/20",
  },
  {
    icon: <Zap className="w-6 h-6" />,
    title: "Efficiency",
    description: "Optimized workflows that save time and resources.",
    color: "from-yellow-500/20 to-orange-500/20",
  },
  {
    icon: <MessageCircle className="w-6 h-6" />,
    title: "Collaboration",
    description: "Work together seamlessly across teams.",
    color: "from-indigo-500/20 to-blue-500/20",
  },
  {
    icon: <Wifi className="w-6 h-6" />,
    title: "Connectivity",
    description: "Seamless integration with your existing stack.",
    color: "from-teal-500/20 to-cyan-500/20",
  },
  {
    icon: <Bot className="w-6 h-6" />,
    title: "Automation",
    description: "Streamline workflows with intelligent automation.",
    color: "from-red-500/20 to-rose-500/20",
  },
  {
    icon: <Puzzle className="w-6 h-6" />,
    title: "Integration",
    description: "Connect your favorite tools effortlessly.",
    color: "from-sky-500/20 to-blue-500/20",
  },
  {
    icon: <Shield className="w-6 h-6" />,
    title: "Security",
    description: "Enterprise-grade protection for peace of mind.",
    color: "from-gray-500/20 to-slate-500/20",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

export default function FeaturesGrid() {
  return (
    <section className="relative py-24 bg-black overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(30,64,175,0.08),transparent_70%)]" />
      
      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-[11px] font-semibold uppercase tracking-[0.5em] text-white/40">
            Our Capabilities
          </span>
          <h2 className="mt-4 text-4xl md:text-5xl lg:text-6xl font-bold text-white">
            Everything You Need to{" "}
            <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              Scale
            </span>
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-white/50 text-lg">
            From strategy to execution, we provide end-to-end solutions that drive results.
          </p>
        </motion.div>

        {/* Features grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ scale: 1.02, y: -4 }}
              className="group relative"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl`} />
              <div className="relative h-full p-6 rounded-2xl border border-white/[0.06] bg-white/[0.02] backdrop-blur-sm hover:border-white/[0.12] transition-all duration-300">
                <div className="w-12 h-12 rounded-xl bg-white/[0.03] border border-white/[0.06] flex items-center justify-center mb-4 text-white/80 group-hover:text-white transition-colors">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm text-white/40 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}