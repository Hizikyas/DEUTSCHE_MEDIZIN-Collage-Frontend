import { useRef, useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { motion, useInView } from "framer-motion";

import Lottie from "lottie-react";
import DarkVeil from "@/designs/DarkVeil";
import LiquidChrome from "@/designs/LiquidChrome";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ThemeToggle } from "@/components/theme-toggle";
import home from "../../../public/animations/home.json";
import phone from "../../../public/animations/phone.json";
import register from "../../../public/animations/register.json";
import calling from "../../../public/animations/calling.json";
import { LanguageSwitcher } from "@/components/language-switcher";
import { GraduationCap, Heart, Eye, Target, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
//design pages
import TrueFocus from "@/designs/TrueFocus";
import GlareHover from "@/designs/GlareHover";
import CircularGallery from "../../designs/CircularGallery";
import LightRays from "@/designs/LightRays";
import { ChevronUpIcon } from "@heroicons/react/24/solid";
import CountUp from "react-countup";

export default function LandingPage() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShow(window.scrollY > 300); // Show after scrolling 300px
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  const videoRef = useRef(null); // points to the video element
  const [isPlaying, setIsPlaying] = useState(false); // tracks if video is playing

  const { t } = useTranslation(["common", "auth"]);
  const carouselRef = useRef(null);
  const scrollAmount = 300;

  const scrollPrev = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: -scrollAmount, behavior: "smooth" });
    }
  };

  const scrollNext = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };
  const datas = [
    {
      image:
        "https://skyresortbahirdar.com/wp-content/uploads/2021/09/Bahir-Dar-City-View-1-2560x1440.jpg",
      heading: " WHAT WE CAN KNOW",
      detail:
        " Video: Ian McEwan in conversation with Richard Ovenden, book now",
    },
    {
      image:
        "https://skyresortbahirdar.com/wp-content/uploads/2021/09/Bahir-Dar-City-View-1-2560x1440.jpg",
      heading: "FEATURED PODCAST    ",
      detail: "Accelerating AI Ethics",
    },
    {
      image:
        "https://skyresortbahirdar.com/wp-content/uploads/2021/09/Bahir-Dar-City-View-1-2560x1440.jpg",
      heading: "THE OUP BLOG",
      detail: "Your Indo-European beard",
    },
    {
      image:
        "https://skyresortbahirdar.com/wp-content/uploads/2021/09/Bahir-Dar-City-View-1-2560x1440.jpg",
      heading: "FEATURED PODCAST",
      detail: "we have very good products",
    },
  ];
  const homeRef = useRef();
  const heroRef = useRef(null);
  const heroInView = useInView(heroRef, { margin: "-150px" });
  const textRef = useRef(null);
  // Mission Section Ref
  const missionRef = useRef(null);
  const missionInView = useInView(missionRef, { margin: "-150px" });
  const programs = [
    {
      title: "Medicine",
      icon: "https://th.bing.com/th/id/R.e896697aea4207f544f0d3615ec82e61?rik=7Zdqn2%2bf0irguw&pid=ImgRaw&r=0",
      description:
        "Understand the human body structure through detailed study and cadaver labs.",
    },
    {
      title: "Nursing",
      icon: "https://seattlemedium.com/wp-content/uploads/2023/06/Black-Nurses-iStock-748-x-486px.jpg",
      description:
        "Learn the normal functions of the human body in health and disease.",
    },
    {
      title: "Medical Radiology(MRT)",
      icon: "https://tse4.mm.bing.net/th/id/OIP.cJn1IK_5m5sOK1fZam3XMwHaEJ?rs=1&pid=ImgDetMain&o=7&rm=3",
      description:
        "Explore the chemical processes underlying life and metabolism.",
    },
  ];

  const ref = useRef(null);
  const inView = useInView(ref, { margin: "-150px" });
  const infoRef = useRef(null);
  const infoView = useInView(infoRef, { margin: "-150px" });
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative min-h-screen ">
      {/* DarkVeil Background */}
      {/* <div className="fixed inset-0 w-full h-full z-0 hidden dark:block fixed inset-0 overflow-x-hidden">
        <DarkVeil className="w-full h-full object-cover" />
      </div> */}
      <div className="relative z-10">
        {show && (
          <button
            onClick={scrollToTop}
            className="fixed bottom-8 right-8 bg-sky-500 text-white p-3 rounded-full shadow-lg hover:bg-sky-600 transition"
          >
            <ChevronUpIcon className="h-6 w-6" />
          </button>
        )}
      

        <header className="fixed top-0 left-0 w-full bg-white/80 dark:bg-gray-900/80 backdrop-blur-md shadow-lg z-50">
          <div className="container mx-auto px-4 py-3 flex justify-between items-center">
            {/* Logo */}
            <div className="flex items-center space-x-2">
              <img
                src="/assets/companylogo.jpg"
                alt="Company Logo"
                className="h-10 w-10 rounded-full object-cover shadow-sm"
              />
              <span className="text-lg font-bold text-gray-800 dark:text-gray-100">
                DEUTSCHE HOCHSCHULE FÜR MEDIZIN COLLEGE

              </span>
            </div>

            {/* Desktop Navigation */}
            <nav className=" items-center space-x-6">
              <a
                href="#home"
                className="text-gray-700 dark:text-gray-200 font-medium hover:text-blue-500 dark:hover:text-blue-400 transition-colors duration-300"
              >
                Home
              </a>
              <a
                href="#mission"
                className="text-gray-700 dark:text-gray-200 font-medium hover:text-blue-500 dark:hover:text-blue-400 transition-colors duration-300"
              >
                Mission
              </a>
              <a
                href="#hero"
                className="text-gray-700 dark:text-gray-200 font-medium hover:text-blue-500 dark:hover:text-blue-400 transition-colors duration-300"
              >
                Services
              </a>
              <a
                href="#contact"
                className="text-gray-700 dark:text-gray-200 font-medium hover:text-blue-500 dark:hover:text-blue-400 transition-colors duration-300"
              >
                Contact
              </a>
            </nav>

            {/* Desktop Utilities */}
            <div className=" md:flex items-center space-x-4">
              <LanguageSwitcher />
              <ThemeToggle />
              <Link to="/login">
                <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-all duration-300 shadow-sm">
                  Login
                </button>
              </Link>
            </div>

            {/* Hamburger Button */}
            <button
              className="md:hidden text-gray-700 dark:text-gray-200 focus:outline-none"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle menu"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>

          {/* Mobile Dropdown Menu */}
          <div
            className={`md:hidden bg-white dark:bg-gray-900 shadow-lg transition-all duration-300 ease-in-out overflow-hidden ${
              isOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
            }`}
          >
            <nav className="flex flex-col space-y-3 px-4 py-4">
              <a
                href="#home"
                className="text-gray-700 dark:text-gray-200 font-medium hover:text-blue-500 dark:hover:text-blue-400 transition-colors duration-300 py-2"
                onClick={() => setIsOpen(false)}
              >
                Home
              </a>
              <a
                href="#mission"
                className="text-gray-700 dark:text-gray-200 font-medium hover:text-blue-500 dark:hover:text-blue-400 transition-colors duration-300 py-2"
                onClick={() => setIsOpen(false)}
              >
                Mission
              </a>
              <a
                href="#hero"
                className="text-gray-700 dark:text-gray-200 font-medium hover:text-blue-500 dark:hover:text-blue-400 transition-colors duration-300 py-2"
                onClick={() => setIsOpen(false)}
              >
                Services
              </a>
              <a
                href="#contact"
                className="text-gray-700 dark:text-gray-200 font-medium hover:text-blue-500 dark:hover:text-blue-400 transition-colors duration-300 py-2"
                onClick={() => setIsOpen(false)}
              >
                Contact
              </a>
              {/* Mobile Utilities */}
              <div className="flex flex-col space-y-3 pt-2">
                <div className="flex justify-between items-center">
                  <LanguageSwitcher />
                  <ThemeToggle />
                </div>
                <Link to="/login" onClick={() => setIsOpen(false)}>
                  <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-all duration-300 shadow-sm w-full">
                    Login
                  </button>
                </Link>
              </div>
            </nav>
          </div>
        </header>
        <section className="relative my-8 bg-gradient-to-r from-blue-900 to-blue-200 text-white h-96 flex items-center ">
          <img
            src="https://skyresortbahirdar.com/wp-content/uploads/2021/09/Bahir-Dar-City-View-1-2560x1440.jpg"
            alt="Student Studying"
            className="absolute inset-0 w-full h-full object-cover opacity-50"
          />
          <div className="relative z-10 text-left">
            <p className="text-lg mx-8 mb-2 font-serif font-bold">
              In the city of Bahirdar
            </p>
            <h2 className="text-4xl mb-4 bg-gradient-to-r from-blue-900 to-blue-200 px-4 py-2 rounded font-serif">
              <span className="font-bold">DEUTSCHE HOCHSCHULE FÜR MEDIZIN COLLEGE
</span> MEDICIN
              COLLEGE
            </h2>

            {/* <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded">
            Take A Tour
          </button> */}
          </div>
          <div className="absolute left-0 right-0 bottom-0 mx-auto mb-[-40px] max-w-3xl bg-white bg-white/40 backdrop-blur-md rounded-lg p-6 shadow-lg">
            <p className="text-sm font-semibold text-blue-900 mb-1">About us</p>
            <h2 className="text-xl font-bold uppercase text-blue-600 leading-tight">
              DEUTSCHE HOCHSCHULE FÜR MEDIZIN COLLEGE
 <br />
              MEDICIN COLLEGE BAHIRDAR
            </h2>
          </div>
        </section>

        {/* Hero Section */}
        <section id="home" className="my-8 container mx-auto px-4 py-10 pt-30">
          <div
            className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center gap-16 overflow-hidden"
            ref={heroRef}
          >
            {/* Image: Slide from left */}
            <motion.div
              className="w-full px-10 py-10 sm:w-2/5"
              initial={{ opacity: 0, x: -300, scale: 0.8 }}
              animate={
                heroInView
                  ? { opacity: 1, x: 0, scale: 1 }
                  : { opacity: 0, x: -300, scale: 0.8 }
              }
              transition={{ duration: 1.5, ease: "easeOut" }}
            >
              <img
                src="/assets/companylogo.jpg"
                alt="College Logo"
                className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-full flex items-center justify-center flex-shrink-0"
              />
            </motion.div>

            {/* Text: Slide from right */}
            <motion.div
              className="w-full sm:w-3/5 text-center sm:text-left max-w-4xl overflow-hidden"
              initial={{ opacity: 0, x: 300 }}
              animate={
                heroInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 300 }
              }
              transition={{ duration: 1.5, delay: 0.3, ease: "easeOut" }}
            >
              <motion.h1
                className="text-5xl font-bold text-gray-900 dark:text-white mb-6"
                initial={{ opacity: 0, y: -100 }}
                animate={
                  heroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -100 }
                }
                transition={{ duration: 1.5, delay: 0.6, ease: "easeOut" }}
              >
                <div className="text-blue-600">Excellence In</div>
                <div className="text-blue-600">
                  <TrueFocus
                    sentence="Medical Education"
                    manualMode={false}
                    blurAmount={5}
                    borderColor="red"
                    animationDuration={2}
                    pauseBetweenAnimations={1}
                  />
                </div>
              </motion.h1>

              <motion.p
                className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl"
                initial={{ opacity: 0, y: 100 }}
                animate={
                  heroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 100 }
                }
                transition={{ duration: 1.5, delay: 0.9, ease: "easeOut" }}
              >
                Join our vibrant University College community! Begin your
                academic journey by completing the Life History Form for
                undergraduate admission...
              </motion.p>

              <motion.div
                className="flex flex-col sm:flex-row gap-4 justify-center sm:justify-start"
                initial={{ opacity: 0, y: 50, scale: 0.8 }}
                animate={
                  heroInView
                    ? { opacity: 1, y: 0, scale: 1 }
                    : { opacity: 0, y: 50, scale: 0.8 }
                }
                transition={{ duration: 1.5, delay: 1.2, ease: "easeOut" }}
              >
                <Link to="/register">
                  <Button size="lg" className="text-lg px-8 py-3">
                    Register <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Button
                  variant="outline"
                  size="lg"
                  className="text-lg px-8 py-3 bg-transparent"
                >
                  Learn More
                </Button>
              </motion.div>
            </motion.div>
          </div>
        </section>
       
        <section className="mx-4 sm:mx-20 my-10">
          <div
            ref={infoRef}
            className="grid grid-cols-1 sm:grid-cols-2 gap-x-20 gap-y-10"
          >
            <motion.div
              initial={{ opacity: 0, x: 100 }}
              animate={infoView ? { opacity: 1, x: 0 } : { opacity: 0, x: 100 }}
              transition={{ duration: 1, ease: "easeOut" }}
            >
              <div>
                <h2 className="text-4xl text-blue-500 dark:text-blue-300 font-serif">
                DEUTSCHE HOCHSCHULE FÜR MEDIZIN COLLEGE
                College at glance
                </h2>
                <p className="text-lg dark:text-white text-black font-poppins mb-4">
                For nearly seven years, people have come to Deutsche Hochschule für Medizin College (DHM) in the pursuit of truth, knowledge, and the betterment of society.
                </p>
                {/* ✅ Make the image responsive */}
                <img
                  src="/assets/collegephoto.jpg"
                  alt="College"
                  className="w-full h-auto rounded-lg object-cover"
                />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -100 }}
              animate={
                infoView ? { opacity: 1, x: 0 } : { opacity: 0, x: -100 }
              }
              transition={{ duration: 1, ease: "easeOut" }}
              className="flex flex-col justify-between"
            >
              <motion.div
                initial={{ opacity: 0, y: -100 }}
                animate={
                  infoView ? { opacity: 1, y: 0 } : { opacity: 0, y: -100 }
                }
                transition={{ duration: 1, ease: "easeOut" }}
                className="gap-y-8"
              >
                <h2 className="text-2xl text-blue-500 dark:text-blue-300 font-serif">
                  2017{" "}
                </h2>
                <p className="text-lg dark:text-white text-black font-mono">
                  The year DEUTSCHE HOCHSCHULE FÜR MEDIZIN COLLEGE
                  was founded
                </p>
              </motion.div>

              <div>
                <h2 className="text-2xl text-blue-500 dark:text-blue-300 font-serif">
                  204{" "}
                </h2>
                <p className="text-lg dark:text-white text-black font-mono">
                  Undergraduate and graduate students in the 2023-24 academic
                  year
                </p>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 100 }}
                animate={
                  infoView ? { opacity: 1, y: 0 } : { opacity: 0, y: 100 }
                }
                transition={{ duration: 1, ease: "easeOut" }}
              >
                <h2 className="text-2xl text-blue-500 dark:text-blue-300 font-serif">
                  433{" "}
                </h2>
                <p className="text-lg dark:text-white text-black font-mono">
                  students currently engaged now
                </p>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* <section className="container   px-6 py-24">
          <div className="grid mx-10 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: 100 }}
              animate={infoView ? { opacity: 1, x: 0 } : { opacity: 0, x: 100 }}
              transition={{ duration: 1.5, ease: "easeOut" }}
            >
              <h2 className="text-4xl md:text-5xl font-serif text-blue-600 dark:text-blue-400 mb-6">
                Doche College at a Glance
              </h2>
              <p className="text-lg md:text-xl font-sans dark:text-gray-200 text-gray-800 mb-6">
                For nearly four years, people have come to Doche College in
                pursuit of knowledge, truth, and the betterment of society.
              </p>
              <motion.img
                src="/assets/collegephoto.jpg"
                alt="College Library"
                className="rounded-3xl shadow-2xl w-full object-cover cursor-pointer hover:scale-105 transition-transform duration-500"
                whileHover={{ scale: 1.05 }}
              />
            </motion.div>

            <motion.div
              className="flex flex-col gap-10"
              initial={{ opacity: 0, x: -100 }}
              animate={
                infoView ? { opacity: 1, x: 0 } : { opacity: 0, x: -100 }
              }
              transition={{ duration: 1.5, ease: "easeOut" }}
            >
              <motion.div
                className=""
                initial={{ opacity: 0, y: -50 }}
                animate={
                  infoView ? { opacity: 1, y: 0 } : { opacity: 0, y: -50 }
                }
                transition={{ duration: 1.2, ease: "easeOut" }}
              >
                <h3 className="text-3xl font-extrabold text-blue-600 dark:text-blue-400 mb-2">
                  <CountUp end={2017} duration={2} />
                </h3>
                <p className="font-sans dark:text-gray-200 text-gray-700 text-lg">
                  The year Doche was founded
                </p>
              </motion.div>

              <motion.div
                className=""
                initial={{ opacity: 0, y: 50 }}
                animate={
                  infoView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }
                }
                transition={{ duration: 1.2, delay: 0.2, ease: "easeOut" }}
              >
                <h3 className="text-3xl font-extrabold text-blue-600 dark:text-blue-400 mb-2">
                  <CountUp end={1240} duration={2} />
                </h3>
                <p className="font-sans dark:text-gray-200 text-gray-700 text-lg">
                  Undergraduate & graduate students in 2023-24
                </p>
              </motion.div>

              <motion.div
                className=""
                initial={{ opacity: 0, y: 50 }}
                animate={
                  infoView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }
                }
                transition={{ duration: 1.2, delay: 0.4, ease: "easeOut" }}
              >
                <h3 className="text-3xl font-extrabold text-blue-600 dark:text-blue-400 mb-2">
                  <CountUp end={850} duration={2} />
                </h3>
                <p className="font-sans dark:text-gray-200 text-gray-700 text-lg">
                  Staff members currently engaged
                </p>
              </motion.div>
            </motion.div>
          </div>
        </section> */}
        <section
          id="programs"
          className="container mx-auto px-4 py-24 overflow-hidden"
          ref={ref}
        >
          <motion.h2
            className="text-4xl font-extrabold text-center mb-16 
    bg-gradient-to-r from-blue-600 to-cyan-400 bg-clip-text text-transparent 
    drop-shadow-lg tracking-tight"
            initial={{ opacity: 0, x: 200 }} // start hidden and lower
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 200 }} // slide up and appear
            transition={{ duration: 2.2, ease: "easeOut" }}
          >
            Medical Programs & Courses We Provide
          </motion.h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12 place-items-center">
            {programs.map((program, index) => (
              <motion.div
                key={index}
                className="flex flex-col overflow-hidden rounded-3xl 
        bg-white/80 dark:bg-slate-900/80 
        backdrop-blur-xl border border-slate-200 dark:border-slate-700
        shadow-xl hover:shadow-2xl 
        text-center cursor-pointer w-80 h-[32rem] transition-all duration-300"
                initial={{ opacity: 0, y: 50, scale: 0.9 }}
                animate={
                  inView
                    ? { opacity: 1, y: 0, scale: 1 }
                    : { opacity: 0, y: 50, scale: 0.9 }
                }
                transition={{
                  duration: 1.2,
                  delay: index * 0.2,
                  ease: "easeOut",
                }}
                whileHover={{
                  scale: 1.05,
                  y: -12,
                }}
              >
                {/* Full image large section */}
                <div className="w-full h-72">
                  <img
                    src={program.icon}
                    alt={program.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Text section smaller */}
                <div className="flex flex-col items-center p-6">
                  <h3 className="text-lg font-bold text-gray-800 dark:text-white">
                    {program.title}
                  </h3>
                  <p className="text-sm mt-2 text-gray-600 dark:text-gray-300">
                    {program.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        <section
          id="hero"
          className="relative mx-20 my-8 h-screen overflow-hidden text-white font-sans"
        >
          {/* Background video */}
          <video
            className="absolute inset-0 w-full h-full object-cover brightness-70"
            src="/assets/video.mp4"
            autoPlay
            loop
            muted
            playsInline
          ></video>

          {/* Gradient overlay */}
          {/* <div className="absolute inset-0 bg-gradient-to-b from-blue-900/70 via-transparent to-blue-900/70"></div> */}

          {/* Floating circles */}
          <div className="absolute inset-0 overflow-hidden">
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute rounded-full bg-blue-400 opacity-15"
                style={{
                  width: `${60 + i * 25}px`,
                  height: `${60 + i * 25}px`,
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`,
                }}
                animate={{ y: ["0%", "12%", "0%"], x: ["0%", "12%", "0%"] }}
                transition={{
                  duration: 9 + i,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            ))}
          </div>

          {/* Content */}
          <div className="relative z-10 flex flex-col justify-center items-center h-full px-6 text-center">
            {/* Main heading - dynamic letters */}

            {/* Subheading */}
            <motion.p
              className="text-2xl md:text-3xl font-medium text-gray-100 mb-6 drop-shadow-lg"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.8, delay: 1.2, ease: "easeOut" }}
            >
              Pursue your dreams in{" "}
              <span className="text-cyan-400 font-bold tracking-wide">
                Medicine
              </span>{" "}
              and{" "}
              <span className="text-indigo-400 font-bold tracking-wide">
                Healthcare
              </span>
            </motion.p>

            {/* Badges with float */}
            <motion.div
              className="flex flex-wrap justify-center gap-5 mb-8"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.5, delay: 1.6, ease: "easeOut" }}
            >
              {["Regular", "Distance", "Extension"].map((type, idx) => (
                <motion.span
                  key={idx}
                  className="px-5 py-3 rounded-full bg-gradient-to-r from-blue-500 to-cyan-400 text-white font-semibold shadow-lg cursor-pointer"
                  whileHover={{
                    scale: 1.1,
                    y: -5,
                    boxShadow: "0 10px 25px rgba(0,0,0,0.5)",
                  }}
                  animate={{ y: [0, -5, 0] }}
                  transition={{
                    duration: 2 + idx,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: idx * 0.3,
                  }}
                >
                  {type}
                </motion.span>
              ))}
            </motion.div>

            {/* CTA button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.5, delay: 2.1, ease: "easeOut" }}
            >
              <Link to="/register">
                <Button
                  size="lg"
                  className="px-10 py-4 bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-blue-500 hover:to-cyan-400 text-white font-bold text-lg shadow-2xl hover:shadow-[0_0_40px_rgba(0,255,255,0.6)] animate-pulse"
                >
                  {t("auth:register")}
                </Button>
              </Link>
            </motion.div>
          </div>
        </section>

        {/* Core Values, Vision, Mission */}
        <section
          id="mission"
          className="container my-8 mx-auto px-4 py-16"
          ref={missionRef}
        >
          <h2 className="text-2xl ml-12 font-bold mb-4 text-blue-500 dark:text-white">
            Values and Missions
          </h2>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto overflow-hidden">
            {/* Card 1 - slide from up */}
            <motion.div
              initial={{ opacity: 0, y: -50 }}
              animate={
                missionInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -50 }
              }
              transition={{ duration: 1.5, ease: "easeOut" }}
            >
              <Card className="text-center bg-white dark:bg-black shadow-[0_0_15px_rgba(255,255,255,0.3)] transform transition-transform duration-300 hover:scale-105 hover:shadow-[0_0_15px_rgba(255,255,255,0.6)]">
                <CardHeader>
                  <img
                    src="/assets/student.jpg"
                    className="h-[200px] w-full object-cover"
                  />
                  <CardTitle className="text-2xl text-blue-600 dark:text-white">
                    Core Values
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    DHFMC places education at the core of its vision and
                    mission, guiding all our actions and decisions...
                  </CardDescription>
                </CardContent>
              </Card>
            </motion.div>

            {/* Card 2 - slide from down */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={
                missionInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }
              }
              transition={{ duration: 1.5, delay: 0.3, ease: "easeOut" }}
            >
              <Card className="text-center bg-white dark:bg-black shadow-[0_0_15px_rgba(255,255,255,0.3)] transform transition-transform duration-300 hover:scale-105 hover:shadow-[0_0_15px_rgba(255,255,255,0.6)]">
                <CardHeader>
                  <img
                    src="/assets/laboratory.jpg"
                    className="h-[200px] w-full object-cover"
                  />
                  <CardTitle className="text-2xl text-blue-600 dark:text-white">
                    Vision
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    DHM College envisions becoming the premier center of
                    academic excellence in Ethiopia by the year 2025...
                  </CardDescription>
                </CardContent>
              </Card>
            </motion.div>

            {/* Card 3 - slide from up */}
            <motion.div
              initial={{ opacity: 0, y: -50 }}
              animate={
                missionInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -50 }
              }
              transition={{ duration: 1.5, delay: 0.6, ease: "easeOut" }}
            >
              <Card className="text-center bg-white dark:bg-black shadow-[0_0_15px_rgba(255,255,255,0.3)] transform transition-transform duration-300 hover:scale-105 hover:shadow-[0_0_15px_rgba(255,255,255,0.6)]">
                <CardHeader>
                  <img
                    src="/assets/intro.jpg"
                    className="h-[200px] w-full object-cover"
                  />
                  <CardTitle className="text-2xl text-blue-600 dark:text-white">
                    Mission
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    DHM College aims to produce competent professionals at
                    different levels relevant to the development needs of the
                    country...
                  </CardDescription>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </section>

        <div className="pt-28 pb-48">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold mb-4 text-blue-500 dark:text-white">
              DISCOVER MORE
            </h2>
            <div className="relative overflow-hidden">
              <div
                ref={carouselRef}
                id="carousel"
                className="flex space-x-4 overflow-x-auto scroll-smooth"
              >
                {/* Card 1 */}
                <div className="min-w-[250px] flex-shrink-0 bg-white p-4 rounded-lg shadow-md">
                  <img
                    src="/assets/collegephoto.jpg"
                    alt="Ian McEwan"
                    className="w-full h-40 object-cover mb-2"
                  />
                  <h3 className="text-lg font-semibold text-gray-800">
                    JOIN OUR COLLEGE
                  </h3>
                  <p className="text-sm text-gray-600">
                    Right here in Bahirdar
                  </p>
                </div>
                {/* Card 2 */}
                <div className="min-w-[250px] flex-shrink-0 bg-white p-4 rounded-lg shadow-md">
                  <video
                    controls
                    poster="https://res.cloudinary.com/djz4nl0ic/video/upload/v1755066400/4C5A5182_pqbmq6.jpg"
                    preload="none"
                    className="w-full h-40 object-cover mb-2"
                  >
                    <source
                      src="https://res.cloudinary.com/djz4nl0ic/video/upload/v1755066400/4C5A5182_pqbmq6.mov"
                      type="video/mp4"
                    />
                    Your browser does not support the video tag.
                  </video>
                  <h3 className="text-lg font-semibold text-gray-800">
                    Team Work{" "}
                  </h3>
                  <p className="text-sm text-gray-600">
                    Team Meatings encouraged To Facilitate Learning Process
                  </p>
                </div>
                {/* Card 3 */}
                <div className="min-w-[250px] flex-shrink-0 bg-white p-4 rounded-lg shadow-md">
                  <video
                    controls
                    poster="https://res.cloudinary.com/djz4nl0ic/video/upload/v1755069448/4C5A5095_kvfnmo.jpg"
                    preload="none"
                    className="w-full h-40 object-cover mb-2"
                  >
                    <source
                      src="https://res.cloudinary.com/djz4nl0ic/video/upload/v1755069448/4C5A5095_kvfnmo.mov"
                      type="video/mp4"
                    />
                    Your browser does not support the video tag.
                  </video>
                  <h3 className="text-lg font-semibold text-gray-800">
                    Laboratories
                  </h3>
                  <p className="text-sm text-gray-600">
                    Full and Equipied Labs For Our Students
                  </p>
                </div>
                <div className="min-w-[250px] flex-shrink-0 bg-white p-4 rounded-lg shadow-md">
                  <video
                    controls
                    poster="https://res.cloudinary.com/djz4nl0ic/video/upload/v1755069644/4C5A5181_llhfsl.jpg"
                    preload="none"
                    className="w-full h-40 object-cover mb-2"
                  >
                    <source
                      src="https://res.cloudinary.com/djz4nl0ic/video/upload/v1755069644/4C5A5181_llhfsl.mov"
                      type="video/mp4"
                    />
                    Your browser does not support the video tag.
                  </video>
                  <h3 className="text-lg font-semibold text-gray-800">
                    WHAT WE CAN KNOW
                  </h3>
                  <p className="text-sm text-gray-600">
                    Video: Ian McEwan in conversation with Richard Ovenden, book
                    now
                  </p>
                </div>
                <div className="relative w-full h-40">
                  <video
                    ref={videoRef}
                    poster="https://res.cloudinary.com/djz4nl0ic/video/upload/v1755069644/4C5A5181_llhfsl.jpg"
                    preload="none"
                    className="w-full h-full object-cover"
                  >
                    <source
                      src="https://res.cloudinary.com/djz4nl0ic/video/upload/v1755069644/4C5A5181_llhfsl.mov"
                      type="video/mp4"
                    />
                  </video>
                </div>
              </div>
              {/* Navigation Arrows */}
              <button
                id="prev"
                onClick={scrollPrev}
                className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full"
              >
                &lt;
              </button>
              <button
                id="next"
                onClick={scrollNext}
                className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full"
              >
                &gt;
              </button>
            </div>
          </div>
        </div>
        <div className="relative h-[600px] px-10 ">
          {/* Heading positioned at the top center */}
          <h2 className="text-4xl font-bold text-blue-500 dark:text-white mb-2">
            Our Facilities
          </h2>

          {/* Circular gallery below the heading */}
          <CircularGallery
            bend={3}
            textColor="#3B82F6"
            borderRadius={0.05}
            scrollEase={0.02}
          />
        </div>

        {/* Call to Action */}
        {/* <section className="bg-blue-600 dark:bg-blue-800 py-16"> */}

        <section className="py-26">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold text-blue-500 dark:text-white mb-4">
              Ready to Start Your Medical Journey?
            </h2>
            <p className="text-xl text-blue-300 mb-8 max-w-2xl mx-auto">
              Join thousands of successful graduates who have made their mark in
              the medical field. Your future in healthcare starts here.
            </p>
            <Link to="/register">
              <Button
                size="lg"
                variant="secondary"
                className="text-lg px-8 py-3"
              >
                {t("auth:register")} <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </section>
        {/* Footer */}
        <div
          id="contact"
          className="relative w-full   flex items-center justify-center overflow-hidden"
        >
          {/* Light rays absolutely positioned behind content */}
          <div className="absolute inset-0 z-0 pointer-events-none">
            <LightRays
              raysOrigin="top-center"
              raysColor="#ffffff"
              raysSpeed={1}
              lightSpread={1}
              rayLength={2}
              pulsating={true}
              fadeDistance={1}
              saturation={1}
              followMouse={true}
              mouseInfluence={0.1}
              noiseAmount={0}
              distortion={0}
              className="w-full h-full"
            />
          </div>
          {/* <footer className="bg-gray-900 dark:bg-gray-950 text-white py-12"> */}

          <footer className="text-white py-1">
            <div className="container mx-auto px-4">
              <div className="grid md:grid-cols-4 gap-8">
                <div>
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="w-12 rounded-full   rounded-lg flex items-center justify-center">
                      <img
                        src="/assets/companylogo.jpg"
                        className="h-[50px] w-full rounded-full "
                      />
                    </div>
                    <div>
                      <h3 className="text-gray-500 hover:text-gray-400 dark:text-white font-bold">
                        {t("college.name")}
                      </h3>
                      <p className="text-gray-500 hover:text-gray-400 dark:text-white text-sm text-">
                        {t("college.subtitle")}
                      </p>
                    </div>
                  </div>
                  <p className="text-blue-600 hover:text-gray-400">
                    Excellence in medical education since 1985.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold mb-4">Quick Links</h4>
                  <ul className="space-y-2 text-black">
                    <li>
                      <Link
                        to="/register"
                        className="text-blue-600 hover:text-gray-400 dark:text-white dark:hover:text-gray-400"
                      >
                        Apply Now
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/login"
                        className="text-blue-600 hover:text-gray-400 dark:text-white dark:hover:text-gray-400"
                      >
                        Student Portal
                      </Link>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="text-blue-600 hover:text-gray-400 dark:text-white dark:hover:text-gray-400"
                      >
                        Programs
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="text-blue-600 hover:text-gray-400 dark:text-white dark:hover:text-gray-400"
                      >
                        Research
                      </a>
                    </li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-4">{t("contact")}</h4>
                  <ul className="space-y-2 ">
                    <li className="text-blue-600 hover:text-gray-400 dark:text-white dark:hover:text-gray-400">
                      123 Medical Campus Drive
                    </li>
                    <li className="text-blue-600 hover:text-gray-400 dark:text-white dark:hover:text-gray-400">
                      Berlin, Germany 10115
                    </li>
                    <li className="text-blue-600 hover:text-gray-400 dark:text-white dark:hover:text-gray-400">
                      +49 30 1234 5678
                    </li>
                    <li className="text-blue-600 hover:text-gray-400 dark:text-white dark:hover:text-gray-400">
                      info@dhfm-college.de
                    </li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-4">Follow Us</h4>
                  <div className="flex space-x-4">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-gray-400 hover:text-white"
                    >
                      <span className="sr-only">Facebook</span>📘
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-gray-400 hover:text-white"
                    >
                      <span className="sr-only">Twitter</span>🐦
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-gray-400 hover:text-white"
                    >
                      <span className="sr-only">LinkedIn</span>💼
                    </Button>
                  </div>
                </div>
              </div>
              <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
                <p>
                  &copy; 2024 DEUTSCHE HOCHSCHULE FÜR MEDIZIN COLLEGE
 für Medizin College. All
                  rights reserved.
                </p>
              </div>
            </div>
          </footer>
        </div>
      </div>
    </div>
  );
}
