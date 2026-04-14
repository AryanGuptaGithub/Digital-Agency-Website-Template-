// lib/logos.tsx
import {
  SiReact,
  SiNextdotjs,
  SiTypescript,
  SiTailwindcss,
  SiFramer,
  SiThreedotjs,
  SiNodedotjs,
  SiExpress,
  SiMongodb,
  SiPostgresql,
  SiMysql,
  SiPrisma,
  SiGraphql,
  SiDocker,
  SiCloudflare, // ✅ Reliable alternative to AWS
  SiVercel,
  SiVite,
  SiWebpack,
  SiRedux,
  SiJest,
  SiGit,
} from "react-icons/si";
import { TbBrandReactNative } from "react-icons/tb";

export const techLogos = [
  // Frontend
  { node: <SiReact className="text-[#61DAFB]" />, title: "React", href: "https://react.dev" },
  { node: <SiNextdotjs className="text-white" />, title: "Next.js", href: "https://nextjs.org" },
  { node: <SiTypescript className="text-[#3178C6]" />, title: "TypeScript", href: "https://www.typescriptlang.org" },
  { node: <SiTailwindcss className="text-[#06B6D4]" />, title: "Tailwind CSS", href: "https://tailwindcss.com" },
  { node: <SiFramer className="text-white" />, title: "Framer Motion", href: "https://www.framer.com/motion/" },
  { node: <SiRedux className="text-[#764ABC]" />, title: "Redux", href: "https://redux.js.org" },
  { node: <TbBrandReactNative className="text-[#61DAFB] text-[length:inherit]" />, title: "React Native", href: "https://reactnative.dev" },
  
  // Backend & Database
  { node: <SiNodedotjs className="text-[#339933]" />, title: "Node.js", href: "https://nodejs.org" },
  { node: <SiExpress className="text-white" />, title: "Express", href: "https://expressjs.com" },
  { node: <SiMongodb className="text-[#47A248]" />, title: "MongoDB", href: "https://mongodb.com" },
  { node: <SiPostgresql className="text-[#4169E1]" />, title: "PostgreSQL", href: "https://postgresql.org" },
  { node: <SiMysql className="text-[#4479A1]" />, title: "MySQL", href: "https://mysql.com" },
  { node: <SiPrisma className="text-white" />, title: "Prisma", href: "https://prisma.io" },
  { node: <SiGraphql className="text-[#E10098]" />, title: "GraphQL", href: "https://graphql.org" },
  
  // DevOps & Tools
  { node: <SiDocker className="text-[#2496ED]" />, title: "Docker", href: "https://docker.com" },
  { node: <SiCloudflare className="text-[#F38020]" />, title: "Cloudflare", href: "https://cloudflare.com" }, // ✅ Stable AWS alternative
  { node: <SiVercel className="text-white" />, title: "Vercel", href: "https://vercel.com" },
  { node: <SiGit className="text-[#F05032]" />, title: "Git", href: "https://git-scm.com" },
  { node: <SiJest className="text-[#C21325]" />, title: "Jest", href: "https://jestjs.io" },
  { node: <SiVite className="text-[#646CFF]" />, title: "Vite", href: "https://vitejs.dev" },
  { node: <SiWebpack className="text-[#8DD6F9]" />, title: "Webpack", href: "https://webpack.js.org" },
  { node: <SiThreedotjs className="text-white" />, title: "Three.js", href: "https://threejs.org" },
];