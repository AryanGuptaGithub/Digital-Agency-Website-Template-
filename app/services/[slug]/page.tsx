"use client";

import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import {
  Zap,
  Shield,
  Cloud,
  Smartphone,
  Globe,
  Database,
} from "lucide-react";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.05 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const SERVICES_DATA: any = {
  cloud: {
    title: "Cloud Support Services",
    tagline: "Scalable, Secure & Always On",
    description:
      "We provide end-to-end cloud support services to help your business migrate, manage, and optimize its infrastructure with maximum efficiency and security.",
    features: [
      {
        title: "Cloud Migration",
        desc: "Zero downtime transitions with full data integrity",
        icon: <Cloud />,
        color: "from-blue-500/20 to-cyan-500/20",
      },
      {
        title: "24/7 Monitoring",
        desc: "Always-on monitoring and proactive issue resolution",
        icon: <Zap />,
        color: "from-yellow-500/20 to-orange-500/20",
      },
      {
        title: "Security & IAM",
        desc: "Enterprise-grade protection and access control",
        icon: <Shield />,
        color: "from-gray-500/20 to-slate-500/20",
      },
      {
        title: "Disaster Recovery",
        desc: "Backup strategies that ensure business continuity",
        icon: <Database />,
        color: "from-green-500/20 to-emerald-500/20",
      },
    ],
    benefits: [
      "Reduce infrastructure costs",
      "Ensure business continuity",
      "Scale instantly as you grow",
    ],
  },

  mobile: {
    title: "Mobile App Development",
    tagline: "iOS & Android",
    description:
      "We design and develop high-performance mobile apps that deliver seamless user experiences and real business impact.",
    features: [
      {
        title: "Native Apps",
        desc: "Optimized apps built for performance and reliability",
        icon: <Smartphone />,
        color: "from-purple-500/20 to-pink-500/20",
      },
      {
        title: "Cross Platform",
        desc: "Single codebase apps using modern frameworks",
        icon: <Globe />,
        color: "from-indigo-500/20 to-blue-500/20",
      },
      {
        title: "UI/UX Design",
        desc: "User-focused design that drives engagement",
        icon: <Zap />,
        color: "from-yellow-500/20 to-orange-500/20",
      },
    ],
    benefits: [
      "Reach millions of users",
      "Boost engagement and retention",
      "Increase mobile-driven revenue",
    ],
  },

  web: {
    title: "Web Application Development",
    tagline: "Scalable & Secure",
    description:
      "We build modern, scalable web applications tailored to your workflows and business goals.",
    features: [
      {
        title: "Custom Applications",
        desc: "Built specifically for your business processes",
        icon: <Globe />,
        color: "from-blue-500/20 to-cyan-500/20",
      },
      {
        title: "API Integrations",
        desc: "Seamless integration with third-party systems",
        icon: <Database />,
        color: "from-green-500/20 to-emerald-500/20",
      },
      {
        title: "Cloud Deployment",
        desc: "Reliable hosting with high scalability",
        icon: <Cloud />,
        color: "from-purple-500/20 to-pink-500/20",
      },
    ],
    benefits: [
      "Automate workflows",
      "Scale effortlessly",
      "Deliver global user experiences",
    ],
  },

  crm: {
    title: "CRM Development",
    tagline: "Customer Intelligence",
    description:
      "We build custom CRM systems that give you full visibility and control over customer relationships.",
    features: [
      {
        title: "Lead Tracking",
        desc: "Track and manage leads efficiently",
        icon: <Zap />,
        color: "from-yellow-500/20 to-orange-500/20",
      },
      {
        title: "Automation",
        desc: "Automate repetitive workflows",
        icon: <Database />,
        color: "from-indigo-500/20 to-blue-500/20",
      },
      {
        title: "Analytics",
        desc: "Real-time insights for better decisions",
        icon: <Shield />,
        color: "from-gray-500/20 to-slate-500/20",
      },
    ],
    benefits: [
      "Increase conversions",
      "Improve customer retention",
      "Make data-driven decisions",
    ],
  },

  design: {
    title: "Responsive Design",
    tagline: "Every Device Perfect",
    description:
      "We create responsive, high-performance designs that work seamlessly across all devices.",
    features: [
      {
        title: "Mobile First",
        desc: "Designed for modern mobile users",
        icon: <Smartphone />,
        color: "from-teal-500/20 to-cyan-500/20",
      },
      {
        title: "Performance",
        desc: "Fast-loading, optimized experiences",
        icon: <Zap />,
        color: "from-yellow-500/20 to-orange-500/20",
      },
      {
        title: "SEO Ready",
        desc: "Built to rank higher on search engines",
        icon: <Globe />,
        color: "from-blue-500/20 to-cyan-500/20",
      },
    ],
    benefits: [
      "Improve SEO rankings",
      "Lower bounce rate",
      "Deliver consistent UX",
    ],
  },
};

export default function ServicePage() {
  const params = useParams();
  const service = SERVICES_DATA[params.slug as string];

  if (!service) return <div className="text-white p-20">Not found</div>;

  return (
    <div className="bg-black text-white min-h-screen py-24 px-6 md:px-12">

      {/* HERO */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mb-20"
      >
        <span className="text-[11px] tracking-[0.5em] text-white/40 uppercase">
          Service
        </span>
        <h1 className="text-5xl md:text-6xl font-bold mt-4">
          {service.title}
        </h1>
        <p className="text-white/50 mt-4 text-lg">{service.tagline}</p>
        <p className="text-white/70 mt-6">{service.description}</p>
      </motion.div>

      {/* DEEP DESCRIPTION */}
      <div className="max-w-5xl text-white/70 text-lg leading-relaxed">
        <p>
          At ZAP, we go beyond execution — we build scalable digital ecosystems
          designed to evolve with your business.
        </p>
        <p className="mt-6">
          Every solution we create is rooted in performance, security, and long-term growth.
        </p>
      </div>

      {/* FEATURES */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-20"
      >
        {service.features.map((f: any, i: number) => (
          <motion.div
            key={i}
            variants={itemVariants}
            whileHover={{ scale: 1.03, y: -4 }}
            className="group relative"
          >
            <div className={`absolute inset-0 bg-gradient-to-br ${f.color} rounded-2xl opacity-0 group-hover:opacity-100 blur-xl`} />
            <div className="relative p-6 rounded-2xl border border-white/[0.06] bg-white/[0.02]">
              <div className="w-12 h-12 flex items-center justify-center mb-4 border border-white/10 rounded-xl">
                {f.icon}
              </div>
              <h3 className="text-lg font-semibold">{f.title}</h3>
              <p className="text-sm text-white/40 mt-2">{f.desc}</p>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* PROCESS */}
<div className="mt-32">
  <h2 className="text-3xl mb-12 text-center">Our Approach</h2>

  <motion.div
    variants={containerVariants}
    initial="hidden"
    whileInView="visible"
    className="grid md:grid-cols-3 gap-6"
  >
    {[
      {
        title: "Discovery",
        desc: "We deeply understand your business, users, and goals.",
        color: "from-blue-500/20 to-cyan-500/20",
      },
      {
        title: "Build",
        desc: "We design and develop high-performance solutions.",
        color: "from-purple-500/20 to-pink-500/20",
      },
      {
        title: "Scale",
        desc: "We optimize and scale as your business grows.",
        color: "from-green-500/20 to-emerald-500/20",
      },
    ].map((step, i) => (
      <motion.div
        key={i}
        variants={itemVariants}
        whileHover={{ scale: 1.03, y: -6 }}
        className="group relative"
      >
        <div className={`absolute inset-0 bg-gradient-to-br ${step.color} rounded-2xl opacity-0 group-hover:opacity-100 blur-xl`} />
        <div className="relative p-6 border border-white/10 rounded-2xl bg-white/[0.02] backdrop-blur-sm">
          <h3 className="text-xl text-white mb-2">{step.title}</h3>
          <p className="text-white/50 text-sm">{step.desc}</p>
        </div>
      </motion.div>
    ))}
  </motion.div>
</div>

    {/* WHY US */}
<div className="mt-32 text-center">
  <h2 className="text-3xl mb-12">Why Choose ZAP</h2>

  <motion.div
    variants={containerVariants}
    initial="hidden"
    whileInView="visible"
    className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto"
  >
    {[
      "25+ Years Industry Experience",
      "End-to-End Ownership",
      "Modern Tech Stack Expertise",
      "Performance-First Development",
      "Scalable Architecture Design",
      "Dedicated Long-Term Support",
    ].map((item, i) => (
      <motion.div
        key={i}
        variants={itemVariants}
        whileHover={{ scale: 1.05 }}
        className="p-5 rounded-xl border border-white/10 bg-white/[0.02] text-white/70 hover:text-white transition backdrop-blur-sm"
      >
        {item}
      </motion.div>
    ))}
  </motion.div>
</div>

    {/* TECH STACK */}
<div className="mt-32 text-center">
  <h2 className="text-3xl mb-6">Technologies We Use</h2>

  <motion.div
    initial="hidden"
    whileInView="visible"
    variants={containerVariants}
    className="flex flex-wrap justify-center gap-8 mt-12"
  >
    {[
      { name: "Figma", src: "https://static.vecteezy.com/system/resources/previews/065/386/863/non_2x/figma-logo-square-outline-icon-figma-app-editable-transparent-background-premium-social-media-design-for-digital-download-free-png.png" },
      { name: "React", src: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/960px-React-icon.svg.png?_=20220125121207" },
      { name: "Next.js", src: "https://images-cdn.openxcell.com/wp-content/uploads/2024/07/24154156/dango-inner-2.webp" },
      { name: "Tailwind", src: "https://static.vecteezy.com/system/resources/previews/067/565/433/non_2x/tailwind-css-logo-rounded-free-png.png" },
      { name: "ExpressJs", src: "https://ajeetchaulagain.com/static/7cb4af597964b0911fe71cb2f8148d64/87351/express-js.png" },
      { name: "Redis", src: "https://cdn.clever-cloud.com/uploads/2023/08/redis-color.png" },
      { name: "Node.js", src: "https://www.freepnglogos.com/uploads/javascript-png/javascript-nodejs-logo-27.png" },
      { name: "AWS", src: "https://1000logos.net/wp-content/uploads/2025/03/Amazon-Web-Services-Emblem.png" },
      { name: "MongoDB", src: "https://upload.wikimedia.org/wikipedia/commons/0/00/Mongodb.png" },
      { name: "Supabase", src: "https://monkedo-static.s3.eu-central-1.amazonaws.com/component-icons/supabase.png" },
      { name: "Docker", src: "https://1000logos.net/wp-content/uploads/2021/11/Docker-Logo.png" },
      { name: "Java", src: "https://static.vecteezy.com/system/resources/thumbnails/048/332/150/small_2x/java-programming-language-java-logo-free-png.png" },
      { name: "SpringBoot", src: "https://alex-bezverkhniy.github.io/images/spring-boot/spring-boot-logo.png" },
      { name: "SQL Workbench", src: "https://images.icon-icons.com/1381/PNG/512/mysqlworkbench_93532.png" },
    ].map((tech, i) => (
      <motion.div
        key={i}
        variants={itemVariants}
        whileHover={{ scale: 1.1, y: -6 }}
        className="group flex flex-col items-center gap-3"
      >
        <div className="relative">
          <div className="absolute inset-0 bg-white/10 blur-xl opacity-0 group-hover:opacity-100 transition" />
          <img
            src={tech.src}
            alt={tech.name}
            className="h-12 w-auto relative z-10"
          />
        </div>
        <span className="text-sm text-white/50 group-hover:text-white transition">
          {tech.name}
        </span>
      </motion.div>
    ))}
  </motion.div>
</div>

      {/* CTA */}
      <div className="mt-32 text-center">
        <h3 className="text-3xl mb-6">
          Let’s build something powerful together
        </h3>
        <button className="px-8 py-3 border border-white/20 rounded-full hover:bg-white hover:text-black transition">
          Contact Us
        </button>
      </div>
    </div>
  );
}