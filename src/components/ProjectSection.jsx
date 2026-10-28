// src/components/ProjectSection.jsx
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from "framer-motion";
import {
  FaExternalLinkAlt, FaReact, FaNodeJs, FaHtml5, FaCss3Alt,
  FaJsSquare, FaGithub, FaTimes, FaDownload, FaStar
} from 'react-icons/fa';
import {
  SiTailwindcss, SiNextdotjs, SiVercel, SiMongodb,
  SiExpress, SiPostgresql, SiTypescript, SiDocker,
  SiMysql, SiPhp, SiCodeigniter, SiLeaflet,
  SiGo, SiAstro, SiRedis, SiBootstrap, SiFlutter, SiDart, SiPostman, SiPython, SiLinux
} from 'react-icons/si';
import { PiCodeBold } from "react-icons/pi";
import { LuBadge, LuBriefcase, LuGraduationCap } from "react-icons/lu";
import { LiaLayerGroupSolid } from "react-icons/lia";
import { useNavbar } from '../contexts/NavbarContext';
import { supabase } from '../lib/supabase';

// ===================================
// DATA PROYEK GILANG RIZKY RAMADHAN
// ===================================
const dummyProjects = [
  {
    title: "TailNews",
    description: "Dynamic full-stack news portal with high-performance Go (Golang) REST API, Astro SSR frontend for SEO optimization, React.js admin dashboard, MySQL database, and Redis caching.",
    tech: ["Go (Golang)", "Astro SSR", "React.js", "Redis", "MySQL", "Tailwind CSS"],
    link: "https://github.com/gilangrizkyr/TailNews",
    image: "https://images.unsplash.com/photo-1504711434969-e33886168f5c?q=80&w=2070&auto=format&fit=crop",
    category: "Web/Apps",
    featured: true,
  },
  {
    title: "SurveiCoreSystem",
    description: "Enterprise-grade survey infrastructure platform with multi-tenant architecture, bank-level security, and real-time analytics for government & corporate data governance.",
    tech: ["PHP", "MySQL", "CodeIgniter 4", "REST API", "Tailwind CSS"],
    link: "https://github.com/gilangrizkyr/SurveiCoreSystem",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop",
    category: "Web/Apps",
    featured: true,
  },
  {
    title: "WA Gateway (wagateaway)",
    description: "API gateway WhatsApp dengan REST API berbasis token, WebSocket realtime, dan dashboard interaktif untuk menyederhanakan alur bisnis.",
    tech: ["JavaScript", "Node.js", "Express", "WebSocket", "REST API"],
    link: "https://github.com/gilangrizkyr/wagateaway",
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2064&auto=format&fit=crop",
    category: "Web/Apps",
  },
  {
    title: "gilang-storage-sdk / MyTools (NPM)",
    description: "High-fidelity client-side optimization SDK & npm packages for compressing heavy images, PDFs, videos, and office documents directly in browser without server upload.",
    tech: ["JavaScript", "TypeScript", "Node.js", "Docker"],
    link: "https://github.com/gilangrizkyr/MyTools",
    image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=2070&auto=format&fit=crop",
    category: "Tools & SDK",
  },
  {
    title: "DataInvest - DPMPTSP Kalsel",
    description: "Aplikasi pengolahan dan analisis realisasi investasi dengan visualisasi statistik interaktif yang disesuaikan untuk kebutuhan dinas penanaman modal.",
    tech: ["React.js", "Next.js", "CodeIgniter 4", "PostgreSQL"],
    link: "https://github.com/gilangrizkyr/DataInvest",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2015&auto=format&fit=crop",
    category: "Web/Apps",
  },
  {
    title: "Geotagging Tata Ruang RDTR & RTRW",
    description: "Aplikasi pemetaan spasial dan geotagging berbasis peta interaktif Leaflet untuk pengelolaan data tata ruang wilayah pemerintah.",
    tech: ["React.js", "Leaflet", "PostgreSQL", "Tailwind CSS"],
    link: "https://github.com/gilangrizkyr/GeoTagging",
    image: "https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=2074&auto=format&fit=crop",
    category: "Web/Apps",
  },
  {
    title: "Laporin - Sistem Pengaduan",
    description: "Platform terpadu untuk penanganan keluhan, pengaduan masyarakat, serta permintaan fitur internal perkantoran secara transparan.",
    tech: ["React.js", "Next.js", "MySQL", "Tailwind CSS"],
    link: "https://github.com/gilangrizkyr/Laporin",
    image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=2070&auto=format&fit=crop",
    category: "Web/Apps",
  },
  {
    title: "Quantura - AI Inventory System",
    description: "Sistem manajemen inventaris perusahaan cerdas yang terintegrasi Artificial Intelligence untuk otomatisasi pengelolaan produk dan prediksi stok.",
    tech: ["React.js", "Express", "Node.js", "Tailwind CSS"],
    link: "https://github.com/gilangrizkyr/Quantura",
    image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=2070&auto=format&fit=crop",
    category: "Web/Apps",
  },
  {
    title: "TemanNakes",
    description: "Asisten klinis mobile offline untuk tenaga kesehatan dengan katalog referensi obat lengkap dan kalkulator dosis medis presisi.",
    tech: ["Dart", "Flutter", "Mobile"],
    link: "https://github.com/gilangrizkyr/TemanNakes",
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=2070&auto=format&fit=crop",
    category: "Mobile",
  },
];

// ===================================
// DATA PENGALAMAN KERJA (EXPERIENCE)
// ===================================
const userExperiences = [
  {
    role: "Tenaga Ahli IT (Full Stack Developer)",
    company: "DPMPTSP Provinsi Kalimantan Selatan",
    period: "Nov 2025 – Sekarang",
    type: "Kontrak Kerja (On-site)",
    location: "Kalimantan Selatan",
    highlights: [
      "Membangun 5 aplikasi web dari nol untuk kebutuhan instansi: Data Investasi Realisasi, Sistem Pengaduan, Survei Perusahaan (sudah rilis), serta MPP Chat WhatsApp dan Aplikasi Geotagging RDTR/RTRW (Leaflet GIS).",
      "Memegang source code dan mengembangkan 3 aplikasi rilis: Profil Instansi, Perizinan, dan InvestmentBridge.",
      "Memigrasikan website Profil Instansi dari CodeIgniter 4 ke React.js untuk meningkatkan performa dan kemudahan maintenance.",
      "Merancang skema database PostgreSQL/MySQL, containerisasi Docker, dan mengelola server VPS Linux lewat SSH."
    ],
    skills: ["React.js", "Next.js", "TypeScript", "CodeIgniter 4", "PostgreSQL", "MySQL", "Docker", "Leaflet GIS", "Linux VPS"]
  },
  {
    role: "Freelance Full Stack Developer",
    company: "Klien Perusahaan & Klien Mandiri",
    period: "2022 – 2025",
    type: "Freelance / Remote",
    location: "Indonesia",
    highlights: [
      "Mengerjakan 10+ proyek sistem inventori dan aplikasi bisnis perusahaan secara end-to-end dari analisis kebutuhan, frontend, backend API, hingga deployment server.",
      "Memetakan alur kerja bisnis klien dan merumuskan perbaikan proses sebelum membangun solusi digital yang efisien."
    ],
    skills: ["Go (Golang)", "React.js", "Node.js", "Express", "CodeIgniter 4", "MySQL", "PostgreSQL", "Tailwind CSS", "REST API"]
  },
  {
    role: "Web Developer Intern",
    company: "Pengadilan Negeri Pontianak",
    period: "2024",
    type: "Magang (On-site)",
    location: "Pontianak, Kalimantan Barat",
    highlights: [
      "Membangun sistem informasi manajemen pegawai (SIMPEG) berbasis web untuk pengelolaan data pegawai, riwayat jabatan, dan struktur organisasi instansi.",
      "Merancang dan mengoptimalkan skema relasi database terintegrasi untuk kebutuhan administrasi kepegawaian."
    ],
    skills: ["PHP", "MySQL", "CodeIgniter", "Bootstrap", "Database Design"]
  }
];

// ===================================
// DATA PENDIDIKAN (EDUCATION)
// ===================================
const userEducation = [
  {
    degree: "D3 Sistem Informasi",
    institution: "Universitas Bina Sarana Informatika (UBSI), Pontianak",
    period: "Sep 2021 – Agu 2025",
    gpa: "IPK 3.51 / 4.00",
    status: "Lulus (Predikat Sangat Memuaskan)",
    description: "Fokus studi pada Rekayasa Perangkat Lunak, Arsitektur Basis Data, Analisis & Perancangan Sistem Informasi, serta Pengembangan Aplikasi Berbasis Web dan Mobile.",
    highlights: [
      "IPK Akhir: 3.51 / 4.00 (Predikat Sangat Memuaskan)",
      "Sertifikasi Kompetensi Nasional BNSP Programmer (Software Development)",
      "Sertifikasi Kompetensi Nasional BNSP Program Analyst",
      "Skripsi & Proyek Terapan Pengembangan Sistem Informasi Bisnis"
    ]
  }
];

// ===================================
// DATA SERTIFIKAT RESMI (CERTIFICATES)
// ===================================
const userCertificates = [
  {
    title: "BNSP Certified Program Analyst",
    issuer: "Badan Nasional Sertifikasi Profesi (BNSP)",
    date: "15 Sep 2025",
    link: "/cv.pdf",
    image: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?q=80&w=2070&auto=format&fit=crop",
  },
  {
    title: "BNSP Certified Programmer (Software Development)",
    issuer: "Badan Nasional Sertifikasi Profesi (BNSP)",
    date: "5 Feb 2025",
    link: "/cv.pdf",
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=2070&auto=format&fit=crop",
  },
];

const techStack = {
  "Programming Languages": [
    { name: "Go (Golang)", icon: <SiGo className="text-[#00ADD8]" /> },
    { name: "TypeScript", icon: <SiTypescript className="text-[#3178C6]" /> },
    { name: "JavaScript", icon: <FaJsSquare className="text-[#F7DF1E]" /> },
    { name: "PHP", icon: <SiPhp className="text-[#777BB4]" /> },
    { name: "Python", icon: <SiPython className="text-[#3776AB]" /> },
    { name: "Dart", icon: <SiDart className="text-[#0175C2]" /> },
    { name: "HTML5", icon: <FaHtml5 className="text-[#E34F26]" /> },
    { name: "CSS3", icon: <FaCss3Alt className="text-[#1572B6]" /> },
  ],
  "Frontend Frameworks": [
    { name: "React.js", icon: <FaReact className="text-[#61DAFB]" /> },
    { name: "Next.js", icon: <SiNextdotjs className="dark:text-white text-slate-900" /> },
    { name: "Astro SSR", icon: <SiAstro className="text-[#BC52EE]" /> },
    { name: "Tailwind CSS", icon: <SiTailwindcss className="text-[#38B2AC]" /> },
    { name: "Bootstrap", icon: <SiBootstrap className="text-[#7952B3]" /> },
    { name: "Leaflet GIS", icon: <SiLeaflet className="text-[#199900]" /> },
  ],
  "Backend & API": [
    { name: "Go REST API", icon: <SiGo className="text-[#00ADD8]" /> },
    { name: "Node.js", icon: <FaNodeJs className="text-[#339933]" /> },
    { name: "Express.js", icon: <SiExpress className="dark:text-white text-slate-900" /> },
    { name: "CodeIgniter 4", icon: <SiCodeigniter className="text-[#EE4623]" /> },
    { name: "Postman", icon: <SiPostman className="text-[#FF6C37]" /> },
  ],
  "Database & Caching": [
    { name: "PostgreSQL", icon: <SiPostgresql className="text-[#336791]" /> },
    { name: "MySQL", icon: <SiMysql className="text-[#4479A1]" /> },
    { name: "Redis", icon: <SiRedis className="text-[#DC382D]" /> },
    { name: "MongoDB", icon: <SiMongodb className="text-[#47A248]" /> },
  ],
  "Mobile Development": [
    { name: "Flutter", icon: <SiFlutter className="text-[#02569B]" /> },
    { name: "Dart", icon: <SiDart className="text-[#0175C2]" /> },
  ],
  "DevOps & Infrastructure": [
    { name: "Docker", icon: <SiDocker className="text-[#2496ED]" /> },
    { name: "Git & GitHub", icon: <FaGithub className="dark:text-white text-slate-900" /> },
    { name: "Linux / VPS (SSH)", icon: <SiLinux className="text-[#FCC624]" /> },
    { name: "Vercel", icon: <SiVercel className="dark:text-white text-slate-900" /> },
  ],
};

const projectTechIcons = {
  "Go (Golang)": <SiGo className="text-[#00ADD8]" />,
  "Go": <SiGo className="text-[#00ADD8]" />,
  "Astro SSR": <SiAstro className="text-[#BC52EE]" />,
  "Astro": <SiAstro className="text-[#BC52EE]" />,
  "React.js": <FaReact className="text-[#61DAFB]" />,
  "React": <FaReact className="text-[#61DAFB]" />,
  "Next.js": <SiNextdotjs />,
  "Node.js": <FaNodeJs className="text-[#339933]" />,
  "Express": <SiExpress />,
  "Express.js": <SiExpress />,
  "CodeIgniter 4": <SiCodeigniter className="text-[#EE4623]" />,
  "PHP": <SiPhp className="text-[#777BB4]" />,
  "PostgreSQL": <SiPostgresql className="text-[#336791]" />,
  "MySQL": <SiMysql className="text-[#4479A1]" />,
  "Redis": <SiRedis className="text-[#DC382D]" />,
  "MongoDB": <SiMongodb className="text-[#47A248]" />,
  "Docker": <SiDocker className="text-[#2496ED]" />,
  "Flutter": <SiFlutter className="text-[#02569B]" />,
  "Dart": <SiDart className="text-[#0175C2]" />,
  "Leaflet": <SiLeaflet className="text-[#199900]" />,
  "GIS": <SiLeaflet className="text-[#199900]" />,
  "Tailwind CSS": <SiTailwindcss className="text-[#38B2AC]" />,
  "TailwindCSS": <SiTailwindcss className="text-[#38B2AC]" />,
  "Bootstrap": <SiBootstrap className="text-[#7952B3]" />,
  "JavaScript": <FaJsSquare className="text-[#F7DF1E]" />,
  "TypeScript": <SiTypescript className="text-[#3178C6]" />,
  "HTML5": <FaHtml5 className="text-[#E34F26]" />,
  "CSS3": <FaCss3Alt className="text-[#1572B6]" />,
  "Vercel": <SiVercel />,
  "Git & GitHub": <FaGithub />,
  "Postman": <SiPostman className="text-[#FF6C37]" />,
  "Python": <SiPython className="text-[#3776AB]" />,
  "Linux / VPS": <SiLinux className="text-[#FCC624]" />,
  "Linux": <SiLinux className="text-[#FCC624]" />,
};

// ===================================
// HELPER & ANIMATION COMPONENTS
// ===================================
const LineShadowText = ({ children, className, shadowColor = "#4079ff", ...props }) => {
  return (
    <motion.span
      style={{ "--shadow-color": shadowColor }}
      className={`relative z-0 line-shadow-effect ${className}`}
      data-text={children}
      {...props}
    >
      {children}
    </motion.span>
  );
};

// ===================================
// KOMPONEN KARTU SERTIFIKAT
// ===================================
const CertificateCard = ({ cert, onClick }) => {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="group relative cursor-pointer"
      whileHover={{ y: -8 }}
      onClick={() => onClick(cert)}
    >
      <div className="relative h-64 sm:h-72 rounded-2xl overflow-hidden dark:shadow-lg shadow-xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-cyan-400/30 transition-all duration-500">
        <div className="absolute inset-0">
          <img src={cert.image} alt={cert.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/60 to-slate-900/30 group-hover:from-slate-900/95 transition-all duration-500"></div>
        </div>
        <div className="absolute inset-0 p-5 flex flex-col justify-between">
          <div className="flex-1 flex items-start justify-between">
            <div className="bg-white/10 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/20">
              <span className="text-xs font-semibold text-cyan-300 uppercase tracking-wider">{cert.issuer}</span>
            </div>
            <div className="bg-emerald-500/20 backdrop-blur-md px-3 py-1.5 rounded-full border border-emerald-400/30">
              <span className="text-xs font-bold text-emerald-300">{cert.date}</span>
            </div>
          </div>
          <div className="space-y-3">
            <div>
              <h3 className="text-lg sm:text-xl font-bold text-white line-clamp-2 leading-tight">{cert.title}</h3>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2 text-slate-300">
                <FaDownload className="text-sm" />
                <span className="text-sm font-medium">View Certificate</span>
              </div>
              <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="bg-cyan-500/20 backdrop-blur-md p-2 rounded-full border border-cyan-400/30">
                  <FaExternalLinkAlt className="text-cyan-300 text-sm" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-cyan-500/0 via-transparent to-emerald-500/0 group-hover:from-cyan-500/10 group-hover:to-emerald-500/10 transition-all duration-500"></div>
      </div>
    </motion.div>
  );
};

// ===================================
// KOMPONEN PREVIEW MODAL PROYEK
// ===================================
const ProjectDetailModal = ({ project, onClose }) => {
  if (!project) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 50 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 50 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="relative max-w-5xl w-full dark:bg-slate-900/90 bg-white/95 backdrop-blur-xl rounded-3xl border dark:border-white/10 border-slate-200 shadow-2xl overflow-hidden max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <div className="absolute top-4 right-4 z-20">
          <button onClick={onClose} className="dark:bg-black/40 bg-slate-200/80 hover:bg-red-500/20 backdrop-blur-md p-3 rounded-full dark:border-white/10 border-slate-300 hover:border-red-500/30 transition-all duration-300 group">
            <FaTimes className="dark:text-white/70 text-slate-600 group-hover:text-red-500" />
          </button>
        </div>

        <div className="flex flex-col md:flex-row h-full overflow-y-auto custom-scrollbar">
          {/* Image Section */}
          <div className="w-full md:w-1/2 relative min-h-[300px] md:min-h-full">
            <img src={project.image} alt={project.title} className="absolute inset-0 w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-slate-900 via-slate-900/40 to-transparent"></div>
          </div>

          {/* Content Section */}
          <div className="w-full md:w-1/2 p-8 md:p-10 flex flex-col">
            <div className="flex-1">
              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-4">
                {project.tech.map((t, i) => (
                  <span key={i} className="flex items-center gap-1.5 text-xs font-mono px-3 py-1.5 rounded-full dark:bg-cyan-500/10 bg-cyan-100 dark:text-cyan-300 text-cyan-700 dark:border-cyan-500/20 border-cyan-300">
                    {projectTechIcons[t] || <PiCodeBold className="text-cyan-400" />} {t}
                  </span>
                ))}
              </div>

              <h2 className="text-3xl font-bold dark:text-white text-slate-900 mb-4 leading-tight">{project.title}</h2>
              <p className="dark:text-slate-300 text-slate-600 leading-relaxed mb-6 text-lg">{project.description}</p>

              {project.featured && (
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-yellow-500/10 border border-yellow-500/20 rounded-lg mb-6">
                  <FaStar className="text-yellow-400 text-sm" />
                  <span className="text-yellow-400 font-medium">Featured Project</span>
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mt-8 pt-8 border-t border-white/10">
              {project.link !== '#' && (
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 px-6 py-4 dark:bg-gradient-to-r dark:from-cyan-600 dark:to-emerald-600 dark:hover:from-cyan-500 dark:hover:to-emerald-500 bg-cyan-600 hover:bg-cyan-500 text-white font-bold rounded-xl transition-all duration-300 shadow-lg hover:shadow-cyan-500/30 hover:-translate-y-1"
                >
                  <FaExternalLinkAlt />
                  <span>Live Demo</span>
                </a>
              )}

              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-2 px-6 py-4 dark:bg-slate-800 bg-slate-700 dark:hover:bg-slate-700 hover:bg-slate-600 text-white font-bold rounded-xl dark:border-slate-700 border-slate-600 transition-all duration-300 hover:-translate-y-1"
              >
                <FaGithub className="text-xl" />
                <span>Source Code</span>
              </a>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

// ===================================
// KOMPONEN KARTU PROYEK
// ===================================
const ProjectCard = ({ project, onClick }) => {
  return (
    <div
      onClick={() => onClick(project)}
      className="group relative h-64 sm:h-72 rounded-2xl overflow-hidden transition-all duration-300 dark:shadow-none shadow-lg hover:shadow-xl dark:hover:shadow-cyan-500/30 hover:-translate-y-2 cursor-pointer"
      style={{ background: `url('${project.image}') center/cover no-repeat` }}
    >
      <div className="absolute inset-0 dark:bg-black/60 bg-slate-900/70 dark:group-hover:bg-black/40 group-hover:bg-slate-900/50 transition-colors duration-500"></div>

      <div className="absolute inset-0 flex flex-col justify-between p-6 opacity-100 transition-opacity duration-300">
        <div className="translate-y-0 group-hover:-translate-y-2 transition-transform duration-500">
          <div className="flex justify-between items-start">
            <h3 className="text-2xl font-bold text-white dark:group-hover:text-cyan-300 group-hover:text-cyan-400 transition-colors">{project.title}</h3>
            <div className="bg-white/10 backdrop-blur-md p-2 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300">
              <FaExternalLinkAlt className="text-white" />
            </div>
          </div>
          <p className="text-slate-200 dark:text-slate-300 mt-2 text-sm line-clamp-2 leading-relaxed opacity-90 group-hover:opacity-100">{project.description}</p>
        </div>

        <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 opacity-0 group-hover:opacity-100">
          <div className="flex flex-wrap gap-2">
            {project.tech.slice(0, 3).map((t, i) => (
              <span key={i} className="flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-full bg-cyan-500/20 text-cyan-200 border border-cyan-400/20 backdrop-blur-sm">
                {projectTechIcons[t] || <PiCodeBold className="text-cyan-400" />}
                <span>{t}</span>
              </span>
            ))}
            {project.tech.length > 3 && (
              <span className="text-xs font-bold px-3 py-1.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
                +{project.tech.length - 3}
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="absolute inset-0 rounded-2xl border border-white/10 group-hover:border-cyan-400/50 transition-colors duration-300 pointer-events-none"></div>
    </div>
  );
};

// ===================================
// KOMPONEN PREVIEW MODAL SERTIFIKAT
// ===================================
const CertificatePreviewModal = ({ certificate, onClose }) => {
  if (!certificate) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 50 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 50 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="relative max-w-4xl w-full dark:bg-slate-900/90 bg-white/95 backdrop-blur-xl rounded-3xl border dark:border-white/10 border-slate-200 shadow-2xl overflow-hidden flex flex-col md:flex-row"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <div className="absolute top-4 right-4 z-20">
          <button onClick={onClose} className="dark:bg-black/40 bg-slate-200/80 hover:bg-red-500/20 backdrop-blur-md p-2 rounded-full dark:border-white/10 border-slate-300 hover:border-red-500/30 transition-all duration-300 group">
            <FaTimes className="dark:text-white/70 text-slate-600 group-hover:text-red-500" />
          </button>
        </div>

        {/* Image Section */}
        <div className="w-full md:w-3/5 relative min-h-[300px] md:min-h-[500px] bg-slate-900">
          <img src={certificate.image} alt={certificate.title} className="absolute inset-0 w-full h-full object-contain p-4 bg-slate-950/50" />
        </div>

        {/* Content Section */}
        <div className="w-full md:w-2/5 p-8 flex flex-col justify-center dark:bg-slate-900/50 bg-white">
          <div className="mb-6">
            <div className="inline-block px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-bold tracking-wider mb-4">
              {certificate.issuer}
            </div>
            <h2 className="text-2xl font-bold dark:text-white text-slate-900 mb-2 leading-tight">{certificate.title}</h2>
            <p className="text-slate-400 font-mono text-sm">{certificate.date}</p>
          </div>

          <div className="space-y-4 mt-auto">
            <a
              href={certificate.link}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full px-6 py-3 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-bold rounded-xl transition-all duration-300 shadow-lg hover:shadow-cyan-500/25 group"
            >
              <FaDownload className="group-hover:animate-bounce" />
              <span>Download / View PDF</span>
            </a>

            <button
              onClick={onClose}
              className="w-full px-6 py-3 dark:bg-slate-800 bg-slate-200 dark:hover:bg-slate-700 hover:bg-slate-300 dark:text-slate-300 text-slate-700 font-semibold rounded-xl transition-all duration-300"
            >
              Close Preview
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

// ===================================
// KOMPONEN UTAMA SECTION PROJECT
// ===================================
function ProjectSection() {
  const [activeTab, setActiveTab] = useState('Projects');
  const [projectCategory, setProjectCategory] = useState('All');
  const [previewCertificate, setPreviewCertificate] = useState(null);
  const [previewProject, setPreviewProject] = useState(null); // ✨ NEW STATE
  const { hideNavbar, showNavbar } = useNavbar();

  // === Database States ===
  const [projectsFromDB, setProjectsFromDB] = useState([]);
  const [certificatesFromDB, setCertificatesFromDB] = useState([]);
  const [loadingProjects, setLoadingProjects] = useState(true);
  const [loadingCerts, setLoadingCerts] = useState(true);

  // === CHANGE START: State dan konstanta untuk Show More/Less ===
  const INITIAL_CERTIFICATES_TO_SHOW = 6;
  const [visibleCertificatesCount, setVisibleCertificatesCount] = useState(INITIAL_CERTIFICATES_TO_SHOW);
  // === CHANGE END ===

  // Fetch projects from database
  useEffect(() => {
    async function fetchProjects() {
      if (!supabase) {
        setLoadingProjects(false);
        return;
      }
      try {
        const { data, error } = await supabase
          .from('projects')
          .select('*')
          .order('created_at', { ascending: false });

        if (error) throw error;

        if (data && data.length > 0) {
          setProjectsFromDB(data);
        }
      } catch (err) {
        console.warn('⚠️ Supabase projects fetch fallback:', err);
      } finally {
        setLoadingProjects(false);
      }
    }
    fetchProjects();
  }, []);

  // Fetch certificates from database
  useEffect(() => {
    async function fetchCertificates() {
      if (!supabase) {
        setLoadingCerts(false);
        return;
      }
      try {
        const { data, error } = await supabase
          .from('certificates')
          .select('*')
          .order('issue_date', { ascending: false });

        if (error) throw error;

        if (data && data.length > 0) {
          setCertificatesFromDB(data);
        }
      } catch (err) {
        console.warn('⚠️ Supabase certificates fetch fallback:', err);
      } finally {
        setLoadingCerts(false);
      }
    }
    fetchCertificates();
  }, []);

  useEffect(() => {
    // Hide navbar when any modal is open
    if (previewCertificate || previewProject) {
      hideNavbar();
    } else {
      showNavbar();
    }
  }, [previewCertificate, previewProject, hideNavbar, showNavbar]);

  useEffect(() => {
    return () => {
      showNavbar();
    };
  }, [showNavbar]);

  const tabs = [
    { id: 'Projects', label: 'Projects', icon: <PiCodeBold className="text-[1.7em] mb-1" /> },
    { id: 'Experience', label: 'Experience', icon: <LuBriefcase className="text-[1.5em] mb-1" /> },
    { id: 'Education', label: 'Education', icon: <LuGraduationCap className="text-[1.5em] mb-1" /> },
    { id: 'Certificate', label: 'Certificates', icon: <LuBadge className="text-[1.5em] mb-1" /> },
    { id: 'Tech Stack', label: 'Tech Stack', icon: <LiaLayerGroupSolid className="text-[1.5em] mb-1" /> },
  ];

  // Use database projects if available, fallback to dummy data
  const activeProjects = projectsFromDB.length > 0 ? projectsFromDB : dummyProjects;

  console.log('🎯 Active projects source:', projectsFromDB.length > 0 ? 'DATABASE' : 'FALLBACK');
  console.log('📦 Total projects:', activeProjects.length);

  // Transform database projects to match UI format
  const transformedProjects = activeProjects.map(p => {
    // If has UUID id, it's from database - transform it
    if (p.id && typeof p.id === 'string' && p.id.includes('-')) {
      return {
        id: p.id,
        title: p.title,
        description: p.description,
        tech: p.tags || [],
        link: p.demo_url || p.github_url || '#', // Use demo_url as primary link
        github: p.github_url, // Add specific github field
        image: p.image_url,
        category: 'Database', // All DB projects in one category
        featured: p.featured || false
      };
    }
    // Static data already in correct format
    return p;
  });

  console.log('🔄 Transformed projects:', transformedProjects.length);

  // Filter projects by category (only applies to static dummy data)
  const filteredProjects = transformedProjects.filter((p) => {
    // If from database (has category 'Database'), show all
    if (p.category === 'Database') return true;
    if (projectCategory === 'All') return true;
    // For dummy data, filter by selected category
    return p.category === projectCategory;
  });

  console.log('✨ Filtered projects to display:', filteredProjects.length);

  // Use database certificates if available, fallback to static data
  const activeCertificates = certificatesFromDB.length > 0 ? certificatesFromDB : userCertificates;

  // === CHANGE START: Handler untuk tombol Show More/Less ===
  const handleShowMore = () => {
    setVisibleCertificatesCount(activeCertificates.length);
  };

  const handleShowLess = () => {
    setVisibleCertificatesCount(INITIAL_CERTIFICATES_TO_SHOW);
  };
  // === CHANGE END ===

  return (
    <section id="project" className="py-20">

      <style>{`
        @keyframes line-shadow-anim { 0% { background-position: 0 0; } 100% { background-position: 100% 100%; } }
        .line-shadow-effect::after { content: attr(data-text); position: absolute; z-index: -1; left: 0.04em; top: 0.04em; background-image: linear-gradient(45deg, transparent 45%, var(--shadow-color) 45%, var(--shadow-color) 55%, transparent 0); background-size: 0.06em 0.06em; -webkit-background-clip: text; background-clip: text; color: transparent; animation: line-shadow-anim 30s linear infinite; }
        .line-clamp-2 { display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
      `}</style>

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="text-center mb-20"
      >
        <h2 className="text-4xl font-bold font-moderniz">
          <span className="dark:text-[#00ffdc] text-cyan-600"><LineShadowText shadowColor="#00b3a4">PORTFOLIO</LineShadowText></span>
          {' '}
          <span className="dark:text-white text-slate-800"><LineShadowText shadowColor="#bbbbbb">SHOWCASE</LineShadowText></span>
        </h2>
      </motion.div>

      <div className="w-full">
        <div className="flex justify-center mb-12">
          <motion.div
            layout
            className="inline-flex w-full max-w-5xl rounded-3xl p-1.5 sm:p-2 shadow-lg border dark:border-slate-800 border-slate-200 dark:bg-gradient-to-r dark:from-[#101624] dark:via-[#0a1627] dark:to-[#0a223a] bg-white backdrop-blur-md overflow-x-auto"
            style={{ boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.18)", backdropFilter: "blur(12px)", WebkitBackdropFilter: "blur(12px)" }}
          >
            {tabs.map((tab) => (
              <motion.button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`relative flex flex-1 flex-col items-center justify-center min-w-[70px] sm:min-w-0 px-1 sm:px-2 py-4 sm:py-6 rounded-2xl font-semibold text-xs sm:text-sm md:text-base transition-colors duration-300 outline-none ${activeTab === tab.id ? "dark:text-white text-slate-900" : "text-slate-400 hover:text-cyan-600 dark:hover:text-cyan-300"}`}
                whileTap={{ scale: 0.97 }}
                whileHover={{ scale: 1.03 }}
                transition={{ type: "spring", stiffness: 400, damping: 20 }}
                style={{ zIndex: 1, minWidth: 0 }}
              >
                {activeTab === tab.id && (
                  <motion.span
                    layoutId="tab-underline"
                    className="absolute inset-0 dark:bg-gradient-to-br dark:from-[#0a223a] dark:to-[#101624] bg-slate-100 rounded-2xl border dark:border-transparent border-slate-200"
                    transition={{ type: "spring", bounce: 0.25, duration: 0.5 }}
                    style={{ zIndex: -1, opacity: 0.96 }}
                  />
                )}
                <span className="relative z-10 flex flex-col items-center gap-1.5 sm:gap-2">
                  {tab.icon}
                  <span className="font-bold text-center leading-tight">{tab.label}</span>
                </span>
              </motion.button>
            ))}
          </motion.div>
        </div>

        <div
          className="rounded-3xl p-0 md:p-6 shadow-xl border dark:border-slate-800/60 border-slate-100 mx-auto max-w-7xl bg-clip-padding dark:bg-slate-900/50 bg-white"
          style={{ boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.18)", backdropFilter: "blur(16px)", WebkitBackdropFilter: "blur(16px)" }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -10, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="p-6 md:p-10"
            >
              {activeTab === 'Projects' && (
                <>
                  {/* Only show category buttons for dummy data */}
                  {projectsFromDB.length === 0 && (
                    <div className="flex flex-wrap justify-center gap-3 mb-8">
                      {['All', 'Web/Apps', 'Mobile', 'Tools & SDK'].map((cat) => (
                        <button
                          key={cat}
                          className={`px-5 py-2 rounded-full font-semibold transition-all duration-200 border text-sm ${
                            projectCategory === cat
                              ? 'bg-cyan-600 text-white border-cyan-400 shadow-cyan-500/20 shadow-lg'
                              : 'dark:bg-slate-900/60 bg-white dark:text-cyan-200 text-slate-700 dark:border-slate-700 border-slate-200 hover:border-cyan-400'
                          }`}
                          onClick={() => setProjectCategory(cat)}
                        >
                          {cat}
                        </button>
                      ))}
                    </div>
                  )}

                  {loadingProjects ? (
                    <div className="flex justify-center py-12">
                      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-cyan-400"></div>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                      {filteredProjects.length > 0 ? (
                        filteredProjects.map((p, i) => (
                          <ProjectCard
                            key={p.id || i}
                            project={p}
                            onClick={setPreviewProject} // ✨ PASS HANDLER
                          />
                        ))
                      ) : (
                        <div className="col-span-full text-center text-slate-400 py-12">
                          No projects available yet.
                          {projectsFromDB.length === 0 && (
                            <div className="mt-4 text-sm text-cyan-400">
                              Add projects via Admin Dashboard to see them here!
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  )}
                </>
              )}
              {activeTab === 'Experience' && (
                <div className="max-w-4xl mx-auto space-y-8">
                  {userExperiences.map((exp, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                      className="relative p-6 sm:p-8 rounded-2xl dark:bg-slate-900/80 bg-white border dark:border-slate-800 border-slate-200 shadow-lg hover:border-cyan-500/40 transition-all duration-300"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 border-b dark:border-slate-800 border-slate-100 pb-4">
                        <div>
                          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border border-cyan-500/20 mb-2">
                            <span>{exp.type}</span>
                            <span>•</span>
                            <span>{exp.location}</span>
                          </div>
                          <h3 className="text-xl sm:text-2xl font-bold dark:text-white text-slate-900">
                            {exp.role}
                          </h3>
                          <p className="text-base font-semibold text-cyan-600 dark:text-cyan-300 mt-1">
                            {exp.company}
                          </p>
                        </div>
                        <div className="self-start sm:self-auto px-4 py-1.5 rounded-full text-xs font-mono font-bold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 whitespace-nowrap">
                          {exp.period}
                        </div>
                      </div>

                      <ul className="space-y-2.5 mb-6">
                        {exp.highlights.map((item, hIdx) => (
                          <li key={hIdx} className="flex items-start gap-3 text-sm sm:text-base leading-relaxed dark:text-slate-300 text-slate-600">
                            <span className="text-cyan-500 mt-1 flex-shrink-0 text-sm">◆</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>

                      <div className="flex flex-wrap gap-2 pt-4 border-t dark:border-slate-800/60 border-slate-100">
                        {exp.skills.map((skill, sIdx) => (
                          <span
                            key={sIdx}
                            className="text-xs font-medium px-3 py-1 rounded-lg dark:bg-slate-800/90 bg-slate-100 dark:text-cyan-200 text-slate-700 border dark:border-slate-700/60 border-slate-200"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
              {activeTab === 'Education' && (
                <div className="max-w-4xl mx-auto space-y-8">
                  {userEducation.map((edu, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4 }}
                      className="relative p-6 sm:p-8 rounded-2xl dark:bg-slate-900/80 bg-white border dark:border-slate-800 border-slate-200 shadow-lg hover:border-cyan-500/40 transition-all duration-300"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-6 border-b dark:border-slate-800 border-slate-100 pb-5">
                        <div>
                          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 mb-2">
                            <span>{edu.status}</span>
                          </div>
                          <h3 className="text-2xl sm:text-3xl font-bold dark:text-white text-slate-900">
                            {edu.degree}
                          </h3>
                          <p className="text-lg font-semibold text-cyan-600 dark:text-cyan-300 mt-1">
                            {edu.institution}
                          </p>
                        </div>
                        <div className="flex flex-col sm:items-end gap-2">
                          <span className="px-4 py-1.5 rounded-full text-xs font-mono font-bold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 w-max">
                            {edu.period}
                          </span>
                          <span className="px-4 py-1.5 rounded-full text-xs font-bold bg-gradient-to-r from-amber-500/20 to-emerald-500/20 text-amber-600 dark:text-amber-300 border border-amber-500/30 w-max">
                            {edu.gpa}
                          </span>
                        </div>
                      </div>

                      <p className="text-sm sm:text-base leading-relaxed dark:text-slate-300 text-slate-600 mb-6">
                        {edu.description}
                      </p>

                      <div className="dark:bg-slate-950/40 bg-slate-50 p-5 rounded-xl border dark:border-slate-800/80 border-slate-200/80">
                        <h4 className="text-xs uppercase tracking-wider font-bold text-slate-400 dark:text-slate-500 mb-3">
                          Pencapaian & Sorotan Utama:
                        </h4>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          {edu.highlights.map((hl, hIdx) => (
                            <div key={hIdx} className="flex items-center gap-2.5 text-sm dark:text-slate-200 text-slate-700">
                              <span className="text-emerald-500 flex-shrink-0 text-sm">✓</span>
                              <span>{hl}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
              {activeTab === 'Certificate' && (
                <div className="space-y-8">
                  {loadingCerts ? (
                    <div className="flex justify-center py-12">
                      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-400"></div>
                    </div>
                  ) : (
                    <>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
                        <AnimatePresence>
                          {activeCertificates.slice(0, visibleCertificatesCount).map((cert, i) => {
                            // Transform DB data to match CertificateCard props
                            const certData = cert.id ? {
                              // From database (has UUID id)
                              title: cert.title,
                              issuer: cert.issuer,
                              date: cert.issue_date ? new Date(cert.issue_date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }) : '',
                              link: cert.credential_url || '#',
                              image: cert.image_url || ''
                            } : cert; // From static data

                            return <CertificateCard key={cert.id || i} cert={certData} onClick={setPreviewCertificate} />;
                          })}
                        </AnimatePresence>
                      </div>
                      {activeCertificates.length > INITIAL_CERTIFICATES_TO_SHOW && (
                        <div className="flex justify-center mt-12">
                          {visibleCertificatesCount < activeCertificates.length ? (
                            <motion.button
                              onClick={handleShowMore}
                              className="group dark:bg-gradient-to-r dark:from-cyan-600 dark:to-emerald-600 dark:hover:from-cyan-500 dark:hover:to-emerald-500 bg-cyan-600 hover:bg-cyan-500 px-8 py-3 rounded-full text-white font-semibold transition-all duration-300 shadow-lg hover:shadow-cyan-500/25"
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                            >
                              Show More ({activeCertificates.length - visibleCertificatesCount} more)
                            </motion.button>
                          ) : (
                            <motion.button
                              onClick={handleShowLess}
                              className="group bg-gradient-to-r from-slate-700 to-slate-800 hover:from-slate-600 hover:to-slate-700 px-8 py-3 rounded-full text-white font-semibold transition-all duration-300 shadow-lg"
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                            >
                              Show Less
                            </motion.button>
                          )}
                        </div>
                      )}
                    </>
                  )}
                </div>
              )}
              {activeTab === 'Tech Stack' && (
                <div className="max-w-4xl mx-auto space-y-8">
                  {Object.entries(techStack).map(([category, techs]) => (
                    <div key={category}>
                      <h3 className="text-xl font-bold dark:text-cyan-300 text-cyan-600 capitalize mb-4 border-b-2 dark:border-slate-800 border-slate-200 pb-2">{category}</h3>
                      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
                        {techs.map((tech, i) => (
                          <div key={i} className="flex flex-col items-center justify-center gap-3 p-4 rounded-xl dark:bg-slate-900/70 bg-white border dark:border-slate-800 border-slate-100 transition-all duration-300 hover:bg-slate-50 dark:hover:bg-slate-800/50 hover:border-cyan-500/30 dark:shadow-none shadow-md hover:shadow-lg dark:hover:shadow-none">
                            <div className="text-4xl">{tech.icon}</div>
                            <p className="text-sm dark:text-slate-300 text-slate-600">{tech.name}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      <AnimatePresence>
        {previewCertificate && (
          <CertificatePreviewModal
            certificate={previewCertificate}
            onClose={() => setPreviewCertificate(null)}
          />
        )}
        {/* ✨ Project Detail Modal */}
        {previewProject && (
          <ProjectDetailModal
            project={previewProject}
            onClose={() => setPreviewProject(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
}

export default ProjectSection;