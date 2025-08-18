"use client"

import type React from "react"

import { useEffect, useState, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion"
import {
  ArrowRight,
  ChevronDown,
  Github,
  Mail,
  Menu,
  X,
  Linkedin,
  Twitter,
  Instagram,
  Code,
  Briefcase,
  User,
  Heart,
  Send,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

export default function Portfolio() {
  const [activeSection, setActiveSection] = useState("home")
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrollProgress, setScrollProgress] = useState(0)
  const [showAllProjects, setShowAllProjects] = useState(false)
  const sections = ["home", "about", "personal", "work", "expertise", "contact"]
  const { scrollYProgress } = useScroll()
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0])

  
  const sectionRefs = {
    home: useRef<HTMLElement>(null),
    about: useRef<HTMLElement>(null),
    personal: useRef<HTMLElement>(null),
    work: useRef<HTMLElement>(null),
    expertise: useRef<HTMLElement>(null),
    contact: useRef<HTMLElement>(null),
  }

  
  const socialProfiles = [
    { name: "GitHub", icon: <Github className="h-5 w-5" />, url: "https://github.com/username" },
    { name: "LinkedIn", icon: <Linkedin className="h-5 w-5" />, url: "https://linkedin.com/in/username" },
    { name: "Twitter", icon: <Twitter className="h-5 w-5" />, url: "https://twitter.com/username" },
    { name: "Instagram", icon: <Instagram className="h-5 w-5" />, url: "https://instagram.com/username" },
  ]

  
  const projects = [
    {
      title: "Lorem Ipsum Project",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in dui mauris. Vivamus hendrerit arcu sed erat molestie vehicula.",
      image: "https://files.catbox.moe/w1868g.webp",
      tags: ["Lorem", "Ipsum", "Dolor"],
      link: "#",
    },
    {
      title: "Dolor Sit Amet",
      description:
        "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam.",
      image: "https://files.catbox.moe/w1868g.webp",
      tags: ["Consectetur", "Adipiscing", "Elit"],
      link: "#",
    },
    {
      title: "Consectetur Adipiscing",
      description:
        "Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur.",
      image: "https://files.catbox.moe/w1868g.webp",
      tags: ["Natus", "Error", "Voluptatem"],
      link: "#",
    },
    {
      title: "Sed Ut Perspiciatis",
      description:
        "Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat.",
      image: "https://files.catbox.moe/w1868g.webp",
      tags: ["Quis", "Autem", "Reprehenderit"],
      link: "#",
    },
    {
      title: "Nemo Enim Ipsam",
      description:
        "Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora.",
      image: "https://files.catbox.moe/w1868g.webp",
      tags: ["Neque", "Porro", "Quisquam"],
      link: "#",
    },
  ]

  useEffect(() => {
    
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }

    return () => {
      document.body.style.overflow = ""
    }
  }, [mobileMenuOpen])

  useEffect(() => {
    let ticking = false
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrollPosition = window.scrollY
          const windowHeight = window.innerHeight
          const documentHeight = document.body.scrollHeight

          
          const progress = (scrollPosition / (documentHeight - windowHeight)) * 100
          setScrollProgress(progress)

          
          let currentSection = activeSection
          for (const section of sections) {
            const element = document.getElementById(section)
            if (element) {
              const { offsetTop, offsetHeight } = element
              if (scrollPosition >= offsetTop - 100 && scrollPosition < offsetTop + offsetHeight - 100) {
                currentSection = section
                break
              }
            }
          }
          if (currentSection !== activeSection) {
            setActiveSection(currentSection)
          }
          ticking = false
        })
        ticking = true
      }
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [sections, activeSection])

  
  const scrollToSection = (sectionId: string) => {
    const section = sectionRefs[sectionId as keyof typeof sectionRefs]?.current
    if (section) {
      section.scrollIntoView({ behavior: "smooth" })
      setMobileMenuOpen(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-[#f5f5f5] overflow-hidden">
      {}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-teal-500 to-emerald-500 z-[99]"
        style={{
          scaleX: scrollProgress,
          transformOrigin: "0%",
          willChange: "transform",
        }}
      />

      {}
      <header className="fixed top-0 left-0 right-0 z-[100] bg-[#0a0a0a]/90 backdrop-blur-md border-b border-[#222] transition-all duration-300">
        <div className="container mx-auto px-6 py-5 flex justify-between items-center">
          <Link href="#home" className="text-xl font-medium tracking-tight font-poppins">
            <span className="text-gradient">Lorem</span>
            <span className="text-[#f5f5f5]">.</span>
          </Link>
          <nav className="hidden md:flex items-center gap-8">
            {sections.map((section) => (
              <Link
                key={section}
                href={`#${section}`}
                onClick={(e) => {
                  e.preventDefault()
                  scrollToSection(section)
                }}
                className={`capitalize text-sm tracking-wide transition-colors hover:text-teal-500 ${
                  activeSection === section ? "text-teal-500 font-medium" : "text-[#aaa]"
                }`}
              >
                {section}
              </Link>
            ))}
            <Button
              className="ml-4 bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-600 hover:to-emerald-600 text-[#0a0a0a] rounded-md"
              onClick={() => scrollToSection("contact")}
            >
              <Mail className="mr-2 h-4 w-4" /> Lorem
            </Button>
          </nav>
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden text-[#f5f5f5] z-[101] relative transition-all duration-300"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
      </header>

      {}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="fixed inset-0 pt-20 bg-[#0a0a0a]/95 backdrop-blur-md z-40 flex flex-col items-center p-4 sm:p-6"
            style={{ overflowY: "auto", maxHeight: "100vh" }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1, duration: 0.3, ease: "easeOut" }}
              className="flex flex-col gap-4 sm:gap-6 bg-[#111]/90 backdrop-blur-md p-5 rounded-xl border border-[#222] w-full max-w-md mx-auto shadow-xl"
              style={{ maxHeight: "80vh", overflowY: "auto" }}
            >
              {sections.map((section, index) => (
                <motion.div
                  key={section}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + index * 0.05, duration: 0.3 }}
                >
                  <Link
                    href={`#${section}`}
                    onClick={(e) => {
                      e.preventDefault()
                      scrollToSection(section)
                    }}
                    className={`text-lg sm:text-xl capitalize transition-colors hover:text-teal-500 ${
                      activeSection === section ? "text-teal-500 font-medium" : "text-[#f5f5f5]"
                    } py-2 px-4 rounded-lg hover:bg-[#1a1a1a] flex items-center`}
                  >
                    {getSectionIcon(section)}
                    <span className="ml-3">{section}</span>
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 + sections.length * 0.05, duration: 0.3 }}
              >
                <Button
                  className="mt-2 bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-600 hover:to-emerald-600 text-[#0a0a0a] rounded-md w-full"
                  onClick={() => scrollToSection("contact")}
                >
                  <Mail className="mr-2 h-4 w-4" /> Lorem Ipsum
                </Button>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.3 }}
                className="flex justify-center gap-4 mt-4 pt-4 border-t border-[#222]"
              >
                {socialProfiles.map((profile) => (
                  <TooltipProvider key={profile.name}>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Link href={profile.url} target="_blank" className="social-icon" aria-label={profile.name}>
                          {profile.icon}
                        </Link>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>{profile.name}</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                ))}
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {}
      <section id="home" ref={sectionRefs.home} className="min-h-screen flex items-center justify-center pt-20 pb-16">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2, duration: 0.5 }}>
                <Badge
                  variant="outline"
                  className="text-sm font-medium text-teal-500 mb-4 tracking-wider px-4 py-1.5 border-teal-500/30"
                >
                  LOREM IPSUM
                </Badge>
              </motion.div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                Lorem <span className="text-gradient">Ipsum</span> Dolor
              </h1>
              <p className="text-[#aaa] text-lg mb-8 leading-relaxed max-w-lg">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in dui mauris. Vivamus hendrerit arcu
                sed erat molestie vehicula.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button
                  className="bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-600 hover:to-emerald-600 text-[#0a0a0a] rounded-md px-6 group"
                  onClick={() => scrollToSection("work")}
                >
                  Lorem Ipsum
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
                <Button
                  variant="outline"
                  className="border-[#333] text-[#f5f5f5] hover:bg-[#111] hover:border-[#444] rounded-md px-6"
                  onClick={() => scrollToSection("contact")}
                >
                  Dolor Sit
                </Button>
              </div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.5 }}
                className="flex gap-4 mt-8"
              >
                {socialProfiles.map((profile) => (
                  <TooltipProvider key={profile.name}>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Link href={profile.url} target="_blank" className="social-icon" aria-label={profile.name}>
                          {profile.icon}
                        </Link>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>{profile.name}</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                ))}
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative aspect-square max-w-md mx-auto will-change-transform"
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-teal-500/20 to-emerald-500/10 rounded-2xl -rotate-6"
                animate={{ rotate: [-6, -4, -6] }}
                transition={{ duration: 6, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
              ></motion.div>
              <motion.div
                className="absolute inset-0 bg-[#111] rounded-2xl border border-[#222] overflow-hidden rotate-3"
                animate={{ rotate: [3, 5, 3] }}
                transition={{ duration: 6, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut", delay: 0.5 }}
              >
                <Image
                  src="https://files.catbox.moe/w1868g.webp"
                  alt="Lorem Ipsum"
                  fill
                  priority
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover mix-blend-luminosity opacity-90"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] to-transparent opacity-40"></div>
              </motion.div>
            </motion.div>
          </div>

          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Number.POSITIVE_INFINITY, duration: 2 }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 cursor-pointer"
            onClick={() => scrollToSection("about")}
          >
            <ChevronDown className="h-8 w-8 text-[#aaa]" />
          </motion.div>
        </div>
      </section>

      {}
      <section id="about" ref={sectionRefs.about} className="py-24 bg-[#0f0f0f]">
        <div className="container mx-auto px-6">
          <SectionTitle>Lorem Ipsum</SectionTitle>

          <div className="mt-16">
            {}

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <h3 className="text-2xl font-bold mb-6 text-[#f5f5f5]">Lorem Ipsum Dolor</h3>
              <p className="text-[#aaa] mb-6 leading-relaxed">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in dui mauris. Vivamus hendrerit arcu
                sed erat molestie vehicula. Sed auctor neque eu tellus rhoncus ut eleifend nibh porttitor.
              </p>
              <p className="text-[#aaa] mb-8 leading-relaxed">
                Ut non enim eleifend felis pretium feugiat. Vivamus quis mi. Phasellus a est. Phasellus magna. In hac
                habitasse platea dictumst. Curabitur at lacus ac velit ornare lobortis.
              </p>

              <div className="grid grid-cols-2 gap-8 mb-8">
                <div>
                  <h4 className="text-teal-500 font-medium mb-3">Lorem Ipsum</h4>
                  <div className="space-y-4">
                    <div className="hover-card p-3 rounded-lg bg-[#111]/50">
                      <div className="text-[#f5f5f5] font-medium">Dolor Sit Amet</div>
                      <div className="text-[#aaa] text-sm">Consectetur adipiscing elit</div>
                    </div>
                    <div className="hover-card p-3 rounded-lg bg-[#111]/50">
                      <div className="text-[#f5f5f5] font-medium">Nullam In Dui</div>
                      <div className="text-[#aaa] text-sm">Mauris vivamus hendrerit</div>
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="text-teal-500 font-medium mb-3">Dolor Sit</h4>
                  <div className="space-y-4">
                    <div className="hover-card p-3 rounded-lg bg-[#111]/50">
                      <div className="text-[#f5f5f5] font-medium">Consectetur Adipiscing</div>
                      <div className="text-[#aaa] text-sm">Elit nullam in dui mauris</div>
                    </div>
                    <div className="hover-card p-3 rounded-lg bg-[#111]/50">
                      <div className="text-[#f5f5f5] font-medium">Vivamus Hendrerit</div>
                      <div className="text-[#aaa] text-sm">Arcu sed erat molestie</div>
                    </div>
                  </div>
                </div>
              </div>

              <Button
                className="bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-600 hover:to-emerald-600 text-[#0a0a0a] rounded-md px-6 group"
                onClick={() => scrollToSection("contact")}
              >
                <Mail className="mr-2 h-4 w-4" /> Lorem Ipsum
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      {}
      <section id="personal" ref={sectionRefs.personal} className="py-24 bg-[#0a0a0a]">
        <div className="container mx-auto px-6">
          <SectionTitle>Lorem Ipsum</SectionTitle>

          <div className="mt-16 grid lg:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <h3 className="text-2xl font-bold mb-6 text-[#f5f5f5]">Dolor Sit Amet</h3>
              <div className="space-y-4 text-[#aaa] leading-relaxed">
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in dui mauris. Vivamus hendrerit arcu
                  sed erat molestie vehicula. Sed auctor neque eu tellus rhoncus ut eleifend nibh porttitor.
                </p>
                <p>
                  Ut non enim eleifend felis pretium feugiat. Vivamus quis mi. Phasellus a est. Phasellus magna. In hac
                  habitasse platea dictumst. Curabitur at lacus ac velit ornare lobortis.
                </p>
                <p>
                  Fusce fermentum. Nullam cursus lacinia erat. Praesent blandit laoreet nibh. Fusce convallis metus id
                  felis luctus adipiscing. Pellentesque egestas, neque sit amet convallis pulvinar.
                </p>
              </div>

              <div className="mt-10">
                <h4 className="text-xl font-medium mb-4 text-[#f5f5f5]">Consectetur Adipiscing</h4>
                <div className="grid grid-cols-1 xs:grid-cols-2 gap-4">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="flex items-center gap-2 sm:gap-3 bg-[#111] border border-[#222] rounded-lg p-3 sm:p-4 hover:border-teal-500/30 transition-colors hover-card"
                  >
                    <div className="bg-teal-500/10 p-1.5 sm:p-2 rounded-md flex-shrink-0">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-teal-500 sm:h-5 sm:w-5 h-4 w-4"
                      >
                        <path d="m12 8-9.04 9.06a2.82 2.82 0 1 0 3.98 3.98L16 12"></path>
                        <circle cx="17" cy="7" r="5"></circle>
                      </svg>
                    </div>
                    <span className="text-[#f5f5f5] text-sm sm:text-base truncate">Lorem</span>
                  </motion.div>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="flex items-center gap-2 sm:gap-3 bg-[#111] border border-[#222] rounded-lg p-3 sm:p-4 hover:border-teal-500/30 transition-colors hover-card"
                  >
                    <div className="bg-teal-500/10 p-1.5 sm:p-2 rounded-md flex-shrink-0">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-teal-500 sm:h-5 sm:w-5 h-4 w-4"
                      >
                        <path d="M2 3h20"></path>
                        <path d="M21 3v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V3"></path>
                        <path d="m7 21 5-5 5 5"></path>
                      </svg>
                    </div>
                    <span className="text-[#f5f5f5] text-sm sm:text-base truncate">Ipsum</span>
                  </motion.div>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="flex items-center gap-2 sm:gap-3 bg-[#111] border border-[#222] rounded-lg p-3 sm:p-4 hover:border-teal-500/30 transition-colors hover-card"
                  >
                    <div className="bg-teal-500/10 p-1.5 sm:p-2 rounded-md flex-shrink-0">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-teal-500 sm:h-5 sm:w-5 h-4 w-4"
                      >
                        <path d="M9 18V5l12-2v13"></path>
                        <circle cx="6" cy="18" r="3"></circle>
                        <circle cx="18" cy="16" r="3"></circle>
                      </svg>
                    </div>
                    <span className="text-[#f5f5f5] text-sm sm:text-base truncate">Dolor</span>
                  </motion.div>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="flex items-center gap-2 sm:gap-3 bg-[#111] border border-[#222] rounded-lg p-3 sm:p-4 hover:border-teal-500/30 transition-colors hover-card"
                  >
                    <div className="bg-teal-500/10 p-1.5 sm:p-2 rounded-md flex-shrink-0">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-teal-500 sm:h-5 sm:w-5 h-4 w-4"
                      >
                        <path d="M18 8h1a4 4 0 0 1 0 8h-1"></path>
                        <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"></path>
                        <line x1="6" y1="1" x2="6" y2="4"></line>
                        <line x1="10" y1="1" x2="10" y2="4"></line>
                        <line x1="14" y1="1" x2="14" y2="4"></line>
                      </svg>
                    </div>
                    <span className="text-[#f5f5f5] text-sm sm:text-base truncate">Sit</span>
                  </motion.div>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="flex items-center gap-2 sm:gap-3 bg-[#111] border border-[#222] rounded-lg p-3 sm:p-4 hover:border-teal-500/30 transition-colors hover-card"
                  >
                    <div className="bg-teal-500/10 p-1.5 sm:p-2 rounded-md flex-shrink-0">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-teal-500 sm:h-5 sm:w-5 h-4 w-4"
                      >
                        <path d="m21 10-5-5-2 2-9-9-4 4 9 9-2 2 5 5c1 1 2 1 3 0l5-5c1-1 1-2 0-3Z"></path>
                        <path d="M7.5 12.5 11 16"></path>
                        <path d="M11 7 9.5 5.5"></path>
                        <path d="M14 10 12.5 8.5"></path>
                      </svg>
                    </div>
                    <span className="text-[#f5f5f5] text-sm sm:text-base truncate">Amet</span>
                  </motion.div>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="flex items-center gap-2 sm:gap-3 bg-[#111] border border-[#222] rounded-lg p-3 sm:p-4 hover:border-teal-500/30 transition-colors hover-card"
                  >
                    <div className="bg-teal-500/10 p-1.5 sm:p-2 rounded-md flex-shrink-0">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-teal-500 sm:h-5 sm:w-5 h-4 w-4"
                      >
                        <circle cx="12" cy="12" r="10"></circle>
                        <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"></path>
                        <path d="M2 12h20"></path>
                      </svg>
                    </div>
                    <span className="text-[#f5f5f5] text-sm sm:text-base truncate">Consectetur</span>
                  </motion.div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="space-y-10"
            >
              <div>
                <h4 className="text-xl font-medium mb-6 text-[#f5f5f5]">Adipiscing Elit</h4>
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="bg-[#111] border border-[#222] rounded-lg p-6 hover:border-teal-500/30 transition-colors hover-card"
                >
                  <div className="rounded-lg overflow-hidden border border-[#222] shadow-md bg-[#111] p-[1px]">
                    <iframe
                      src="https://open.spotify.com/embed/playlist/37i9dQZF1DXcBWIGoYBM5M"
                      width="100%"
                      height="380"
                      frameBorder="0"
                      allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                      className="bg-[#111] rounded-lg"
                      style={{ borderRadius: "8px", border: "none" }}
                    ></iframe>
                  </div>
                </motion.div>
              </div>

              <div>
                <h4 className="text-xl font-medium mb-6 text-[#f5f5f5]">Nullam In Dui</h4>
                <div className="space-y-4">
                  <motion.div
                    whileHover={{ scale: 1.02, x: 5 }}
                    className="bg-[#111] border border-[#222] rounded-lg p-5 hover:border-teal-500/30 transition-colors hover-card"
                  >
                    <div className="flex justify-between items-center">
                      <span className="text-[#aaa]">Lorem</span>
                      <span className="text-[#f5f5f5] font-medium">Ipsum</span>
                    </div>
                  </motion.div>
                  <motion.div
                    whileHover={{ scale: 1.02, x: 5 }}
                    className="bg-[#111] border border-[#222] rounded-lg p-5 hover:border-teal-500/30 transition-colors hover-card"
                  >
                    <div className="flex justify-between items-center">
                      <span className="text-[#aaa]">Dolor</span>
                      <span className="text-[#f5f5f5] font-medium">Sit Amet</span>
                    </div>
                  </motion.div>
                  <motion.div
                    whileHover={{ scale: 1.02, x: 5 }}
                    className="bg-[#111] border border-[#222] rounded-lg p-5 hover:border-teal-500/30 transition-colors hover-card"
                  >
                    <div className="flex justify-between items-center">
                      <span className="text-[#aaa]">Consectetur</span>
                      <span className="text-[#f5f5f5] font-medium">Adipiscing</span>
                    </div>
                  </motion.div>
                  <motion.div
                    whileHover={{ scale: 1.02, x: 5 }}
                    className="bg-[#111] border border-[#222] rounded-lg p-5 hover:border-teal-500/30 transition-colors hover-card"
                  >
                    <div className="flex justify-between items-center">
                      <span className="text-[#aaa]">Elit</span>
                      <span className="text-[#f5f5f5] font-medium">"Nullam in dui mauris"</span>
                    </div>
                  </motion.div>
                </div>
              </div>

              <div>
                <h4 className="text-xl font-medium mb-6 text-[#f5f5f5]">Vivamus Hendrerit</h4>
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="bg-[#111] border border-[#222] rounded-lg p-6 hover:border-teal-500/30 transition-colors hover-card"
                >
                  <div className="flex gap-6">
                    <motion.div
                      className="relative w-24 h-36 flex-shrink-0"
                      animate={{ rotate: [-3, 0, -3] }}
                      transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
                    >
                      <div className="absolute inset-0 bg-gradient-to-br from-teal-500/20 to-emerald-500/10 rounded-md -rotate-3"></div>
                      <div className="absolute inset-0 bg-[#0a0a0a] rounded-md border border-[#333] overflow-hidden rotate-3">
                        <Image
                          src="https://i.ibb.co/G3NvLPF/1253525.png"
                          alt="Lorem ipsum"
                          fill
                          className="object-cover"
                        />
                      </div>
                    </motion.div>
                    <div>
                      <h5 className="text-[#f5f5f5] font-medium">Lorem Ipsum Dolor</h5>
                      <p className="text-[#aaa] text-sm">Sit Amet 2023</p>
                      <p className="text-[#aaa] text-sm mt-2">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in dui mauris. Vivamus hendrerit
                        arcu sed erat molestie vehicula.
                      </p>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {}
      <section id="work" ref={sectionRefs.work} className="py-24 bg-[#0a0a0a]">
        <div className="container mx-auto px-6">
          <SectionTitle>Lorem Ipsum</SectionTitle>

          <div className="mt-16 space-y-24">
            {projects.slice(0, showAllProjects ? projects.length : 3).map((project, index) => (
              <ProjectCard key={index} project={project} index={index} />
            ))}
          </div>

          {projects.length > 3 && (
            <div className="mt-16 text-center">
              <Button
                variant="outline"
                className="border-[#333] text-[#f5f5f5] hover:bg-[#111] hover:border-[#444] rounded-md px-8 group"
                onClick={() => setShowAllProjects(!showAllProjects)}
              >
                {showAllProjects ? "Show Less" : "Show More"}
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </div>
          )}
        </div>
      </section>

      {}
      <section id="expertise" ref={sectionRefs.expertise} className="py-24 bg-[#0f0f0f]">
        <div className="container mx-auto px-6">
          <SectionTitle>Lorem Ipsum</SectionTitle>

          <Tabs defaultValue="design" className="mt-16">
            <TabsList className="grid grid-cols-3 max-w-md mx-auto bg-[#111] p-1 border border-[#222] rounded-lg">
              <TabsTrigger
                value="design"
                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-teal-500 data-[state=active]:to-emerald-500 data-[state=active]:text-[#0a0a0a] rounded-md"
              >
                Lorem
              </TabsTrigger>
              <TabsTrigger
                value="development"
                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-teal-500 data-[state=active]:to-emerald-500 data-[state=active]:text-[#0a0a0a] rounded-md"
              >
                Ipsum
              </TabsTrigger>
              <TabsTrigger
                value="strategy"
                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-teal-500 data-[state=active]:to-emerald-500 data-[state=active]:text-[#0a0a0a] rounded-md"
              >
                Dolor
              </TabsTrigger>
            </TabsList>

            <TabsContent value="design" className="mt-12">
              <div className="grid md:grid-cols-3 gap-8">
                {[
                  {
                    title: "Lorem Ipsum",
                    description:
                      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in dui mauris. Vivamus hendrerit arcu sed erat molestie vehicula.",
                  },
                  {
                    title: "Dolor Sit Amet",
                    description:
                      "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam.",
                  },
                  {
                    title: "Consectetur Adipiscing",
                    description:
                      "Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur.",
                  },
                  {
                    title: "Elit Nullam",
                    description:
                      "Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat.",
                  },
                  {
                    title: "In Dui Mauris",
                    description:
                      "Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit.",
                  },
                  {
                    title: "Vivamus Hendrerit",
                    description:
                      "Sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem.",
                  },
                ].map((skill, index) => (
                  <ExpertiseCard key={index} skill={skill} index={index} />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="development" className="mt-12">
              <div className="grid md:grid-cols-3 gap-8">
                {[
                  {
                    title: "Arcu Sed Erat",
                    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in dui mauris.",
                  },
                  {
                    title: "Molestie Vehicula",
                    description:
                      "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.",
                  },
                  {
                    title: "Sed Auctor Neque",
                    description:
                      "Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam.",
                  },
                  {
                    title: "Eu Tellus Rhoncus",
                    description:
                      "Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur.",
                  },
                  {
                    title: "Ut Eleifend Nibh",
                    description:
                      "Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit.",
                  },
                  {
                    title: "Porttitor Ut Non",
                    description:
                      "Sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem.",
                  },
                ].map((skill, index) => (
                  <ExpertiseCard key={index} skill={skill} index={index} />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="strategy" className="mt-12">
              <div className="grid md:grid-cols-3 gap-8">
                {[
                  {
                    title: "Enim Eleifend",
                    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in dui mauris.",
                  },
                  {
                    title: "Felis Pretium",
                    description:
                      "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.",
                  },
                  {
                    title: "Feugiat Vivamus",
                    description:
                      "Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam.",
                  },
                  {
                    title: "Quis Mi Phasellus",
                    description:
                      "Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur.",
                  },
                  {
                    title: "A Est Phasellus",
                    description:
                      "Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit.",
                  },
                  {
                    title: "Magna In Hac",
                    description:
                      "Sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem.",
                  },
                ].map((skill, index) => (
                  <ExpertiseCard key={index} skill={skill} index={index} />
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {}
      <section className="py-16 md:py-24 bg-[#0a0a0a]">
        <div className="container mx-auto px-4 sm:px-6">
          <SectionTitle>Lorem Ipsum</SectionTitle>

          <div className="flex flex-col space-y-6 md:space-y-8 mt-12 md:mt-16 max-w-4xl mx-auto">
            {[
              {
                quote: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in dui mauris.",
                name: "Lorem Ipsum",
                title: "Dolor, Sit Amet",
                image: "https://files.catbox.moe/y4qgg2.webp",
                position: "left",
              },
              {
                quote: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque.",
                name: "Consectetur Adipiscing",
                title: "Elit, Nullam In",
                image: "https://files.catbox.moe/13ar89.webp",
                position: "right",
              },
              {
                quote: "Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam.",
                name: "Dui Mauris",
                title: "Vivamus, Hendrerit",
                image: "https://files.catbox.moe/3gtqwc.webp",
                position: "left",
              },
            ].map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                viewport={{ once: true, margin: "-50px" }}
                className={`flex ${testimonial.position === "right" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`flex max-w-xs sm:max-w-sm md:max-w-md ${
                    testimonial.position === "right" ? "flex-row-reverse" : "flex-row"
                  }`}
                >
                  <div className="flex-shrink-0 self-end">
                    <div className="relative w-10 h-10 sm:w-12 sm:h-12 rounded-full overflow-hidden border-2 border-teal-500/30">
                      <Image
                        src={testimonial.image || "/placeholder.svg"}
                        alt={testimonial.name}
                        fill
                        sizes="48px"
                        className="object-cover"
                      />
                    </div>
                  </div>
                  <div
                    className={`${
                      testimonial.position === "right" ? "mr-3 sm:mr-4" : "ml-3 sm:ml-4"
                    } bg-[#111] border border-[#222] rounded-lg p-3 sm:p-4 hover:border-teal-500/30 transition-colors hover-card`}
                  >
                    <p className="text-[#aaa] text-sm sm:text-base mb-3">{testimonial.quote}</p>
                    <div className="flex flex-col">
                      <span className="text-[#f5f5f5] font-medium text-sm sm:text-base">{testimonial.name}</span>
                      <span className="text-[#aaa] text-xs sm:text-sm">{testimonial.title}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {}
      <section id="contact" ref={sectionRefs.contact} className="py-24 bg-[#0f0f0f]">
        <div className="container mx-auto px-6">
          <SectionTitle>Lorem Ipsum</SectionTitle>

          <div className="grid md:grid-cols-2 gap-16 mt-16">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <h3 className="text-2xl font-bold mb-6 text-[#f5f5f5]">Dolor Sit Amet</h3>
              <p className="text-[#aaa] mb-8 leading-relaxed">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in dui mauris. Vivamus hendrerit arcu
                sed erat molestie vehicula.
              </p>

              <div className="space-y-6 mb-8">
                <motion.div
                  whileHover={{ x: 5 }}
                  className="flex items-start gap-4 p-3 rounded-lg hover:bg-[#111]/50 transition-colors"
                >
                  <div className="bg-teal-500/10 p-3 rounded-lg">
                    <Mail className="h-6 w-6 text-teal-500" />
                  </div>
                  <div>
                    <h4 className="font-medium text-[#f5f5f5]">Lorem</h4>
                    <a href="mailto:lorem@ipsum.com" className="text-[#aaa] hover:text-teal-500 transition-colors">
                      lorem@ipsum.com
                    </a>
                  </div>
                </motion.div>
                <motion.div
                  whileHover={{ x: 5 }}
                  className="flex items-start gap-4 p-3 rounded-lg hover:bg-[#111]/50 transition-colors"
                >
                  <div className="bg-teal-500/10 p-3 rounded-lg">
                    <Github className="h-6 w-6 text-teal-500" />
                  </div>
                  <div>
                    <h4 className="font-medium text-[#f5f5f5]">Ipsum</h4>
                    <a
                      href="https://github.com/username"
                      target="_blank"
                      className="text-[#aaa] hover:text-teal-500 transition-colors"
                      rel="noreferrer"
                    >
                      github.com/lorem
                    </a>
                  </div>
                </motion.div>
                <motion.div
                  whileHover={{ x: 5 }}
                  className="flex items-start gap-4 p-3 rounded-lg hover:bg-[#111]/50 transition-colors"
                >
                  <div className="bg-teal-500/10 p-3 rounded-lg">
                    <Linkedin className="h-6 w-6 text-teal-500" />
                  </div>
                  <div>
                    <h4 className="font-medium text-[#f5f5f5]">Dolor</h4>
                    <a
                      href="https://linkedin.com/in/username"
                      target="_blank"
                      className="text-[#aaa] hover:text-teal-500 transition-colors"
                      rel="noreferrer"
                    >
                      linkedin.com/in/ipsum
                    </a>
                  </div>
                </motion.div>
              </div>

              <motion.div
                whileHover={{ scale: 1.02 }}
                className="bg-[#111] border border-[#222] rounded-lg p-6 hover:border-teal-500/30 transition-colors hover-card"
              >
                <h4 className="font-medium text-[#f5f5f5] mb-2">Sit Amet</h4>
                <p className="text-[#aaa]">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in dui mauris. Vivamus hendrerit arcu
                  sed erat molestie vehicula.
                </p>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <form className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-medium text-[#aaa]">
                      Lorem
                    </label>
                    <input
                      id="name"
                      className="w-full px-4 py-3 bg-[#111] border border-[#222] rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 text-[#f5f5f5] transition-all"
                      placeholder="Lorem ipsum"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium text-[#aaa]">
                      Ipsum
                    </label>
                    <input
                      id="email"
                      type="email"
                      className="w-full px-4 py-3 bg-[#111] border border-[#222] rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 text-[#f5f5f5] transition-all"
                      placeholder="Dolor sit"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label htmlFor="subject" className="text-sm font-medium text-[#aaa]">
                    Dolor
                  </label>
                  <input
                    id="subject"
                    className="w-full px-4 py-3 bg-[#111] border border-[#222] rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 text-[#f5f5f5] transition-all"
                    placeholder="Sit amet"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="message" className="text-sm font-medium text-[#aaa]">
                    Amet
                  </label>
                  <textarea
                    id="message"
                    rows={5}
                    className="w-full px-4 py-3 bg-[#111] border border-[#222] rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 text-[#f5f5f5] resize-none transition-all"
                    placeholder="Consectetur adipiscing"
                  ></textarea>
                </div>
                <Button className="w-full bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-600 hover:to-emerald-600 text-[#0a0a0a] rounded-md group">
                  <Send className="mr-2 h-4 w-4 transition-transform group-hover:translate-x-1" /> Lorem Ipsum
                </Button>
              </form>
            </motion.div>
          </div>
        </div>
      </section>

      {}
      <footer className="py-12 border-t border-[#222] bg-[#0a0a0a]">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0">
              <Link href="#home" className="text-xl font-medium tracking-tight font-poppins">
                <span className="text-gradient">Lorem</span>
                <span className="text-[#f5f5f5]">.</span>
              </Link>
            </div>
            <div className="flex gap-6">
              {socialProfiles.map((profile) => (
                <Link
                  key={profile.name}
                  href={profile.url}
                  target="_blank"
                  className="text-[#aaa] hover:text-teal-500 transition-colors social-icon"
                  aria-label={profile.name}
                >
                  {profile.icon}
                  <span className="sr-only">{profile.name}</span>
                </Link>
              ))}
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-[#222] text-center">
            <p className="text-[#aaa] text-sm">© {new Date().getFullYear()} Lorem. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}


function getSectionIcon(section: string) {
  switch (section) {
    case "home":
      return <User className="h-5 w-5 text-teal-500" />
    case "about":
      return <User className="h-5 w-5 text-teal-500" />
    case "personal":
      return <Heart className="h-5 w-5 text-teal-500" />
    case "work":
      return <Briefcase className="h-5 w-5 text-teal-500" />
    case "expertise":
      return <Code className="h-5 w-5 text-teal-500" />
    case "contact":
      return <Mail className="h-5 w-5 text-teal-500" />
    default:
      return null
  }
}


function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <div className="text-center">
      <h2 className="text-3xl md:text-4xl font-bold inline-block relative text-[#f5f5f5]">
        {children}
        <motion.span
          className="absolute -bottom-3 left-1/2 -translate-x-1/2 h-1 bg-gradient-to-r from-teal-500 to-emerald-500 rounded-full"
          initial={{ width: 0 }}
          whileInView={{ width: "4rem" }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        ></motion.span>
      </h2>
    </div>
  )
}

function ProjectCard({ project, index }: { project: any; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="group"
    >
      <div className="grid md:grid-cols-2 gap-8 items-center">
        <div className={`order-2 ${index % 2 === 0 ? "md:order-2" : "md:order-1"}`}>
          <h3 className="text-2xl font-bold mb-4 text-[#f5f5f5]">{project.title}</h3>
          <p className="text-[#aaa] mb-6 leading-relaxed">{project.description}</p>
          <div className="flex flex-wrap gap-2 mb-6">
            {project.tags.map((tag: string) => (
              <Badge
                key={tag}
                variant="outline"
                className="px-3 py-1 bg-[#111] text-[#aaa] text-sm rounded-md border border-[#222]"
              >
                {tag}
              </Badge>
            ))}
          </div>
          <Button className="bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-600 hover:to-emerald-600 text-[#0a0a0a] rounded-md group">
            Lorem Ipsum <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Button>
        </div>

        <div className={`order-1 ${index % 2 === 0 ? "md:order-1" : "md:order-2"}`}>
          <motion.div
            className="relative overflow-hidden rounded-lg border border-[#222] aspect-[16/9] group-hover:border-teal-500/30 transition-colors"
            whileHover={{ scale: 1.02 }}
          >
            <Image
              src={project.image || "/placeholder.svg"}
              alt={project.title}
              fill
              loading="lazy"
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] to-transparent opacity-60"></div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  )
}

function ExpertiseCard({ skill, index }: { skill: any; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      viewport={{ once: true, margin: "-50px" }}
      className="bg-[#111] border border-[#222] rounded-lg p-4 sm:p-6 hover:border-teal-500/30 transition-colors hover-card"
      whileHover={{ y: -3, transition: { duration: 0.2 } }}
    >
      <h3 className="text-xl font-medium text-[#f5f5f5] mb-3">{skill.title}</h3>
      <p className="text-[#aaa] text-sm leading-relaxed">{skill.description}</p>
    </motion.div>
  )
}

