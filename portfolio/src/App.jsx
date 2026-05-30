import React, { useState, useEffect } from 'react';
import { FaLinkedin, FaGithub, FaExternalLinkAlt } from "react-icons/fa";
import { FaAward } from "react-icons/fa6";
import { Mail, Menu, X, GraduationCap, BookOpen, ExternalLink, FileText } from 'lucide-react';
import { ref, runTransaction } from "firebase/database";
import { db } from "./firebase";

// Images
import photo from './assets/photo.jpg';
import mitLogo from './assets/MIT-WPU.png';
import iitbLogo from './assets/IITB.png';
import hinweisLogo from './assets/Hinweis.png';
import edtechLogo from './assets/EdTech.png';
import nptelLogo from './assets/NPTEL.jpeg';
import googleLogo from './assets/Google.png';

// PDFs & Documents
import resumePdf from './assets/resume.pdf'; 
import internshipLetter from './assets/Internship_Completion_Letter.pdf';
import mlipPdf from './assets/MLIP.jpg';
import t4ePdf from './assets/T4E.pdf';
import nptelIntCert from './assets/NPTELINT.jpg';
import iccePdf from './assets/ICCE.pdf';
import gijetPdf from './assets/GIJET.pdf';

// Import the Game Component
import FlappyGame from './FlappyGame';

const Portfolio = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  
  // State for the Easter Egg Game
  const [showGame, setShowGame] = useState(false);

  // Consolidated Skills List
  const skills = [
    "C", "C++", "Python", "SQL", 
    "MongoDB", "Express.js", "React.js", "Node.js", "HTML", "CSS", 
    "REST APIs", "JWT", "Jest", "Docker", "Flask", "AWS", 
    "NumPy", "SciPy", "PyTorch", "TensorFlow", "Scikit-learn", "Pandas", 
    "RAPIDS", "cuDF", "cuML", "cuDNN"
  ];

  // --- WEBSITE VISIT COUNTER ---
  useEffect(() => {
    // Check if we already counted this user in the current session
    const isCounted = sessionStorage.getItem("visitCounted");

    if (!isCounted) {
      // Create a reference to 'siteStats/totalVisits'
      const visitsRef = ref(db, 'siteStats/totalVisits');

      // Use runTransaction to safely increment the counter
      runTransaction(visitsRef, (currentValue) => {
        return (currentValue || 0) + 1;
      })
      .then(() => {
        // Mark session as counted
        sessionStorage.setItem("visitCounted", "true");
      })
      .catch((error) => {
        console.error("Error updating visit count:", error);
      });
    }
  }, []);

  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
    window.scrollTo(0, 0);
  }, []);

  // Handle scroll for navbar styling
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id) => {
    setIsMenuOpen(false);
    document.getElementById(id).scrollIntoView({ behavior: 'smooth' });
  };

  const NavLink = ({ to, label }) => (
    <button 
      onClick={() => scrollToSection(to)} 
      className="block w-full text-left md:inline-block md:w-auto px-4 py-2 text-[#3e2c26] hover:text-[#8c6b5d] font-medium transition-colors"
    >
      {label}
    </button>
  );

  return (
    <div className="min-h-screen bg-[#f0ece6] text-[#3e2c26] font-sans selection:bg-[#a68a76] selection:text-white">
      
      {/* FULL WIDTH NAVBAR */}
      <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled || isMenuOpen 
          ? 'bg-[#f0ece6] shadow-md py-3' 
          : 'bg-transparent py-5'
      }`}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center md:justify-end items-center h-10">
            
            {/* Desktop Menu */}
            <div className="hidden md:flex space-x-8 items-center">
              <NavLink to="about" label="About" />
              <NavLink to="education" label="Education" />
              <NavLink to="experience" label="Experience" />
              <NavLink to="projects" label="Projects" />
              <NavLink to="certifications" label="Certifications" />
              <NavLink to="contact" label="Links" />
            </div>

            {/* Mobile Menu Button */}
            <div className="absolute left-4 md:hidden">
              <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="p-2 text-[#3e2c26]">
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Dropdown */}
        {isMenuOpen && (
          <div className="md:hidden bg-[#f0ece6] border-t border-[#3e2c26]/10 px-4 pb-4">
            <NavLink to="about" label="About" />
            <NavLink to="education" label="Education" />
            <NavLink to="experience" label="Experience" />
            <NavLink to="projects" label="Projects" />
            <NavLink to="certifications" label="Certifications" />
            <NavLink to="contact" label="Links" />
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section id="about" className="relative pt-28 pb-20 lg:pt-36 lg:pb-32 px-4">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8 items-center">
          
          {/* Text Content */}
          <div className="order-2 md:order-1 md:pl-8 lg:pl-12">
            <h1 
              onClick={() => setShowGame(true)}
              className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 leading-tight text-[#3e2c26] select-none"
            >
              Saket <br/> Sontakke
            </h1>
            <p className="text-xl text-[#5c4239] mb-8 leading-relaxed text-justify">
              Undergraduate student with a strong academic background and a keen interest in multidisciplinary projects. 
              Proficient in Python and C++, passionate about Parallel Processing, Machine Learning, and experienced in web development, 
              enabling effective contributions to both AI-ML and full-stack projects.
            </p>
            <div className="flex flex-wrap gap-4">
              <a 
                href={resumePdf} 
                target="_blank" 
                rel="noreferrer" 
                className="flex items-center gap-2 border-2 border-[#3e2c26] px-6 py-3 rounded-lg font-medium hover:bg-[#3e2c26] hover:text-[#f0ece6] transition-all"
              >
                <FileText size={20} /> Resume
              </a>
              <a href="https://github.com/saket-sontakke" target="_blank" rel="noreferrer" className="flex items-center gap-2 border-2 border-[#3e2c26] px-6 py-3 rounded-lg font-medium hover:bg-[#3e2c26] hover:text-[#f0ece6] transition-all">
                <FaGithub size={20} /> GitHub
              </a>
            </div>
          </div>
          
          {/* Photo Container */}
          <div className="order-1 md:order-2 flex justify-center md:justify-end mb-8 md:mb-0 lg:pr-24 md:pr-12">
            <div className="relative w-64 h-64 md:w-80 md:h-80">
              <div className="absolute inset-0 border-2 border-[#8c6b5d] rounded-2xl transform translate-x-4 translate-y-4"></div>
              <div className="absolute inset-0 bg-[#e6ded5] rounded-2xl overflow-hidden shadow-xl">
                <img 
                  src={photo} 
                  alt="Saket Sontakke" 
                  className="object-cover w-full h-full"
                />
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Education Section */}
      <section id="education" className="scroll-mt-16 py-12 md:py-14 md:pb-20 pb-18 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 flex items-center gap-3 text-[#3e2c26]">
              <GraduationCap className="text-[#8c6b5d]" size={32} /> Education
          </h2>
          
          <div className="bg-[#f0ece6] p-8 rounded-2xl border border-[#dcd6ce] hover:border-[#8c6b5d] transition-colors">
            <div className="flex flex-col md:flex-row gap-6 items-start">
              
              <div className="flex-shrink-0 bg-white p-2 rounded-lg border border-[#dcd6ce]">
                <img src={mitLogo} alt="MIT-WPU Logo" className="h-16 w-auto object-contain" />
              </div>

              <div className="flex-grow w-full">
                <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-2">
                  <div>
                    <h3 className="text-xl font-bold text-[#3e2c26]">Bachelor of Technology in CSE</h3>
                    <p className="text-[#5c4239] font-medium">Dr. Vishwanath Karad MIT World Peace University</p>
                  </div>
                  <div className="mt-2 md:mt-0 text-right">
                    <span className="block text-[#8c6b5d] font-mono font-bold">Aug 2022 - Present</span>
                    <span className="block text-sm text-[#5c4239] font-bold">CGPA: 8.55</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Experience Section
      <section id="experience" className="py-24 px-4 bg-[#e6ded5]">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-16 flex items-center gap-3">
            <span className="w-12 h-1 bg-[#8c6b5d]"></span> Experience
          </h2>
          
          <div className="relative border-l-2 border-[#8c6b5d] ml-4 md:ml-10 pl-8 md:pl-12 pb-12">
            <span className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-[#3e2c26] border-2 border-[#f0ece6]"></span>
            
            <div className="flex flex-col md:flex-row gap-6 items-start">
               <div className="hidden md:block flex-shrink-0 bg-white p-2 rounded-lg border border-[#dcd6ce] shadow-sm">
                 <img src={iitbLogo} alt="IIT Bombay Logo" className="h-16 w-auto object-contain" />
               </div>

               <div className="flex-grow w-full">
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between mb-4">
                    
                    <div>
                        <h3 className="text-2xl font-bold text-[#3e2c26]">Research Intern</h3>
                        <div className="text-lg font-semibold text-[#5c4239] mt-1">
                             Centre for Educational Technology, IIT Bombay
                        </div>
                    </div>

                    <div className="flex flex-col sm:items-end mt-2 sm:mt-0 text-left sm:text-right">
                        <span className="text-[#8c6b5d] font-mono font-bold block">
                            June 2025 - Dec 2025
                        </span>
                        
                        <a 
                            href={internshipLetter}
                            target="_blank" 
                            rel="noreferrer"
                            className="group inline-flex items-center gap-1.5 text-xs font-bold text-[#3e2c26] hover:text-[#8c6b5d] mt-1.5 transition-colors tracking-wide underline underline-offset-2"
                        >
                            View Completion Letter
                            <ExternalLink size={12} className="group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform duration-300" />
                        </a>
                    </div>
                  </div>
                  
                  <div className="md:hidden mb-4 bg-white inline-block p-2 rounded-lg border border-[#dcd6ce]">
                      <img src={iitbLogo} alt="IIT Bombay Logo" className="h-12 w-auto object-contain" />
                  </div>

                  <ul className="space-y-3 text-[#5c4239] list-disc ml-4 leading-relaxed text-justify">
                    <li>Developed "QUAiL", a web-based qualitative data analysis tool for textual data with integrated automated transcription.</li>
                    <li>Integrated quantitative statistical testing using Python/Flask microservices.</li>
                    <li>
                      Work published and presented at{' '}
                      <a 
                        href="https://icce2025.study.iitm.ac.in/" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="inline-flex items-baseline gap-1 font-bold text-[#3e2c26] hover:text-[#8c6b5d] underline underline-offset-2 transition-colors"
                      >
                        ICCE 2025
                        <ExternalLink size={10} className="self-center" />
                      </a>{' '}
                      and{' '}
                      <a 
                        href="https://sites.google.com/view/t4e2025" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="inline-flex items-baseline gap-1 font-bold text-[#3e2c26] hover:text-[#8c6b5d] underline underline-offset-2 transition-colors"
                      >
                        T4E 2025
                        <ExternalLink size={10} className="self-center" />
                      </a>
                      .
                    </li>
                  </ul>
               </div>
            </div>
          </div>
        </div>
      </section> */}

        {/* Experience Section */}
      <section id="experience" className="py-24 px-4 bg-[#e6ded5]">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-16 flex items-center gap-3">
            <span className="w-12 h-1 bg-[#8c6b5d]"></span> Experience
          </h2>
          
          <div className="relative border-l-2 border-[#8c6b5d] ml-4 md:ml-10 pl-8 md:pl-12 pb-12">
            <span className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-[#3e2c26] border-2 border-[#f0ece6]"></span>
            
            <div className="flex flex-col md:flex-row gap-6 items-start">
               {/* Internship Logo (Clickable) */}
               <a 
                 href={internshipLetter} 
                 target="_blank" 
                 rel="noreferrer" 
                 className="hidden md:block flex-shrink-0 bg-white p-2 rounded-lg border border-[#dcd6ce] shadow-sm hover:border-[#8c6b5d] hover:shadow-md transition-all cursor-pointer"
                 title="View Completion Letter"
               >
                 <img src={iitbLogo} alt="IIT Bombay Logo" className="h-16 w-auto object-contain" />
               </a>

               <div className="flex-grow w-full">
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between mb-4">
                    
                    {/* Left Side: Title (Clickable) */}
                    <div>
                        <a 
                          href={internshipLetter} 
                          target="_blank" 
                          rel="noreferrer" 
                          className="group block cursor-pointer"
                          title="View Completion Letter"
                        >
                            <h3 className="text-2xl font-bold text-[#3e2c26] group-hover:text-[#8c6b5d] transition-colors">Research Intern</h3>
                            <div className="text-lg font-semibold text-[#5c4239] group-hover:text-[#8c6b5d] mt-1 transition-colors">
                                 Centre for Educational Technology, IIT Bombay
                            </div>
                        </a>
                    </div>

                    {/* Right Side: Date & Subtle Badge Button */}
                    <div className="flex flex-col sm:items-end mt-3 sm:mt-0 text-left sm:text-right">
                        <span className="text-[#8c6b5d] font-mono font-bold block mb-2 sm:mb-1.5">
                            June 2025 - Dec 2025
                        </span>
                        
                        <a 
                            href={internshipLetter}
                            target="_blank" 
                            rel="noreferrer"
                            className="group inline-flex items-center gap-1.5 text-xs font-bold text-[#3e2c26] bg-[#8c6b5d]/10 border border-[#8c6b5d]/20 px-3 py-1.5 rounded-md hover:bg-[#8c6b5d] hover:text-[#f0ece6] transition-all"
                        >
                            <FileText size={14} className="group-hover:-translate-y-0.5 transition-transform" /> 
                            View Completion Letter
                        </a>
                    </div>
                  </div>
                  
                  {/* Mobile Logo View (Clickable) */}
                  <a 
                    href={internshipLetter} 
                    target="_blank" 
                    rel="noreferrer" 
                    className="md:hidden mb-4 bg-white inline-block p-2 rounded-lg border border-[#dcd6ce] hover:border-[#8c6b5d] transition-all cursor-pointer"
                  >
                      <img src={iitbLogo} alt="IIT Bombay Logo" className="h-12 w-auto object-contain" />
                  </a>

                  <ul className="space-y-3 text-[#5c4239] list-disc ml-4 leading-relaxed text-justify">
                    <li>
                      Collaborated with researchers at{' '}
                      <a 
                        href="https://edarts.online/about.html" 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="font-bold text-[#3e2c26] hover:text-[#8c6b5d] underline underline-offset-2 transition-colors"
                        title="Meet the team at EDART Labs!"
                      >
                        EDART Labs
                      </a>{' '}
                      to develop "QUAiL", a web-based qualitative data analysis tool for textual data with integrated automated transcription.
                    </li>
                    <li>Integrated quantitative statistical testing using Python/Flask microservices.</li>
                    <li>
                      Work published and presented at{' '}
                      <a 
                        href="https://icce2025.study.iitm.ac.in/" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="inline-flex items-baseline gap-1 font-bold text-[#3e2c26] hover:text-[#8c6b5d] underline underline-offset-2 transition-colors"
                      >
                        ICCE 2025
                        <ExternalLink size={10} className="self-center" />
                      </a>{' '}
                      and{' '}
                      <a 
                        href="https://sites.google.com/view/t4e2025" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="inline-flex items-baseline gap-1 font-bold text-[#3e2c26] hover:text-[#8c6b5d] underline underline-offset-2 transition-colors"
                      >
                        T4E 2025
                        <ExternalLink size={10} className="self-center" />
                      </a>
                      .
                    </li>
                  </ul>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-24 px-4 bg-[#f0ece6]">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-16 flex items-center gap-3">
            <span className="w-12 h-1 bg-[#8c6b5d]"></span> Featured Projects
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <ProjectCard 
              title="ThermalODE: A Physics-Informed Simulator for Multi-GPU HPC Clusters"
              tags={["HPC", "ODE", "Machine Learning", "Digital Twin"]}
              desc="An ODE-based physics-informed model trained on the MIT Supercloud Dataset to simulate node thermal behavior. Deployed as a digital twin within a JIT-compiled cluster simulator for testing scheduling policies via A/B testing."
              demoLink="https://thermal-ode.vercel.app/"
              repoLink="https://github.com/saket-sontakke/ThermalODE-A-Physics-Informed-Simulator-for-Multi-GPU-HPC-Clusters"
            />
            <ProjectCard 
              title="QUAiL: A Web-Based Qualitative Data Analysis Tool"
              tags={["React", "Node.js", "Flask", "MongoDB"]}
              desc="A comprehensive CAQDAS application built with the MERN stack and a Python microservice. It streamlines research workflows by integrating audio/text transcription, dynamic code management, data visualization, and quantitative validation via statistical tests into a single platform."
              demoLink="https://quail.edarts.online"
              repoLink="https://github.com/EDART-Labs/QUAiL"
            />
            <ProjectCard 
              title="Protein Secondary Structure Prediction"
              tags={["Python", "Deep Learning", "CNN", "BiLSTM"]}
              desc="Developed a hybrid Deep Learning architecture utilizing CNNs and BiLSTMs to capture local and long-range dependencies in amino acid sequences. Engineered a robust ETL pipeline to process over 125,000 protein sequences, achieving 88.99% secondary structure prediction accuracy."
              demoLink="https://saket-sontakke-pssp.onrender.com"
              repoLink="https://github.com/saket-sontakke/Protein-Secondary-Structure-Prediction-and-Data-Bank"
            />
            <ProjectCard 
              title="Higgs Boson Detection"
              tags={["RAPIDS", "cuML", "Neural Networks"]}
              desc="Signal-background classification on HEPMASS dataset (10M+ events). Achieved ROC AUC of 0.95 using GPU acceleration."
              repoLink="https://github.com/saket-sontakke/Signal-vs.-Background-Classification-in-Higgs-Boson-Detection"
            />
          </div>
        </div>
      </section>

      {/* Certifications Section */}
      <section id="certifications" className="py-20 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 flex items-center gap-3">
              <FaAward className="text-[#8c6b5d]" size={32} /> Certifications
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <CertificationCard 
              title="Certificate of Presentation at T4E 2025" 
              issuer="EdTech Society"
              code="T4E2025/200164/355"
              logo={edtechLogo}
              link={t4ePdf}
            />
             <CertificationCard 
              title="Certificate of Internship" 
              issuer="NPTEL"
              code="NPTELINT25827523353307"
              logo={nptelLogo}
              link={nptelIntCert}
            />
            <CertificationCard 
              title="Introduction to Machine Learning" 
              issuer="IIT Madras (NPTEL)"
              code="NPTEL24CS101S652004034"
              logo={nptelLogo}
              link="https://archive.nptel.ac.in/content/noc/NOC24/SEM2/Ecertificates/106/noc24-cs101/Course/NPTEL24CS101S65200403404323102.pdf"
            />
            <CertificationCard 
              title="Cloud Computing" 
              issuer="IIT Kharagpur (NPTEL)"
              code="NPTEL24CS118S952002286"
              logo={nptelLogo}
              link="https://archive.nptel.ac.in/content/noc/NOC24/SEM2/Ecertificates/106/noc24-cs118/Course/NPTEL24CS118S95200228604323102.pdf"
            />
            <CertificationCard 
              title="Presentation & Publication in MLIP-2025" 
              issuer="Hinweis Research"
              logo={hinweisLogo}
              link={mlipPdf}
            />
             <CertificationCard 
              title="Google AI Essentials" 
              issuer="Google"
              code="LYXG9HSUV9WK"
              logo={googleLogo}
              link="https://www.coursera.org/account/accomplishments/verify/LYXG9HSUV9WK"
            />
            <CertificationCard 
              title="Crash Course on Python" 
              issuer="Google"
              code="8KHPUKYCWAGA"
              logo={googleLogo}
              link="https://www.coursera.org/account/accomplishments/verify/8KHPUKYCWAGA"
            />
            <CertificationCard 
              title="Using Python to Interact with the Operating System" 
              issuer="Google"
              code="L9VWFFLED4C3"
              logo={googleLogo}
              link="https://www.coursera.org/account/accomplishments/verify/L9VWFFLED4C3"
            />
          </div>
        </div>
      </section>

      {/* Publications Section */}
      <section id="publications" className="py-24 px-4 bg-[#3e2c26] text-[#f0ece6]">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 flex items-center gap-3">
            <BookOpen className="text-[#8c6b5d]" /> Publications
          </h2>
          <div className="grid gap-6">
            
            {/* QUAiL Publication */}
            <div className="bg-white/5 backdrop-blur-sm p-8 rounded-2xl border border-white/10 hover:border-[#8c6b5d] hover:bg-white/10 transition-all transform hover:-translate-y-1">
              <h3 className="text-xl font-bold mb-3 leading-tight">
                QUAiL: A Web-Based Qualitative Analysis Tool for Textual Data
              </h3>
              <div className="text-[#dcd6ce] text-sm text-justify mb-6">
                International Conference on Computers in Education (ICCE2025) - GenAIED Workshop
              </div>
              <div className="flex flex-wrap gap-4">
                <a 
                  href={iccePdf} 
                  target="_blank" 
                  rel="noreferrer" 
                  className="flex items-center gap-2 text-sm font-medium border border-white/20 px-4 py-2 rounded-lg hover:bg-[#8c6b5d] hover:border-[#8c6b5d] transition-all"
                >
                  <FileText size={16} /> View PDF
                </a>
                <a 
                  href="https://library.apsce.net/index.php/ICCE/article/view/6049" 
                  target="_blank" 
                  rel="noreferrer" 
                  className="flex items-center gap-2 text-sm font-medium border border-white/20 px-4 py-2 rounded-lg hover:bg-[#8c6b5d] hover:border-[#8c6b5d] transition-all"
                >
                  <ExternalLink size={16} /> Visit Site
                </a>
              </div>
            </div>

            {/* PSSP Publication */}
            <div className="bg-white/5 backdrop-blur-sm p-8 rounded-2xl border border-white/10 hover:border-[#8c6b5d] hover:bg-white/10 transition-all transform hover:-translate-y-1">
              <h3 className="text-xl font-bold mb-3 leading-tight">
                Extensive Dataset-Driven Hybrid Neural Networks for Protein Secondary Structure Prediction
              </h3>
              <div className="text-[#dcd6ce] text-sm text-justify mb-6">
                Grenze International Journal of Engineering and Technology (GIJET-2025)
              </div>
              <div className="flex flex-wrap gap-4">
                <a 
                  href={gijetPdf} 
                  target="_blank" 
                  rel="noreferrer" 
                  className="flex items-center gap-2 text-sm font-medium border border-white/20 px-4 py-2 rounded-lg hover:bg-[#8c6b5d] hover:border-[#8c6b5d] transition-all"
                >
                  <FileText size={16} /> View PDF
                </a>
                <a 
                  href="https://thegrenze.com/index.php?display=page&view=journalabstract&absid=5860&id=8" 
                  target="_blank" 
                  rel="noreferrer" 
                  className="flex items-center gap-2 text-sm font-medium border border-white/20 px-4 py-2 rounded-lg hover:bg-[#8c6b5d] hover:border-[#8c6b5d] transition-all"
                >
                  <ExternalLink size={16} /> Visit Site
                </a>
              </div>
            </div>

          </div>
        </div>
      </section>

        {/* Contact & Footer */}
              <section id="contact" className="py-20 px-4 text-center bg-[#f0ece6]">
                <div className="max-w-3xl mx-auto">
                  <div className="flex flex-wrap justify-center gap-6 md:gap-8">
                    <SocialButton href="mailto:sontakkesaket9@gmail.com" icon={<Mail size={24} />} label="Email" />
                    <SocialButton href="https://linkedin.com/in/saket-sontakke" icon={<FaLinkedin size={24} />} label="LinkedIn" />
                    <SocialButton href="https://github.com/saket-sontakke" icon={<FaGithub size={24} />} label="GitHub" />
                    <SocialButton href="https://scholar.google.com/citations?user=1fGvTrUAAAAJ&hl=en" icon={<GraduationCap size={24} />} label="Google Scholar" />
                  </div>
                </div>
              </section>

            {/* EASTER EGG GAME MODAL */}
            {showGame && (
              <FlappyGame onClose={() => setShowGame(false)} />
            )}

          </div>
        );
      };

// --- HELPER COMPONENTS ---

const ProjectCard = ({ title, tags, desc, demoLink, repoLink }) => (
  <div className="group bg-[#fcfaf8] p-8 rounded-2xl border border-[#dcd6ce] hover:border-[#8c6b5d] transition-all hover:-translate-y-1 hover:shadow-lg flex flex-col h-full">
    <div className="flex justify-between items-start mb-4">
      <div className="text-xl font-bold text-[#3e2c26] flex-grow pr-4"></div>
      
      {/* Side by side icons */}
      <div className="flex gap-3 ml-auto">
        {repoLink && (
          <a href={repoLink} target="_blank" rel="noreferrer" className="text-[#8c6b5d] hover:text-[#3e2c26] transition-colors" title="View Code">
            <FaGithub size={22} />
          </a>
        )}
        {demoLink && (
          <a href={demoLink} target="_blank" rel="noreferrer" className="text-[#8c6b5d] hover:text-[#3e2c26] transition-colors" title="Live Demo">
            <ExternalLink size={22} />
          </a>
        )}
      </div>
    </div>
    
    <h3 className="text-xl font-bold mb-3 text-[#3e2c26]">{title}</h3>
    <p className="text-[#5c4239] text-sm leading-relaxed mb-6 flex-grow text-justify">
      {desc}
    </p>
    <div className="flex flex-wrap gap-2 mt-auto">
      {tags.map((tag, i) => (
        <span key={i} className="px-3 py-1 bg-[#e6ded5] text-[#3e2c26] text-xs font-semibold rounded-md">
          {tag}
        </span>
      ))}
    </div>
  </div>
);

// Updated CertificationCard to be clickable with hover icon
const CertificationCard = ({ title, issuer, code, logo, link }) => (
  <a 
    href={link} 
    target="_blank" 
    rel="noreferrer" 
    className="group flex items-start gap-4 p-5 bg-[#fcfaf8] rounded-xl border border-[#dcd6ce] hover:border-[#8c6b5d] hover:shadow-md transition-all transform hover:-translate-y-1"
  >
    <div className="flex-shrink-0 mt-1">
      <img src={logo} alt={issuer} className="w-10 h-10 object-contain opacity-90" />
    </div>
    <div>
      <h4 className="font-bold text-[#3e2c26] group-hover:text-[#8c6b5d] transition-colors flex items-center gap-2">
        {title} 
        <FaExternalLinkAlt className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-xs" />
      </h4>
      <p className="text-sm text-[#5c4239]">{issuer}</p>
      {code && <p className="text-xs text-[#8c6b5d] mt-1 font-mono">{code}</p>}
    </div>
  </a>
);

const SocialButton = ({ href, icon, label }) => (
  <a 
    href={href} 
    target="_blank" 
    rel="noreferrer"
    className="p-4 bg-white border border-[#dcd6ce] rounded-full text-[#3e2c26] hover:bg-[#3e2c26] hover:text-white hover:border-[#3e2c26] transition-all shadow-sm transform hover:scale-110"
    aria-label={label}
  >
    {icon}
  </a>
);

export default Portfolio;