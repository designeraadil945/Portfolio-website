import { useEffect, useRef, useState } from "react";
import {
  FaLinkedinIn,
  FaGithub,
  FaTwitter,
  FaEnvelope,
  FaCode,
  FaArrowRight,
  FaStar,
  FaMobileAlt,
  FaServer,
  FaLayerGroup,
  FaRocket,
  FaHeart,
  FaMugHot,
} from "react-icons/fa";
import {
  FiMoon,
  FiSun,
  FiArrowLeft,
  FiArrowRight,
  FiUser,
  FiMail,
  FiMapPin,
  FiBriefcase,
  FiPhone,
  FiChevronDown,
  FiHelpCircle,

  FiSearch,
  FiTarget,
  FiEdit3,
  FiPlay,
  FiCheckCircle,
  FiAward,
  FiBookOpen,
  FiTrendingUp,
  FiUsers,
  FiX,
} from "react-icons/fi";

import heroPortrait from "./assets/raja-hero-v2.png";

const skills = [
  ["Flutter", "flutter"], ["Dart", "dart"], ["Firebase", "firebase"], ["Laravel", "laravel"],
  ["MySQL", "mysql"], ["HTML5", "html5"], ["CSS3", "css3"], ["JavaScript", "javascript"],
  ["Git", "git"], ["Figma", "figma"], ["React", "react"], ["Node.js", "nodejs"],
  ["TypeScript", "typescript"], ["Python", "python"], ["MongoDB", "mongodb"], ["PostgreSQL", "postgresql"],
  ["Next.js", "nextjs"], ["Tailwind CSS", "tailwind"], ["Redux", "redux"], ["Express.js", "express"],
  ["Java", "java"], ["C++", "cplusplus"], ["PHP", "php"], ["Docker", "docker"],
  ["AWS", "aws"], ["Azure", "azure"], ["Kubernetes", "kubernetes"], ["Redis", "redis"],
  ["GraphQL", "graphql"], ["GitHub", "github"], ["VS Code", "vscode"], ["Postman", "postman"],
];


function useParallax() {
  useEffect(() => {
    if (
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
      window.matchMedia("(max-width: 767px)").matches
    ) return;

    let frameId = 0;
    const layers = Array.from(document.querySelectorAll("[data-parallax]"));

    const render = () => {
      const viewportCenter = window.innerHeight / 2;
      layers.forEach((layer) => {
        const rect = layer.getBoundingClientRect();
        const speed = Number(layer.dataset.parallax || 0);
        const distance = rect.top + rect.height / 2 - viewportCenter;
        const offset = Math.max(-240, Math.min(240, distance * speed));
        layer.style.transform = `translate3d(0, ${offset}px, 0)`;
      });
      frameId = 0;
    };

    const requestRender = () => {
      if (!frameId) frameId = requestAnimationFrame(render);
    };

    render();
    window.addEventListener("scroll", requestRender, { passive: true });
    window.addEventListener("resize", requestRender);
    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener("scroll", requestRender);
      window.removeEventListener("resize", requestRender);
    };
  }, []);
}

function useTiltEffects() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const cards = Array.from(document.querySelectorAll("[data-tilt]"));

    const cleanups = cards.map((card) => {
      const move = (event) => {
        const rect = card.getBoundingClientRect();
        const x = (event.clientX - rect.left) / rect.width - 0.5;
        const y = (event.clientY - rect.top) / rect.height - 0.5;
        card.style.transform = `perspective(900px) rotateX(${-y * 12}deg) rotateY(${x * 14}deg) translateY(-8px)`;
        card.style.boxShadow = `${-x * 20}px ${12 - y * 12}px 45px rgba(9, 185, 255, 0.18)`;
      };
      const leave = () => {
        card.style.transform = "perspective(900px) rotateX(0) rotateY(0) translateY(0)";
        card.style.boxShadow = "none";
      };
      card.addEventListener("pointermove", move);
      card.addEventListener("pointerleave", leave);
      return () => {
        card.removeEventListener("pointermove", move);
        card.removeEventListener("pointerleave", leave);
      };
    });

    return () => cleanups.forEach((cleanup) => cleanup());
  }, []);
}

function useSiteReveal() {
  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const selectors = [
      "main section h2",
      "main section:not(#faq) article",
      "main section form",
      "main section [data-tilt]",
      "main section img",
      "footer > *",
    ];
    const items = [...new Set(document.querySelectorAll(selectors.join(",")))];

    const resetItems = () => {
      items.forEach((item) => {
        item.removeAttribute("data-site-reveal");
        item.classList.remove("is-visible");
        item.style.removeProperty("--reveal-delay");
      });
    };

    items.forEach((item) => {
      const section = item.closest("section, footer");
      const siblings = items.filter((candidate) => candidate.closest("section, footer") === section);
      item.dataset.siteReveal = "";
      item.style.setProperty("--reveal-delay", `${Math.min(siblings.indexOf(item), 6) * 75}ms`);
    });

    if (reduceMotion) {
      items.forEach((item) => item.classList.add("is-visible"));
      return resetItems;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.08, rootMargin: "0px 0px -8% 0px" },
    );

    items.forEach((item) => observer.observe(item));
    return () => {
      observer.disconnect();
      resetItems();
    };
  }, []);
}

function Reveal({ children, delay = 0 }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(node);
        }
      },
      { threshold: 0.12 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`transform-gpu transition-[opacity,transform,filter] duration-1000 ease-out motion-reduce:transform-none motion-reduce:transition-none motion-reduce:opacity-100 motion-reduce:blur-none ${
        visible ? "translate-y-0 scale-100 opacity-100 blur-none" : "translate-y-20 scale-[.97] opacity-0 blur-sm"
      }`}
    >
      {children}
    </div>
  );
}
function SocialButton({ children, href = "#" }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="
        grid h-14 w-14 place-items-center
        rounded-full
        bg-[#e5f2fa] dark:bg-[#13283a]
        text-[28px] text-[#10243a] dark:text-white
        transition-all duration-300
        hover:-translate-y-1
        hover:bg-[#17364f]
        hover:text-[#19baff]
        hover:shadow-[0_8px_25px_rgba(9,185,255,0.20)]
      "
    >
      {children}
    </a>
  );
}

const heroParticles = Array.from({ length: 38 }, (_, index) => ({
  id: index,
  left: `${(index * 37) % 96}%`,
  top: `${8 + ((index * 53) % 84)}%`,
  size: 2 + (index % 4),
  delay: `${-(index % 9) * 0.45}s`,
  duration: `${2.8 + (index % 7) * 0.55}s`,
}));

const testimonials = [
  {
    id: 1,
    name: "Saurabh Mishra",
    designation: "Project Manager, ABC Technologies",
    message:
      "Raja is a talented developer with great problem solving skills. He delivers high quality work and is always eager to learn new technologies.",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSHyH2ycErg5nEFLVIE8gvgyc5LBoKkm32IDeUmhQMFHA&s=10",
    rating: 5,
  },
  {
    id: 2,
    name: "Rahul Sharma",
    designation: "Senior Developer, Tech Solutions",
    message:
      "Working with Raja has been a great experience. He understands requirements quickly and always focuses on building clean and scalable solutions.",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSHyH2ycErg5nEFLVIE8gvgyc5LBoKkm32IDeUmhQMFHA&s=10",
    rating: 5,
  },
  {
    id: 3,
    name: "Amit Verma",
    designation: "Product Manager, Digital Labs",
    message:
      "Raja consistently delivers reliable work with great attention to detail. His Flutter and backend development skills are impressive.",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSHyH2ycErg5nEFLVIE8gvgyc5LBoKkm32IDeUmhQMFHA&s=10",
    rating: 5,
  },
];

const projects = [
  {
    title: "AssetCare",
    description: "A cross-platform asset management app built with Flutter.",
    tags: ["Flutter", "Firebase", "REST API"],
    image: "https://images.unsplash.com/photo-1551650975-87deedd944c3?auto=format&fit=crop&w=900&q=85",
    type: "Mobile App",
    challenge: "Make asset records easy to find, update, and maintain from a mobile device without creating a complicated workflow.",
    approach: "Designed a focused cross-platform experience, connected remote data through APIs, and used Firebase for dependable application services.",
    contribution: ["Mobile UI development", "API integration", "Data and state handling"],
  },
  {
    title: "Task Manager",
    description: "A productivity app to manage daily tasks efficiently.",
    tags: ["React", "Node.js", "MySQL"],
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=900&q=85",
    type: "Web App",
    challenge: "Create a simple way to organize daily work while keeping task data structured and available across sessions.",
    approach: "Built a responsive React interface supported by a Node.js API and a relational MySQL data model.",
    contribution: ["Responsive interface", "Backend API", "Database design"],
  },
  {
    title: "Portfolio Website",
    description: "A personal portfolio website to showcase my work.",
    tags: ["HTML", "CSS", "JavaScript"],
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=900&q=85",
    type: "Web App",
    challenge: "Present skills, experience, and projects in a format that is quick to scan and pleasant to explore on every screen size.",
    approach: "Created a responsive visual system with accessible navigation, reusable sections, theme support, and subtle interaction feedback.",
    contribution: ["Visual design", "Frontend development", "Responsive experience"],
  },
];

const navItems = [
  "Home",
  "About",
  "Skills",
  "Projects",
  "Experience",
  "Profile",
  "Learning",
  "Contact",
];

const sectionClass =
  "mx-auto w-full max-w-[1600px] px-5 py-12 sm:px-8 sm:py-14 lg:px-10 lg:py-[62px] xl:px-16 border-b border-[#c9dce9] dark:border-[#173047]/80";

const paragraphClass = "text-[16px] leading-[1.75] text-[#526a7e] dark:text-[#9dafc1]";

const gradientButton =
  "inline-flex h-[46px] items-center justify-center rounded-lg bg-gradient-to-r from-[#10baf7] via-[#2089ff] to-[#684eff] px-7 text-[16px] font-semibold !text-white shadow-[0_10px_35px_rgba(37,116,255,.18)] transition-all duration-300 hover:-translate-y-1 hover:scale-105 hover:shadow-[0_15px_45px_rgba(9,185,255,.35)] active:translate-y-0 active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#0bbcff]";

const outlineButton =
  "inline-flex h-[46px] items-center justify-center rounded-full border border-[#80a8c4] bg-white/80 shadow-sm dark:border-[#6d8cda] dark:bg-[#07192a]/70 dark:shadow-none px-7 text-[16px] font-semibold text-[#10243a] transition dark:text-white hover:border-[#10baf7] hover:bg-[#e6f5fc] dark:hover:bg-[#0b2238]";

function SectionTitle({ tag, children, className = "" }) {
  return (
    <div className={className}>
      <div className="mb-3 flex items-center gap-3">
        <span className="h-[2px] w-7 bg-[#09b9ff]" />
        <span className="text-[16px] font-semibold tracking-[1.7px] text-[#0bbcff]">
          {tag}
        </span>
      </div>

      <h2 className="text-[28px] leading-[1.08] font-bold tracking-[-1px] text-[#10243a] dark:text-white md:text-[34px]">
        {children}
      </h2>
    </div>
  );
}

/* =========================================================
   HEADER
========================================================= */


function scrollToSection(event, sectionId) {
  event?.preventDefault();
  const target = document.getElementById(sectionId);
  if (!target) return;

  target.scrollIntoView({ behavior: "smooth", block: "start" });
  window.history.replaceState(null, "", `#${sectionId}`);

  if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    target.animate(
      [
        { filter: "brightness(1)", opacity: 1 },
        { filter: "brightness(1.16)", opacity: 0.92, offset: 0.45 },
        { filter: "brightness(1)", opacity: 1 },
      ],
      { duration: 850, easing: "ease-out" },
    );
  }
}
function Header({ theme, toggleTheme }) {
  const [open, setOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActiveSection(visible.target.id);
      },
      { rootMargin: "-20% 0px -65% 0px", threshold: [0.05, 0.25, 0.5] },
    );

    navItems.forEach((item) => {
      const section = document.getElementById(item.toLowerCase());
      if (section) observer.observe(section);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <header className="sticky top-0 z-50 border-b border-[#163047]/20 bg-white/90 dark:bg-[#041321]/90 backdrop-blur-xl">
      <div className="mx-auto flex h-[82px] max-w-[1600px] items-center px-5 sm:px-8 lg:px-10 xl:px-16">
        <a
          href="#home"
          className="text-[29px] font-extrabold tracking-[-1px] text-[#10243a] dark:text-white"
        >
          Raja<span className="text-[#5b5cff]">.</span>
        </a>

        <button
          onClick={() => setOpen(!open)}
          className="ml-auto text-2xl text-[#10243a] dark:text-white md:hidden"
        >
          ☰
        </button>

        <nav
          className={`${
            open ? "flex" : "hidden"
          } absolute top-[82px] left-0 w-full flex-col items-center gap-7 border-b border-[#c9dce9] dark:border-[#173047] bg-white dark:bg-[#061727] py-7 md:static md:ml-auto md:flex md:w-auto md:flex-row md:border-0 md:bg-transparent md:py-0`}
        >
          {navItems.map((item, index) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              onClick={(event) => {
                setOpen(false);
                scrollToSection(event, item.toLowerCase());
              }}
              className={`relative text-[16px] transition-all duration-300 hover:-translate-y-1 hover:text-[#0bbcff] ${
                activeSection === item.toLowerCase() ? "text-[#0bbcff]" : "text-[#465c70] dark:text-[#c4cfda]"
              }`}
            >
              {item}

              {activeSection === item.toLowerCase() && (
                <span className="absolute -bottom-4 left-0 h-[2px] w-full animate-pulse bg-[#0bbcff] shadow-[0_0_10px_#0bbcff]" />
              )}
            </a>
          ))}
        </nav>

        <div className="ml-10 hidden items-center gap-4 md:flex">
          <button
            type="button"
            onClick={toggleTheme}
            aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
            className="
    grid h-9 w-9 place-items-center
    rounded-full
    border border-[#b9d2e3] dark:border-[#19354e]
    bg-[#e5f2fa] dark:bg-[#0b2134]
    text-[#29465e] dark:text-[#dbe7f3]
    transition-all duration-300
    hover:border-[#0bbcff]
    hover:text-[#0bbcff]
  "
          >
            {theme === "dark" ? (
              <FiSun className="text-[17px]" />
            ) : (
              <FiMoon className="text-[17px]" />
            )}
          </button>

          <a href="#contact" className={`${gradientButton} h-[42px] px-6`}>
            Let's Talk
            <FaArrowRight className="ml-2 text-[12px]" />
          </a>
        </div>
      </div>
    </header>
  );
}

/* =========================================================
   HERO
========================================================= */

function Hero() {
  return (
    <section
      id="home"
      className="relative scroll-mt-[82px] overflow-hidden border-b border-[#c9dce9] dark:border-[#173047]/80"
    >
      <div data-parallax="0.38" className="pointer-events-none absolute top-0 right-[5%] h-[520px] w-[520px] rounded-full bg-[#087efb]/5 blur-[80px] will-change-transform motion-reduce:transform-none" />
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        {heroParticles.map((particle) => (
          <span
            key={particle.id}
            style={{
              left: particle.left,
              top: particle.top,
              width: particle.size,
              height: particle.size,
              animationDelay: particle.delay,
              animationDuration: particle.duration,
            }}
            className="absolute motion-safe:animate-bounce"
          >
            <span
              style={{ animationDelay: particle.delay, animationDuration: `${1.1 + (particle.id % 5) * 0.35}s` }}
              className={`block h-full w-full rounded-full shadow-[0_0_12px_2px_rgba(11,188,255,.65)] motion-safe:animate-pulse ${
                particle.id % 3 === 0 ? "bg-[#7456ff]" : "bg-[#0bbcff]"
              }`}
            />
          </span>
        ))}
      </div>

      <div className="mx-auto grid min-h-[620px] max-w-[1600px] grid-cols-1 items-center px-5 pt-10 sm:px-8 lg:grid-cols-[49%_51%] lg:px-10 lg:pt-0 xl:px-16">
        {/* LEFT */}
        <div className="relative z-10 pb-10 text-center lg:pb-0 lg:text-left">
          <div className="mb-5 flex items-center justify-center gap-3 lg:justify-start">
            <span className="h-[2px] w-7 bg-[#0bbcff]" />
            <span className="text-[14px] font-semibold tracking-[1.7px] text-[#0bbcff]">
              HI, I'M
            </span>
          </div>

          <h1 className="text-[48px] leading-[.96] font-extrabold tracking-[-3px] text-[#10243a] dark:text-white sm:text-[58px] lg:text-[64px]">
            Raja{" "}
            <span className="bg-gradient-to-r from-[#13afff] to-[#7051ff] bg-clip-text text-transparent">
              Kumar
            </span>
          </h1>

          <h3 className="mt-4 text-[18px] font-semibold text-[#10243a] dark:text-white lg:text-[20px]">
            Flutter Developer | Backend Enthusiast
          </h3>

          <p className={`${paragraphClass} mx-auto mt-4 max-w-[520px] lg:mx-0`}>
            I build modern, scalable and user-friendly mobile & web applications
            that solve real world problems.
          </p>

          <div className="mt-7 flex flex-wrap justify-center gap-4 lg:justify-start">
            <a href="#contact" onClick={(event) => scrollToSection(event, "contact")} className={gradientButton}>
              Hire Me
              <FaArrowRight className="ml-2 text-[12px]" />
            </a>

            <a href="#about" onClick={(event) => scrollToSection(event, "about")} className={outlineButton}>
              Download CV
              <span className="ml-3">⇩</span>
            </a>
          </div>

          <div className="mt-4 flex justify-center gap-3 lg:justify-start">
            <SocialButton href="https://linkedin.com">
              <FaLinkedinIn />
            </SocialButton>

            <SocialButton href="https://github.com">
              <FaGithub />
            </SocialButton>

            <SocialButton href="https://twitter.com">
              <FaTwitter />
            </SocialButton>

            <SocialButton href="mailto:raja@example.com">
              <FaEnvelope />
            </SocialButton>
          </div>

          <div className="mt-10 flex justify-center lg:justify-start">
            {[
              ["50+", "Projects Completed"],
              ["3+", "Years Experience"],
              ["100%", "Client Satisfaction"],
            ].map((item, index) => (
              <div
                key={item[1]}
                className={`min-w-0 flex-1 px-2 first:pl-0 sm:min-w-[140px] sm:flex-none sm:px-4 ${
                  index !== 0 ? "border-l border-[#19334a]" : ""
                }`}
              >
                <strong className="block text-[32px] font-bold text-[#10243a] dark:text-white">
                  {item[0]}
                </strong>

                <span className="mt-1 block text-[14px] text-[#586e82] dark:text-[#90a3b6]">
                  {item[1]}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT */}
        <div data-parallax="-0.24" className="relative mx-auto flex h-[430px] w-full max-w-[520px] sm:h-[520px] items-end justify-center will-change-transform motion-reduce:transform-none lg:h-[620px]">
          {/* blue background shape */}
          <div className="absolute bottom-0 left-1/2 h-[400px] w-[270px] -translate-x-1/2 sm:h-[500px] sm:w-[355px] overflow-hidden rounded-t-[190px] bg-gradient-to-br from-[#0aaaff] via-[#1766ed] to-[#5935df] opacity-85 lg:h-[545px] lg:w-[390px]" />

          <div className="absolute bottom-[60px] left-[12%] h-[240px] w-[240px] sm:bottom-[80px] sm:left-[20%] sm:h-[330px] sm:w-[330px] rounded-full border border-[#1e78fa]/30" />

          <div className="absolute top-[88px] right-[5px] grid grid-cols-8 gap-[7px] opacity-25">
            {Array.from({ length: 56 }).map((_, i) => (
              <span
                key={i}
                className="h-[3px] w-[3px] animate-pulse rounded-full bg-[#09b9ff] shadow-[0_0_7px_#09b9ff]"
              />
            ))}
          </div>

          <img
            src={heroPortrait}
            alt="Raja Kumar"
            className="relative z-10 h-[420px] max-w-none sm:h-[510px] object-contain object-bottom lg:h-[590px]"
          />

          <div data-parallax="0.34" className="absolute top-[140px] left-[1%] z-20 hidden font-serif text-[28px] leading-[1.1] italic text-[#4f5fa9] dark:text-[#cdd7ff] lg:block">
            Build
            <br />
            Learn
            <br />
            Grow
            <div className="mt-2 h-[2px] w-20 rotate-[-8deg] bg-[#7250ff]" />
          </div>

          <div data-parallax="-0.42" className="absolute top-[145px] right-0 z-20 w-[110px] sm:top-[170px] sm:w-[135px] rounded-[16px] border border-[#bcd7e8] bg-white/95 dark:border-[#23415c] dark:bg-[#0a2137]/95 p-3 sm:p-5 shadow-[0_20px_70px_rgba(0,0,0,.2)]">
            <div className="mb-4 grid h-10 w-10 place-items-center rounded-full border border-[#6fc9ee] bg-[#e4f6fd] dark:border-[#137ec7] dark:bg-[#092b45] text-[#00b8ff]">
              <FaCode className="text-[20px]" />
            </div>

            <p className="text-[12px] leading-[1.45] sm:text-[14px] font-semibold text-[#10243a] dark:text-white">
              Turning
              <br />
              Ideas into
              <br />
              Real Solutions
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}



/* =========================================================
   EXPERTISE STRIP
========================================================= */

function ExpertiseStrip() {
  const items = [
    "Flutter Apps",
    "Web Development",
    "Backend APIs",
    "Dashboard Design",
    "UI Implementation",
    "Flutter Apps",
    "Web Development",
    "Backend APIs",
    "Dashboard Design",
    "UI Implementation",
  ];

  return (
    <section
      className="
        group relative overflow-hidden border-y border-[#5d63ff]/30
        bg-gradient-to-r from-[#087ef5] via-[#4d5cf6] to-[#7043ff] py-4
      "
    >
      <div
        className="
          flex w-max items-center whitespace-nowrap
          animate-[portfolio-marquee_24s_linear_infinite]
          group-hover:[animation-play-state:paused]
        "
      >
        {items.map((item, index) => (
          <div
            key={`${item}-${index}`}
            className="flex items-center text-[15px] font-semibold text-white sm:text-[17px]"
          >
            <span className="px-8">{item}</span>
            <span className="text-[18px] text-[#bff5ff]">✦</span>
          </div>
        ))}
      </div>

      <style>{`
        @keyframes portfolio-marquee {
          from {
            transform: translateX(0);
          }

          to {
            transform: translateX(-50%);
          }
        }
      `}</style>
    </section>
  );
}


/* =========================================================
   ABOUT
========================================================= */

function About() {
  const info = [
    [FiUser, "Name", "Raja Kumar"],
    [FiMail, "Email", "raja@example.com"],
    [FiMapPin, "Location", "Bengaluru, India"],
    [FiBriefcase, "Availability", "Open to opportunities"],
  ];

  return (
    <section
      id="about"
      className={`${sectionClass} grid grid-cols-1 items-center gap-10 lg:grid-cols-[1.05fr_1.1fr_.58fr]`}
    >
      <div data-tilt className="overflow-hidden rounded-[13px] transition-all duration-300 will-change-transform">
        <img
          src="https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=1000&q=85"
          alt="Developer workspace"
          data-parallax="0.16" className="h-[340px] w-full scale-110 object-cover will-change-transform motion-reduce:transform-none"
        />
      </div>

      <div>
        <SectionTitle tag="ABOUT ME">
          Passionate about building
          <br />
          digital experiences
        </SectionTitle>

        <p className={`${paragraphClass} mt-5`}>
          I'm a Flutter developer with experience in building cross-platform
          mobile applications, REST APIs, and modern web solutions. I love
          turning ideas into real products and continuously learning new
          technologies.
        </p>

        <a href="#projects" onClick={(event) => scrollToSection(event, "projects")} className={`${outlineButton} mt-6 h-[42px] px-6`}>
          Learn More
          <span className="ml-3">→</span>
        </a>
      </div>

      <div className="border-l border-[#c9dce9] dark:border-[#18334a] pl-5">
        {info.map(([Icon, label, value]) => (
          <div key={label} className="mb-3 flex gap-3 last:mb-0">
            <div className="grid h-12 w-12 shrink-0 place-items-center rounded-lg bg-[#e5eff8] dark:bg-[#112b45] text-[#8f86ff]">
              <Icon className="text-[20px]" />
            </div>

            <div>
              <div className="text-[16px] font-semibold text-[#10243a] dark:text-white">
                {label}
              </div>
              <div className="mt-1 text-[16px] text-[#52687b] dark:text-[#a5b5c6]">{value}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* =========================================================
   SKILLS
========================================================= */

function Skills() {
  const [showAll, setShowAll] = useState(false);
  const visibleSkills = showAll ? skills : skills.slice(0, 8);

  const toggleSkills = () => {
    if (showAll) scrollToSection(null, "skills");
    setShowAll((current) => !current);
  };

  return (
    <section id="skills" className={sectionClass}>
      <div className="mb-5 flex flex-row items-end justify-between gap-3 sm:mb-7 md:mb-8">
        <SectionTitle tag="MY SKILLS">Technologies I Work With</SectionTitle>

        <div className="shrink-0 items-end gap-10 sm:flex">
          <p className="hidden max-w-[355px] text-[16px] leading-6 text-[#52697d] dark:text-[#98aabd] md:block">
            I work with modern technologies to build fast, scalable and
            maintainable applications.
          </p>

          <button type="button" onClick={toggleSkills} aria-expanded={showAll} className="whitespace-nowrap rounded-full border border-[#9dd9ee] px-3 py-2 text-[11px] font-semibold text-[#078fc8] transition-all duration-300 hover:translate-x-1 hover:bg-[#e5f7fd] dark:border-[#174b67] dark:text-[#08b9ff] dark:hover:bg-[#0b2940] sm:px-4 sm:text-[14px]">{showAll ? "Collapse ↑" : `View All (${skills.length}) →`}</button>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2 sm:grid-cols-4 sm:gap-3 md:grid-cols-5 lg:grid-cols-8">
        {visibleSkills.map(([name, icon], index) => (
          <article
            key={name}
            style={{ animationDelay: `${Math.min(index, 16) * 45}ms` }}

            className="group flex min-h-[92px] animate-skill-in flex-col items-center justify-center gap-2 rounded-[10px] p-2 sm:min-h-[120px] sm:gap-3 sm:rounded-[11px] sm:p-3 border border-[#c9dce9] dark:border-[#19384f] bg-white dark:bg-[#092034] transition-all duration-300 hover:-translate-y-3 hover:scale-105 hover:border-[#0bbcff] hover:shadow-[0_18px_45px_rgba(9,185,255,.22)] active:scale-95"
          >
            <img
              src={`/tech/${icon}.png`}
              alt={name}
              className="h-10 w-10 object-contain transition duration-300 group-hover:scale-110 sm:h-14 sm:w-14 lg:h-16 lg:w-16"
            />

            <span className="max-w-full truncate text-[11px] font-medium text-[#263f55] dark:text-[#d6e2ed] sm:text-[14px] lg:text-[16px]">{name}</span>
          </article>
        ))}
      </div>
    </section>
  );
}

/* =========================================================
   PROJECTS
========================================================= */


function Services() {
  const services = [
    {
      icon: FaMobileAlt,
      number: "01",
      title: "Mobile Development",
      description: "Polished cross-platform Flutter applications with responsive interfaces, smooth performance, and production-ready architecture.",
      accent: "from-[#08b9ff] to-[#3578ff]",
    },
    {
      icon: FaServer,
      number: "02",
      title: "Backend & APIs",
      description: "Secure REST APIs, database design, authentication, integrations, and scalable backend services built for real products.",
      accent: "from-[#3578ff] to-[#7354ff]",
    },
    {
      icon: FaLayerGroup,
      number: "03",
      title: "Full Product Build",
      description: "From product planning and UI implementation to deployment, maintenance, analytics, and continuous improvements.",
      accent: "from-[#7354ff] to-[#b24cff]",
    },
  ];

  return (
    <section id="services" className={`${sectionClass} relative overflow-hidden`}>
      <div data-parallax="0.24" className="pointer-events-none absolute -top-20 right-[12%] h-56 w-56 animate-pulse rounded-full bg-[#0bbcff]/10 blur-[70px]" />
      <div className="relative z-10 mb-9 flex flex-col justify-between gap-5 md:flex-row md:items-end">
        <SectionTitle tag="WHAT I DO">Services That Turn Ideas Into Products</SectionTitle>
        <p className={`${paragraphClass} max-w-[480px]`}>
          I combine thoughtful interfaces with reliable engineering to take a product from its first concept to a confident launch.
        </p>
      </div>

      <div className="relative z-10 grid grid-cols-1 gap-5 md:grid-cols-3">
        {services.map(({ icon: Icon, number, title, description, accent }, index) => (
          <article
            key={title}
            data-tilt
            className="group relative overflow-hidden rounded-2xl border border-[#c9dce9] bg-white p-7 transition-all duration-500 hover:border-[#0bbcff] hover:shadow-[0_25px_70px_rgba(11,188,255,.18)] dark:border-[#19384f] dark:bg-[#092034]"
          >
            <div className={`absolute inset-x-0 top-0 h-1 origin-left scale-x-0 bg-gradient-to-r ${accent} transition-transform duration-500 group-hover:scale-x-100`} />
            <span className="absolute top-5 right-6 text-5xl font-black text-[#0d3854]/8 transition-all duration-500 group-hover:scale-125 group-hover:text-[#0bbcff]/15 dark:text-white/5">{number}</span>
            <div className={`mb-6 grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br ${accent} text-xl text-white shadow-lg transition-all duration-500 group-hover:-translate-y-2 group-hover:rotate-6 group-hover:scale-110`}>
              <Icon />
            </div>
            <h3 className="text-xl font-bold text-[#10243a] dark:text-white">{title}</h3>
            <p className={`${paragraphClass} mt-3`}>{description}</p>
            <a href="#contact" onClick={(event) => scrollToSection(event, "contact")} className="mt-6 inline-flex items-center gap-2 font-semibold text-[#078fc8] transition-all duration-300 group-hover:gap-4 dark:text-[#0bbcff]">
              Start a project <FaArrowRight className="text-xs" />
            </a>
          </article>
        ))}
      </div>

      <div className="relative z-10 mt-10 grid grid-cols-2 gap-3 rounded-2xl border border-[#c9dce9] bg-white/70 p-4 backdrop-blur-md dark:border-[#19384f] dark:bg-[#071b2c]/70 md:grid-cols-4">
        {["Discover", "Design", "Develop", "Launch"].map((step, index) => (
          <div key={step} className="group flex items-center gap-3 rounded-xl p-3 transition duration-300 hover:bg-[#e8f6fc] dark:hover:bg-[#102b42]">
            <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-gradient-to-br from-[#0bbcff] to-[#7051ff] text-sm font-bold text-white transition duration-300 group-hover:rotate-12 group-hover:scale-110">{index + 1}</span>
            <span className="font-semibold text-[#29445b] dark:text-[#d8e5ef]">{step}</span>
            {index === 3 && <FaRocket className="ml-auto animate-bounce text-[#7051ff]" />}
          </div>
        ))}
      </div>
    </section>
  );
}
function ValueSection() {
  const values = [
    [FiTarget, "Product-first thinking", "I connect technical decisions to the user problem, business goal, and experience we want to create.", "from-[#0bc8e8] to-[#2388ff]"],
    [FaLayerGroup, "Built to scale", "Clean architecture, reusable components, and maintainable code keep products ready for growth.", "from-[#347cff] to-[#7254ff]"],
    [FiCheckCircle, "Reliable delivery", "Clear communication, thoughtful testing, and careful polish turn ideas into dependable products.", "from-[#7254ff] to-[#ad55e8]"],
  ];

  return (
    <section id="value" className={`${sectionClass} relative overflow-hidden`}>
      <div data-parallax="-0.18" className="pointer-events-none absolute -right-20 top-10 h-64 w-64 rounded-full bg-[#7051ff]/10 blur-[90px]" />
      <div className="relative z-10 grid gap-10 lg:grid-cols-[.72fr_1.28fr] lg:items-center">
        <div>
          <SectionTitle tag="WHY WORK WITH ME">More than clean code</SectionTitle>
          <p className={`${paragraphClass} mt-5 max-w-[520px]`}>I bring product thinking, engineering discipline, and a strong eye for detail to every project—from the first conversation to launch.</p>
          <a href="#contact" onClick={(event) => scrollToSection(event, "contact")} className={`${outlineButton} mt-6`}>
            Discuss your idea <FaArrowRight className="ml-3 text-xs" />
          </a>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {values.map(([Icon, title, description, accent]) => (
            <article key={title} className="group relative overflow-hidden rounded-2xl border border-[#c9dce9] bg-white p-6 transition-all duration-500 hover:-translate-y-2 hover:border-[#0bbcff] hover:shadow-[0_22px_60px_rgba(11,188,255,.16)] dark:border-[#19384f] dark:bg-[#092034]">
              <div className={`mb-5 grid h-12 w-12 place-items-center rounded-xl bg-gradient-to-br ${accent} text-lg text-white shadow-lg transition-transform duration-500 group-hover:rotate-6 group-hover:scale-110`}><Icon /></div>
              <h3 className="text-[18px] font-bold text-[#10243a] dark:text-white">{title}</h3>
              <p className={`${paragraphClass} mt-3 text-[14px]`}>{description}</p>
              <div className={`absolute inset-x-0 bottom-0 h-1 origin-left scale-x-0 bg-gradient-to-r ${accent} transition-transform duration-500 group-hover:scale-x-100`} />
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Projects() {
  const [selectedProject, setSelectedProject] = useState(null);

  useEffect(() => {
    if (!selectedProject) return undefined;
    const closeOnEscape = (event) => {
      if (event.key === "Escape") setSelectedProject(null);
    };
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", closeOnEscape);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [selectedProject]);

  return (
    <section id="projects" className={sectionClass}>
      <div className="mb-8 flex items-end justify-between">
        <SectionTitle tag="FEATURED PROJECTS">Some of My Work</SectionTitle>

        <span className="hidden text-[14px] font-semibold text-[#08b9ff] sm:block">{projects.length} selected projects</span>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <article
            key={project.title}
            data-tilt
            className="group overflow-hidden rounded-[11px] border border-[#c9dce9] dark:border-[#19384f] bg-white dark:bg-[#092034] transition-all duration-300 will-change-transform hover:border-[#0bbcff]"
          >
            <div className="relative h-[175px] overflow-hidden">
              <img
                src={project.image}
                alt={project.title}
                className="h-full w-full object-cover transition duration-700 ease-out group-hover:scale-115 group-hover:rotate-1"
              />

              <span className="absolute bottom-2 left-3 rounded-full bg-white/95 px-3 py-1 text-[12px] text-[#27445b] shadow-sm dark:bg-[#172f44]/90 dark:text-white">
                {project.type}
              </span>

              <button type="button" onClick={() => setSelectedProject(project)} aria-label={`View ${project.title} case study`} className="absolute top-3 right-3 grid h-8 w-8 place-items-center rounded-lg bg-white/95 text-[#27445b] shadow-sm transition hover:scale-110 hover:text-[#078fc8] dark:bg-[#10283b]/90 dark:text-white">
                ↗
              </button>
            </div>

            <div className="p-5">
              <h3 className="text-[18px] font-bold text-[#10243a] dark:text-white">{project.title}</h3>

              <p className={`${paragraphClass} mt-2 min-h-[48px]`}>
                {project.description}
              </p>

              <div className="mt-4 flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className={`rounded-full px-3 py-[5px] text-[12px] ${
                      tag === "REST API"
                        ? "bg-[#ebe9ff] text-[#5142ae] dark:bg-[#393384] dark:text-[#d7d0ff]"
                        : "bg-[#e4f2f8] text-[#365a70] dark:bg-[#12364e] dark:text-[#c6d8e6]"
                    }`}
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <button type="button" onClick={() => setSelectedProject(project)} className="mt-5 inline-flex items-center gap-2 text-[13px] font-semibold text-[#078fc8] transition hover:gap-3 dark:text-[#0bbcff]">
                View case study <FaArrowRight className="text-[10px]" />
              </button>
            </div>
          </article>
        ))}
      </div>

      {selectedProject && (
        <div role="presentation" onMouseDown={(event) => event.target === event.currentTarget && setSelectedProject(null)} className="fixed inset-0 z-[100] grid place-items-center bg-[#03101d]/75 p-4 backdrop-blur-md">
          <article role="dialog" aria-modal="true" aria-labelledby="case-study-title" className="relative max-h-[90vh] w-full max-w-[760px] overflow-y-auto rounded-3xl border border-[#b8d7e8] bg-[#f7fbfd] p-6 shadow-[0_35px_100px_rgba(0,0,0,.38)] dark:border-[#23435c] dark:bg-[#071b2c] sm:p-9">
            <button type="button" onClick={() => setSelectedProject(null)} aria-label="Close case study" className="absolute right-5 top-5 grid h-10 w-10 place-items-center rounded-full border border-[#c9dce9] bg-white text-[#29465e] transition hover:rotate-90 hover:border-[#0bbcff] hover:text-[#078fc8] dark:border-[#23435c] dark:bg-[#102b42] dark:text-white"><FiX className="text-xl" /></button>
            <span className="text-[12px] font-bold uppercase tracking-[2px] text-[#0aaeea]">{selectedProject.type} · Case Study</span>
            <h3 id="case-study-title" className="mt-3 pr-12 text-[30px] font-bold tracking-[-1px] text-[#10243a] dark:text-white">{selectedProject.title}</h3>
            <p className={`${paragraphClass} mt-3`}>{selectedProject.description}</p>
            <div className="mt-7 grid gap-6 sm:grid-cols-2">
              <div><h4 className="font-bold text-[#10243a] dark:text-white">The challenge</h4><p className={`${paragraphClass} mt-2 text-[14px]`}>{selectedProject.challenge}</p></div>
              <div><h4 className="font-bold text-[#10243a] dark:text-white">My approach</h4><p className={`${paragraphClass} mt-2 text-[14px]`}>{selectedProject.approach}</p></div>
            </div>
            <div className="mt-7 rounded-2xl border border-[#c9dce9] bg-white/70 p-5 dark:border-[#19384f] dark:bg-[#092034]">
              <h4 className="font-bold text-[#10243a] dark:text-white">Key contributions</h4>
              <div className="mt-3 grid gap-2 sm:grid-cols-3">{selectedProject.contribution.map((item) => <span key={item} className="flex items-center gap-2 text-[13px] text-[#526a7e] dark:text-[#a9bbca]"><FiCheckCircle className="shrink-0 text-[#0bbcff]" />{item}</span>)}</div>
            </div>
            <div className="mt-6 flex flex-wrap gap-2">{selectedProject.tags.map((tag) => <span key={tag} className="rounded-full bg-[#e4f2f8] px-3 py-1.5 text-[12px] text-[#365a70] dark:bg-[#12364e] dark:text-[#c6d8e6]">{tag}</span>)}</div>
          </article>
        </div>
      )}
    </section>
  );
}

/* =========================================================
   MY PROCESS
========================================================= */

function Process() {
  const steps = [
    {
      number: "01",
      title: "Discover",
      description:
        "Understand goals, users, requirements, challenges and the problem deeply.",
      icon: FiSearch,
      gradient: "from-[#11c7c3] to-[#0bbcff]",
    },
    {
      number: "02",
      title: "Define",
      description:
        "Analyse insights and define the right product direction and technical approach.",
      icon: FiTarget,
      gradient: "from-[#0bbcff] to-[#4479ff]",
    },
    {
      number: "03",
      title: "Design",
      description:
        "Create clean interfaces, thoughtful user flows and scalable product architecture.",
      icon: FiEdit3,
      gradient: "from-[#7051ff] to-[#9b5cff]",
    },
    {
      number: "04",
      title: "Prototype",
      description:
        "Build interactive prototypes and validate the experience before final development.",
      icon: FiPlay,
      gradient: "from-[#ff7c72] to-[#ff5e74]",
    },
    {
      number: "05",
      title: "Deliver",
      description:
        "Polish, test, optimise and launch a reliable product ready for real users.",
      icon: FiCheckCircle,
      gradient: "from-[#28c995] to-[#0bbcff]",
    },
  ];

  return (
    <section
      id="process"
      className={`${sectionClass} relative overflow-hidden`}
    >
      {/* background glow */}
      <div
        className="
          pointer-events-none
          absolute left-1/2 top-1/2
          h-[380px] w-[650px]
          -translate-x-1/2 -translate-y-1/2
          rounded-full
          bg-[#0bbcff]/5
          blur-[100px]

          dark:bg-[#0bbcff]/[.04]
        "
      />

      {/* =====================================================
          TITLE
      ===================================================== */}
      <div className="relative z-10 mb-12 text-center">
        <div className="mb-3 flex items-center justify-center gap-3">
          <span className="h-[2px] w-7 bg-[#09b9ff]" />

          <span
            className="
              text-[13px]
              font-semibold
              tracking-[1.8px]
              text-[#0bbcff]
              sm:text-[14px]
            "
          >
            MY PROCESS
          </span>

          <span className="h-[2px] w-7 bg-[#09b9ff]" />
        </div>

        <h2
          className="
            text-[28px]
            font-bold
            leading-[1.1]
            tracking-[-1px]
            text-[#10243a]

            dark:text-white

            md:text-[34px]
          "
        >
          A thoughtful process for great results.
        </h2>

        <p
          className="
            mx-auto mt-4
            max-w-[650px]
            text-[15px]
            leading-7
            text-[#5e7487]

            dark:text-[#91a6ba]
          "
        >
          Every project follows a clear process from understanding the idea
          to designing, developing and delivering a polished final product.
        </p>
      </div>

      {/* =====================================================
          PROCESS STEPS
      ===================================================== */}
      <div
        className="
          relative z-10
          grid grid-cols-1
          gap-8

          sm:grid-cols-2

          lg:grid-cols-5
          lg:gap-4
        "
      >
        {/* desktop connector line */}
        <div
          className="
            absolute
            left-[10%]
            right-[10%]
            top-[36px]
            hidden
            h-[2px]
            bg-gradient-to-r
            from-[#10c6c0]/20
            via-[#7051ff]/40
            to-[#11c58c]/20

            lg:block
          "
        />

        {steps.map(
          (
            {
              number,
              title,
              description,
              icon: Icon,
              gradient,
            },
            index,
          ) => (
            <article
              key={title}
              className="
                group
                relative
                flex
                flex-col
                items-center
                text-center
              "
            >
              {/* =================================================
                  ICON CIRCLE
              ================================================= */}
              <div className="relative z-10">
                <div
                  className={`
                    grid h-[72px] w-[72px]
                    place-items-center
                    rounded-full
                    bg-gradient-to-br ${gradient}
                    text-white

                    shadow-[0_14px_35px_rgba(11,188,255,.18)]

                    transition-all
                    duration-500

                    group-hover:-translate-y-2
                    group-hover:scale-110
                    group-hover:shadow-[0_18px_45px_rgba(11,188,255,.30)]
                  `}
                >
                  <Icon className="text-[27px]" />
                </div>

                {/* outer ring */}
                <div
                  className="
                    absolute
                    -inset-[6px]
                    -z-10
                    rounded-full
                    border border-[#bcdce9]

                    transition-all duration-500

                    group-hover:scale-110
                    group-hover:border-[#0bbcff]

                    dark:border-[#19384f]
                  "
                />
              </div>

              {/* connector dot */}
              {index !== steps.length - 1 && (
                <span
                  className="
                    absolute
                    right-[-9px]
                    top-[33px]
                    hidden
                    h-2.5 w-2.5
                    rounded-full
                    bg-[#0bbcff]
                    shadow-[0_0_12px_rgba(11,188,255,.6)]

                    lg:block
                  "
                />
              )}

              {/* =================================================
                  NUMBER
              ================================================= */}
              <span
                className="
                  mt-3
                  text-[16px]
                  font-bold
                  tracking-[1.5px]
                  text-[#0bbcff]
                "
              >
                {number}
              </span>

              {/* =================================================
                  TITLE
              ================================================= */}
              <h3
                className="
                  mt-1
                  text-[17px]
                  font-bold
                  text-[#10243a]

                  transition-colors
                  duration-300

                  group-hover:text-[#078fc8]

                  dark:text-white
                  dark:group-hover:text-[#0bbcff]
                "
              >
                {title}
              </h3>

              {/* =================================================
                  DESCRIPTION
              ================================================= */}
              <p
                className="
                  mt-3
                  max-w-[220px]
                  text-[13px]
                  leading-[1.65]
                  text-[#61778a]

                  dark:text-[#91a6ba]
                "
              >
                {description}
              </p>
            </article>
          ),
        )}
      </div>
    </section>
  );
}


/* =========================================================
   EXPERIENCE
========================================================= */


function Blog() {
  const articles = [
    ["CASE STUDY", "Building a Scalable Flutter App", "How clean architecture, caching, and careful state management keep a growing mobile product fast.", "May 20, 2026 · 6 min read", "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?auto=format&fit=crop&w=900&q=85"],
    ["TUTORIAL", "Secure Authentication with JWT", "A practical approach to access tokens, refresh flows, protected APIs, and safer user sessions.", "Apr 28, 2026 · 5 min read", "https://images.unsplash.com/photo-1563013544-824ae1b704d3?auto=format&fit=crop&w=900&q=85"],
    ["INSIGHTS", "Performance Tips for Modern Apps", "Simple improvements that make mobile and web experiences faster, smoother, and more reliable.", "Apr 10, 2026 · 4 min read", "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=900&q=85"],
  ];

  return (
    <section id="blog" className={`${sectionClass} relative overflow-hidden`}>
      <div data-parallax="-0.20" className="pointer-events-none absolute -left-20 top-16 h-64 w-64 animate-pulse rounded-full bg-[#7051ff]/10 blur-[85px]" />
      <div className="relative z-10 mb-8 flex items-end justify-between gap-4">
        <SectionTitle tag="LATEST INSIGHTS">Blog & Case Studies</SectionTitle>
        <button className="hidden text-[14px] font-semibold text-[#078fc8] transition hover:translate-x-1 dark:text-[#08b9ff] sm:block">View All Articles →</button>
      </div>
      <div className="relative z-10 grid grid-cols-1 gap-5 md:grid-cols-3">
        {articles.map(([type, title, description, meta, image], index) => (
          <article key={title} data-tilt className="group overflow-hidden rounded-2xl border border-[#c9dce9] bg-white transition-all duration-500 hover:border-[#0bbcff] dark:border-[#19384f] dark:bg-[#092034]">
            <div className="relative h-44 overflow-hidden">
              <img src={image} alt="" className="h-full w-full object-cover transition duration-700 group-hover:scale-110 group-hover:rotate-1" />
              <span className="absolute top-3 left-3 rounded-full bg-white/90 px-3 py-1 text-[11px] font-bold text-[#078fc8] backdrop-blur dark:bg-[#071b2c]/90 dark:text-[#0bbcff]">{type}</span>
            </div>
            <div className="p-5">
              <h3 className="text-[19px] font-bold text-[#10243a] transition group-hover:text-[#078fc8] dark:text-white dark:group-hover:text-[#0bbcff]">{title}</h3>
              <p className={`${paragraphClass} mt-2`}>{description}</p>
              <div className="mt-5 flex items-center justify-between border-t border-[#dce8ef] pt-4 dark:border-[#19384f]">
                <span className="text-[12px] text-[#61788b] dark:text-[#8fa4b7]">{meta}</span>
                <button aria-label={`Read ${title}`} className="grid h-9 w-9 place-items-center rounded-full bg-[#e6f5fc] text-[#078fc8] transition-all duration-300 group-hover:translate-x-1 group-hover:scale-110 dark:bg-[#102b42] dark:text-[#0bbcff]"><FaArrowRight className="text-xs" /></button>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
function Experience() {
  const experience = [
    [
      "2023 - Present",
      "Flutter Developer",
      "ABC Technologies, Bengaluru",
      "Working on cross-platform mobile apps, integrating APIs, and building scalable solutions.",
    ],
    [
      "2021 - 2023",
      "Junior Developer",
      "XYZ Solutions, Noida",
      "Worked on web applications using Laravel and MySQL.",
    ],
  ];

  return (
    <section id="experience" className={sectionClass}>
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-[70%_30%]">
        <div>
          <SectionTitle tag="WORK EXPERIENCE">My Journey</SectionTitle>

          <div className="relative mt-8 border-l-2 border-[#0bbcff] pl-8">
            {experience.map(([date, role, company, description]) => (
              <div
                key={date}
                className="relative grid pb-8 md:grid-cols-[165px_1fr]"
              >
                <span className="absolute top-[5px] -left-[39px] h-[12px] w-[12px] rounded-full bg-[#0bbcff] shadow-[0_0_15px_rgba(11,188,255,.6)]" />

                <div className="mb-3 text-[16px] font-semibold text-[#10243a] dark:text-white
            transition-all duration-300 hover:scale-110 hover:rotate-6 hover:border-[#0bbcff] hover:text-[#0bbcff] active:scale-90 md:mb-0">
                  {date}
                </div>

                <div>
                  <h3 className="text-[18px] font-bold text-[#10243a] dark:text-white">{role}</h3>

                  <p className="mt-1 text-[16px] text-[#425c72] dark:text-[#bac8d6]">{company}</p>

                  <p className="mt-1 max-w-[500px] text-[16px] leading-[1.55] text-[#536c80] dark:text-[#91a6ba]">
                    {description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="hidden items-center justify-center lg:flex">
          <div className="-rotate-8 font-serif text-[30px] leading-[1.05] italic text-[#5663a8] dark:text-[#d0d5ff]">
            Small
            <br />
            Steps
            <br />
            Big Results
            <div className="mt-3 h-[2px] w-28 rotate-[-10deg] bg-[#6a53ff]" />
          </div>
        </div>
      </div>
    </section>
  );
}

function ProfileHighlights() {
  const highlights = [
    [FaMobileAlt, "Mobile-first craft", "Cross-platform Flutter experiences designed for clarity, speed, and real-world use."],
    [FaLayerGroup, "Full-stack thinking", "Frontend, APIs, databases, and deployment considered as one connected product."],
    [FiUsers, "Collaborative delivery", "Clear communication, visible progress, and thoughtful decisions throughout the build."],
    [FiTrendingUp, "Growth mindset", "Consistent learning and iteration to keep products maintainable and ready to scale."],
  ];

  return (
    <section id="profile" className={`${sectionClass} relative overflow-hidden scroll-mt-[82px]`}>
      <div className="pointer-events-none absolute -right-28 top-0 h-72 w-72 rounded-full bg-[#0bbcff]/10 blur-[90px]" />
      <div className="relative z-10 grid gap-10 lg:grid-cols-[.72fr_1.28fr] lg:items-start">
        <div>
          <SectionTitle tag="PROFILE HIGHLIGHTS">What I Bring to a Team</SectionTitle>
          <p className={`${paragraphClass} mt-5 max-w-[480px]`}>
            I combine hands-on development with a product-focused approach—turning requirements into reliable experiences that are easy to use and maintain.
          </p>
          <div className="mt-7 grid grid-cols-2 gap-3">
            {[["32+", "Technologies"], ["3", "Featured projects"], ["Mobile + Web", "Product platforms"], ["Open", "To opportunities"]].map(([value, label]) => (
              <div key={label} className="rounded-xl border border-[#c9dce9] bg-white/70 p-4 dark:border-[#19384f] dark:bg-[#092034]/70">
                <strong className="block text-[20px] text-[#10243a] dark:text-white">{value}</strong>
                <span className="mt-1 block text-[12px] text-[#60768a] dark:text-[#91a6ba]">{label}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {highlights.map(([Icon, title, description], index) => (
            <article key={title} data-tilt className="group rounded-2xl border border-[#c9dce9] bg-white p-6 transition-all duration-300 hover:border-[#0bbcff] dark:border-[#19384f] dark:bg-[#092034]">
              <div className="flex items-start justify-between gap-4">
                <span className="grid h-12 w-12 place-items-center rounded-xl bg-[#e5f4fb] text-xl text-[#078fc8] transition-all duration-300 group-hover:rotate-6 group-hover:bg-[#0bbcff] group-hover:text-white dark:bg-[#102d45] dark:text-[#0bbcff]"><Icon /></span>
                <span className="text-[11px] font-bold tracking-[2px] text-[#91a6ba]">0{index + 1}</span>
              </div>
              <h3 className="mt-5 text-[18px] font-bold text-[#10243a] dark:text-white">{title}</h3>
              <p className={`${paragraphClass} mt-2 text-[14px]`}>{description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function LearningJourney() {
  const learning = [
    [FiBookOpen, "Mobile Engineering", "Flutter, Dart, responsive interfaces, app architecture, and performance."],
    [FaServer, "Backend Development", "REST APIs, authentication, relational data, Firebase, Laravel, and Node.js."],
    [FiAward, "Cloud & Delivery", "Deployment workflows, Docker, cloud platforms, monitoring, and reliable releases."],
  ];

  return (
    <section id="learning" className={`${sectionClass} scroll-mt-[82px]`}>
      <div className="mb-9 flex flex-col justify-between gap-5 md:flex-row md:items-end">
        <SectionTitle tag="LEARNING JOURNEY">Knowledge That Keeps Growing</SectionTitle>
        <p className={`${paragraphClass} max-w-[500px]`}>
          My development path is built around applied learning: understanding the foundations, using them in projects, and improving through feedback.
        </p>
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        {learning.map(([Icon, title, description]) => (
          <article key={title} className="group relative overflow-hidden rounded-2xl border border-[#c9dce9] bg-white/80 p-6 transition-all duration-300 hover:-translate-y-2 hover:border-[#7051ff] hover:shadow-[0_20px_55px_rgba(112,81,255,.12)] dark:border-[#19384f] dark:bg-[#081e32]/80">
            <span className="absolute right-0 top-0 h-24 w-24 translate-x-9 -translate-y-9 rounded-full bg-[#7051ff]/10 transition-transform duration-500 group-hover:scale-150" />
            <Icon className="relative text-[25px] text-[#7051ff] dark:text-[#9b8cff]" />
            <h3 className="relative mt-5 text-[18px] font-bold text-[#10243a] dark:text-white">{title}</h3>
            <p className={`${paragraphClass} relative mt-2 text-[14px]`}>{description}</p>
          </article>
        ))}
      </div>
      <p className="mt-5 text-[12px] text-[#71879a] dark:text-[#7f94a8]">
        Formal education and verified certifications can be added here when you are ready to share them.
      </p>
    </section>
  );
}

function CurrentFocus() {
  const focusAreas = [
    [FaMobileAlt, "Advanced Flutter", "Refining responsive UI, performance, animation, and scalable app architecture.", "01"],
    [FaServer, "Backend Systems", "Building secure APIs, robust data flows, authentication, and dependable integrations.", "02"],
    [FaRocket, "Cloud & Delivery", "Exploring smoother deployment, monitoring, automation, and production workflows.", "03"],
  ];

  return (
    <section id="focus" className={`${sectionClass} relative overflow-hidden`}>
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(120deg,rgba(11,188,255,.05),transparent_45%,rgba(112,81,255,.06))]" />
      <div className="relative z-10">
        <div className="mb-9 flex flex-col justify-between gap-5 md:flex-row md:items-end">
          <SectionTitle tag="CURRENTLY EXPLORING">Always learning. Always improving.</SectionTitle>
          <p className={`${paragraphClass} max-w-[470px]`}>Technology moves quickly. These are the areas I’m actively deepening to build faster, smarter, and more resilient products.</p>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {focusAreas.map(([Icon, title, description, number]) => (
            <article key={title} className="group flex gap-5 rounded-2xl border border-[#c9dce9] bg-white/80 p-6 backdrop-blur-sm transition-all duration-500 hover:-translate-y-2 hover:border-[#7051ff] hover:shadow-[0_22px_60px_rgba(112,81,255,.12)] dark:border-[#19384f] dark:bg-[#081e32]/80">
              <div className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-[#e4f5fc] text-xl text-[#078fc8] transition-all duration-500 group-hover:rotate-6 group-hover:bg-gradient-to-br group-hover:from-[#0bbcff] group-hover:to-[#7051ff] group-hover:text-white dark:bg-[#102d45] dark:text-[#0bbcff]"><Icon /></div>
              <div>
                <span className="text-[11px] font-bold tracking-[2px] text-[#7051ff] dark:text-[#9b8cff]">FOCUS {number}</span>
                <h3 className="mt-1 text-[18px] font-bold text-[#10243a] dark:text-white">{title}</h3>
                <p className={`${paragraphClass} mt-2 text-[14px]`}>{description}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* =========================================================
   TESTIMONIAL
========================================================= */

function Testimonial() {
  const [activeIndex, setActiveIndex] = useState(0);

  const testimonial = testimonials[activeIndex];

  const handlePrevious = () => {
    setActiveIndex((current) =>
      current === 0 ? testimonials.length - 1 : current - 1,
    );
  };

  const handleNext = () => {
    setActiveIndex((current) =>
      current === testimonials.length - 1 ? 0 : current + 1,
    );
  };

  return (
    <section id="testimonials" className={sectionClass}>
      {/* =====================================================
          TITLE
      ===================================================== */}
      <SectionTitle tag="TESTIMONIALS">What People Say</SectionTitle>

      {/* =====================================================
          SLIDER
      ===================================================== */}
      <div className="mt-8 flex items-center justify-center gap-3 sm:gap-5 md:gap-8">
        {/* LEFT BUTTON */}
        <button
          type="button"
          onClick={handlePrevious}
          aria-label="Previous testimonial"
          className="
            hidden h-12 w-12 shrink-0
            place-items-center rounded-full
            border border-[#c9dce9] dark:border-[#19384f]
            bg-white dark:bg-[#092034]
            text-[#10243a] dark:text-white
            transition-all duration-300
            hover:border-[#0bbcff]
            hover:bg-[#0d2942]
            hover:text-[#0bbcff]
            hover:scale-110 hover:rotate-6 hover:shadow-[0_0_28px_rgba(11,188,255,.38)] active:scale-90 active:-rotate-6
            md:grid
          "
        >
          <FiArrowLeft className="text-[21px]" />
        </button>

        {/* ===================================================
            TESTIMONIAL CARD
        =================================================== */}
        <article
          key={testimonial.id}
          data-tilt
          className="
            grid min-w-0 w-full max-w-[1000px] transition-all duration-300 hover:-translate-y-2 hover:border-[#0bbcff] hover:shadow-[0_22px_70px_rgba(9,185,255,.16)]
            grid-cols-[60px_minmax(0,1fr)] sm:grid-cols-[75px_minmax(0,1fr)]
            items-center gap-x-6 gap-y-4
            rounded-[12px]
            border border-[#c9dce9] dark:border-[#19384f]
            bg-white dark:bg-[#092034]
            px-4 py-5 sm:px-6 sm:py-7
            shadow-[0_18px_60px_rgba(0,0,0,0.12)]
            md:grid-cols-[90px_1fr_auto]
            md:px-8 md:py-8
          "
        >
          {/* PROFILE IMAGE */}
          <div
            className="
              h-[70px] w-[70px]
              overflow-hidden rounded-full
              border-[3px] border-[#dbe6ee]
              bg-[#e2f0f7] dark:bg-[#112c43]
              md:h-[90px] md:w-[90px]
            "
          >
            <img
              src={testimonial.image}
              alt={testimonial.name}
              className="h-full w-full object-cover object-top"
            />
          </div>

          {/* TEXT */}
          <div>
            <p className="max-w-[540px] text-[16px] leading-[1.7] text-[#51677a] dark:text-[#b4c1cf]">
              “{testimonial.message}”
            </p>

            <h4 className="mt-4 text-[16px] font-medium text-[#10243a] dark:text-white">
              {testimonial.name}
            </h4>

            <p className="mt-1 text-[12px] text-[#566c7f] dark:text-[#91a3b5] md:text-[16px]">
              {testimonial.designation}
            </p>
          </div>

          {/* STARS */}
          <div
            className="
              col-start-2
              flex items-center gap-[3px]
              self-end
              text-[#ffc400]
              md:col-auto
            "
          >
            {Array.from({ length: testimonial.rating }).map((_, index) => (
              <FaStar key={index} className="text-[18px]" />
            ))}
          </div>
        </article>

        {/* RIGHT BUTTON */}
        <button
          type="button"
          onClick={handleNext}
          aria-label="Next testimonial"
          className="
            hidden h-12 w-12 shrink-0
            place-items-center rounded-full
            border border-[#c9dce9] dark:border-[#19384f]
            bg-white dark:bg-[#092034]
            text-[#10243a] dark:text-white
            transition-all duration-300
            hover:border-[#0bbcff]
            hover:bg-[#0d2942]
            hover:text-[#0bbcff]
            hover:scale-110 hover:rotate-6 hover:shadow-[0_0_28px_rgba(11,188,255,.38)] active:scale-90 active:-rotate-6
            md:grid
          "
        >
          <FiArrowRight className="text-[21px]" />
        </button>
      </div>

      {/* =====================================================
          MOBILE ARROWS
      ===================================================== */}
      <div className="mt-5 flex justify-center gap-3 md:hidden">
        <button
          type="button"
          onClick={handlePrevious}
          aria-label="Previous testimonial"
          className="
            grid h-10 w-10 place-items-center
            rounded-full
            border border-[#c9dce9] dark:border-[#19384f]
            bg-white dark:bg-[#092034]
            text-[#10243a] dark:text-white
            transition-all duration-300 hover:scale-110 hover:rotate-6 hover:border-[#0bbcff] hover:text-[#0bbcff] active:scale-90
          "
        >
          <FiArrowLeft />
        </button>

        <button
          type="button"
          onClick={handleNext}
          aria-label="Next testimonial"
          className="
            grid h-10 w-10 place-items-center
            rounded-full
            border border-[#c9dce9] dark:border-[#19384f]
            bg-white dark:bg-[#092034]
            text-[#10243a] dark:text-white
            transition-all duration-300 hover:scale-110 hover:rotate-6 hover:border-[#0bbcff] hover:text-[#0bbcff] active:scale-90
          "
        >
          <FiArrowRight />
        </button>
      </div>

      {/* =====================================================
          PAGINATION DOTS
      ===================================================== */}
      <div className="mt-7 flex justify-center gap-2">
        {testimonials.map((item, index) => (
          <button
            key={item.id}
            type="button"
            onClick={() => setActiveIndex(index)}
            aria-label={`Show testimonial ${index + 1}`}
            className={`
              h-2.5 w-2.5 rounded-full
              transition-all duration-300
              ${
                activeIndex === index
                  ? "bg-[#0bbcff] shadow-[0_0_10px_rgba(11,188,255,.5)]"
                  : "bg-[#bdd4e2] hover:bg-[#85b8d3] dark:bg-[#18354d] dark:hover:bg-[#31536d]"
              }
            `}
          />
        ))}
      </div>
    </section>
  );
}

/* =========================================================
   CONTACT
========================================================= */


function FAQ() {
  const [openIndex, setOpenIndex] = useState(0);
  const questions = [
    ["What technologies do you work with?", "I primarily build with Flutter, React, Node.js, Laravel, Firebase, MySQL, MongoDB, and PostgreSQL. I select the stack according to the product rather than forcing one technology everywhere."],
    ["Are you available for freelance projects?", "Yes. I am open to selected freelance projects, product collaborations, and long-term development work. Share your scope and expected timeline through the contact form."],
    ["How do you ensure projects are delivered on time?", "I split work into clear milestones, share progress frequently, identify risks early, and keep scope and priorities transparent throughout development."],
    ["Do you provide post-launch support?", "Yes. I can help with monitoring, bug fixes, performance improvements, store releases, new features, and ongoing product maintenance after launch."],
  ];

  return (
    <section id="faq" className={`${sectionClass} relative overflow-hidden`}>
      <div data-parallax="0.20" className="pointer-events-none absolute -right-20 top-10 h-64 w-64 animate-pulse rounded-full bg-[#7051ff]/10 blur-[80px]" />
      <div className="relative z-10 grid grid-cols-1 gap-10 lg:grid-cols-[34%_66%]">
        <div>
          <SectionTitle tag="FAQS">Frequently Asked Questions</SectionTitle>
          <p className={paragraphClass}>Quick answers about my development process, availability, technology choices, and ongoing support.</p>
          <a href="#contact" onClick={(event) => scrollToSection(event, "contact")} className={`${outlineButton} mt-6`}>Ask Something Else <FaArrowRight className="ml-2 text-xs" /></a>
        </div>

        <div className="space-y-3">
          {questions.map(([question, answer], index) => {
            const open = openIndex === index;
            return (
              <article key={question} className={`overflow-hidden rounded-xl border bg-white transition-all duration-300 dark:bg-[#092034] ${open ? "border-[#0bbcff] shadow-[0_16px_45px_rgba(11,188,255,.12)]" : "border-[#c9dce9] hover:border-[#79bdd8] dark:border-[#19384f]"}`}>
                <button type="button" onClick={() => setOpenIndex(open ? -1 : index)} aria-expanded={open} className="flex w-full items-center justify-between gap-4 p-5 text-left text-[15px] font-semibold text-[#18334a] transition hover:text-[#078fc8] dark:text-white dark:hover:text-[#0bbcff] sm:text-[16px]">
                  <span className="flex items-center gap-3"><FiHelpCircle className={`shrink-0 text-xl ${open ? "text-[#0bbcff]" : "text-[#71879a]"}`} />{question}</span>
                  <FiChevronDown className={`shrink-0 text-xl transition-transform duration-500 ${open ? "rotate-180 text-[#0bbcff]" : ""}`} />
                </button>
                <div className={`grid transition-[grid-template-rows,opacity] duration-500 ease-out ${open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}>
                  <div className="overflow-hidden"><p className={`${paragraphClass} px-5 pb-5 pl-12`}>{answer}</p></div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
function Contact() {
  const [sent, setSent] = useState(false);

  return (
    <section id="contact" className={`${sectionClass} relative`}>
      <div data-parallax="0.26" className="pointer-events-none absolute -top-24 -left-24 h-72 w-72 animate-pulse rounded-full bg-[#0bbcff]/15 blur-[80px]" />
      <div data-parallax="-0.30" className="pointer-events-none absolute -right-20 bottom-0 h-80 w-80 animate-pulse rounded-full bg-[#7051ff]/15 blur-[90px] [animation-delay:700ms]" />
      <div className="relative z-10 grid grid-cols-1 gap-12 lg:grid-cols-[36%_50%_14%]">
        <div>
          <SectionTitle tag="GET IN TOUCH">Let's Work Together</SectionTitle>

          <p className={`${paragraphClass} mt-5`}>
            Have a project in mind or just want to say hello?
            <br />
            Feel free to reach out!
          </p>

          <div className="mt-6 space-y-4">
            {/* Email */}
            <div className="group flex items-center gap-3 text-[16px] transition-all duration-300 hover:translate-x-2">
              <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full transition-all duration-300 group-hover:scale-110 group-hover:rotate-6 group-hover:shadow-[0_0_24px_rgba(11,188,255,.28)] bg-[#e5f2fa] dark:bg-[#082b44] text-[#0bbcff]">
                <FiMail className="text-[22px]" />
              </span>

              <a
                href="mailto:raja@example.com"
                className="text-[#10243a] dark:text-[#edf6ff] transition hover:text-[#0bbcff]"
              >
                raja@example.com
              </a>
            </div>

            {/* Phone */}
            <div className="group flex items-center gap-3 text-[16px] transition-all duration-300 hover:translate-x-2">
              <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full transition-all duration-300 group-hover:scale-110 group-hover:rotate-6 group-hover:shadow-[0_0_24px_rgba(11,188,255,.28)] bg-[#e5f2fa] dark:bg-[#082b44] text-[#0bbcff]">
                <FiPhone className="text-[22px]" />
              </span>

              <a
                href="tel:+919876543210"
                className="text-[#10243a] dark:text-[#edf6ff] transition hover:text-[#0bbcff]"
              >
                +91 98765 43210
              </a>
            </div>

            {/* Location */}
            <div className="group flex items-center gap-3 text-[16px] transition-all duration-300 hover:translate-x-2">
              <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full transition-all duration-300 group-hover:scale-110 group-hover:rotate-6 group-hover:shadow-[0_0_24px_rgba(11,188,255,.28)] bg-[#e5f2fa] dark:bg-[#082b44] text-[#0bbcff]">
                <FiMapPin className="text-[22px]" />
              </span>

              <span className="text-[#10243a] dark:text-[#edf6ff]">Bengaluru, India</span>
            </div>
          </div>
        </div>

        <form
          onSubmit={(event) => {
            event.preventDefault();
            setSent(true);
          }}
          className="rounded-[13px] border transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_28px_80px_rgba(11,188,255,.16)] border-[#c9dce9] dark:border-[#19384f] bg-white/80 dark:bg-[#081e32]/70 p-5"
        >
          <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
            <input
              required
              placeholder="Your Name"
              className="h-[50px] rounded-[7px] border border-[#c4d9e8] dark:border-[#23435c] bg-[#eef5fa] dark:bg-[#102b42] px-4 text-[16px] text-[#10243a] dark:text-white outline-none placeholder:text-[#6f8496] dark:placeholder:text-[#8499ac] focus:border-[#0bbcff] hover:-translate-y-1 hover:border-[#4f86aa] transition-all duration-300 focus:scale-[1.015] focus:shadow-[0_0_0_3px_rgba(11,188,255,.12)]"
            />

            <input
              required
              type="email"
              placeholder="Your Email"
              className="h-[50px] rounded-[7px] border border-[#c4d9e8] dark:border-[#23435c] bg-[#eef5fa] dark:bg-[#102b42] px-4 text-[16px] text-[#10243a] dark:text-white outline-none placeholder:text-[#6f8496] dark:placeholder:text-[#8499ac] focus:border-[#0bbcff] hover:-translate-y-1 hover:border-[#4f86aa] transition-all duration-300 focus:scale-[1.015] focus:shadow-[0_0_0_3px_rgba(11,188,255,.12)]"
            />
          </div>

          <textarea
            required
            placeholder="Your Message"
            className="mt-3 h-[150px] w-full resize-none rounded-[7px] border border-[#c4d9e8] dark:border-[#23435c] bg-[#eef5fa] dark:bg-[#102b42] p-4 text-[16px] text-[#10243a] dark:text-white outline-none placeholder:text-[#6f8496] dark:placeholder:text-[#8499ac] focus:border-[#0bbcff] hover:-translate-y-1 hover:border-[#4f86aa] transition-all duration-300 focus:scale-[1.015] focus:shadow-[0_0_0_3px_rgba(11,188,255,.12)]"
          />

          <button
            type="submit"
            className={`${gradientButton} mt-3 h-[50px] w-full rounded-[7px]`}
          >
            {sent ? "✓ Message Ready!" : "➤  Send Message"}
          </button>
        </form>

        <div className="hidden items-center justify-center lg:flex">
          <div className="-rotate-8 font-serif text-[27px] leading-[1.1] italic text-[#5663a8] dark:text-[#ccd3ff]">
            Good
            <br />
            Ideas
            <br />
            Start with
            <br />
            a Conversation
            <div className="mt-3 h-[2px] w-24 rotate-[-10deg] bg-[#6d50ff]" />
          </div>
        </div>
      </div>
    </section>
  );
}



/* =========================================================
   WORK TOGETHER CTA
========================================================= */

function WorkTogetherCTA() {
  return (
    <section
      className="
        mx-auto w-full max-w-[1600px]
        px-5 py-10 sm:px-8 lg:px-10 xl:px-16
      "
    >
      <div
        className="
          group relative overflow-hidden rounded-[20px]
          bg-gradient-to-r from-[#08aef5] via-[#346ff7] to-[#7043ff]
          px-6 py-8 shadow-[0_20px_70px_rgba(51,91,255,.20)]
          sm:px-10 lg:px-14
        "
      >
        <div className="pointer-events-none absolute -right-20 -top-28 h-[270px] w-[270px] rounded-full border border-white/10" />

        <div className="pointer-events-none absolute -bottom-32 right-[15%] h-[280px] w-[280px] rounded-full bg-white/[.06]" />

        <div className="relative z-10 flex flex-col items-start justify-between gap-7 md:flex-row md:items-center">
          <div className="flex items-center gap-5">
            <div className="hidden h-16 w-16 shrink-0 place-items-center rounded-full border border-white/25 bg-white/10 text-white backdrop-blur-sm sm:grid">
              <FaRocket className="text-[24px]" />
            </div>

            <div>
              <span className="text-[11px] font-semibold uppercase tracking-[2px] text-[#d7f8ff]">
                Let's work together
              </span>

              <h2 className="mt-2 text-[26px] font-bold tracking-[-1px] text-white sm:text-[31px]">
                Have a Project in Mind?
              </h2>

              <p className="mt-2 max-w-[550px] text-[14px] leading-6 text-white/80 sm:text-[16px]">
                Let's discuss how we can turn your idea into a modern,
                scalable and reliable digital product.
              </p>
            </div>
          </div>

          <a
            href="#contact"
            onClick={(event) => scrollToSection(event, "contact")}
            className="
              inline-flex h-[50px] shrink-0 items-center justify-center gap-3
              rounded-lg bg-white px-7 text-[14px] font-bold text-[#315be8]
              shadow-[0_10px_30px_rgba(0,0,0,.12)]
              transition-all duration-300
              hover:-translate-y-1 hover:scale-105
              hover:shadow-[0_15px_40px_rgba(0,0,0,.18)]
            "
          >
            Start a Project
            <FaArrowRight className="text-[13px]" />
          </a>
        </div>
      </div>
    </section>
  );
}


/* =========================================================
   FOOTER
========================================================= */

function Footer() {
  return (
    <footer className="mx-auto grid min-h-[100px] max-w-[1600px] grid-cols-1 items-center gap-6 px-5 py-6 text-center sm:px-8 md:grid-cols-[1fr_auto_1fr] lg:px-10 xl:px-16">
      <div className="md:text-left">
        <a href="#home" className="text-[27px] font-extrabold tracking-[-1px]">
          Raja<span className="text-[#6653ff]">.</span>
        </a>

        <p className="mt-3 text-[14px] text-[#5a7083] dark:text-[#788da1]">
          © 2026 Raja Kumar. All rights reserved.
        </p>
      </div>

      <nav className="flex justify-center gap-8 text-[14px] text-[#425b70] dark:text-[#d4dde6]">
        <a href="#home">Home</a>
        <a href="#about">About</a>
        <a href="#projects">Projects</a>
        <a href="#contact">Contact</a>
      </nav>

      <div className="md:text-right">
        <div className="flex justify-center gap-3 md:justify-end">
          {[
            [FaLinkedinIn, "LinkedIn", "https://linkedin.com"],
            [FaGithub, "GitHub", "https://github.com"],
            [FaTwitter, "Twitter", "https://twitter.com"],
            [FaEnvelope, "Email", "mailto:raja@example.com"],
          ].map(([Icon, label, href]) => (
            <a
              key={label}
              href={href}
              aria-label={label}
              target={href.startsWith("http") ? "_blank" : undefined}
              rel={href.startsWith("http") ? "noreferrer" : undefined}
              className="grid h-9 w-9 place-items-center rounded-full border border-[#c9dce9] text-[15px] text-[#425b70] transition-all duration-300 hover:-translate-y-1 hover:border-[#0bbcff] hover:bg-[#e6f7fd] hover:text-[#078fc8] dark:border-[#23415c] dark:text-[#d4dde6] dark:hover:border-[#0bbcff] dark:hover:bg-[#102b42] dark:hover:text-[#0bbcff]"
            >
              <Icon aria-hidden="true" />
            </a>
          ))}
        </div>

        <p className="mt-3 flex items-center justify-center gap-1.5 text-[14px] text-[#5a7083] dark:text-[#788da1] md:justify-end">
          Made with
          <FaHeart className="text-[#8054ff]" aria-label="love" />
          and
          <FaMugHot className="text-[#a66b48]" aria-label="coffee" />
        </p>
      </div>
    </footer>
  );
}

/* =========================================================
   APP
========================================================= */

export default function App() {
  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem("portfolio-theme");
    if (saved) return saved;
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  });
  useParallax();
  useTiltEffects();
  useSiteReveal();

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    document.documentElement.style.colorScheme = theme;
    localStorage.setItem("portfolio-theme", theme);
  }, [theme]);


  return (
    <div className="min-h-screen min-w-[320px] overflow-x-clip bg-[#f5f9fc] font-sans text-[#10243a] transition-colors duration-500 dark:bg-[#041321] dark:text-[#edf6ff]">
      <div className="fixed inset-0 -z-10 bg-[radial-gradient(circle_at_75%_8%,rgba(30,151,225,.12),transparent_26%),radial-gradient(circle_at_5%_65%,rgba(82,92,255,.08),transparent_25%)] transition-colors duration-500 dark:bg-[radial-gradient(circle_at_75%_8%,rgba(12,70,112,.32),transparent_26%),radial-gradient(circle_at_5%_65%,rgba(10,42,70,.18),transparent_25%)]" />
      <Header theme={theme} toggleTheme={() => setTheme(theme === "dark" ? "light" : "dark")} />
      <main>
        <Hero />
        <ExpertiseStrip />
        <Reveal><About /></Reveal>
        <Reveal><Skills /></Reveal>
        <Reveal><Services /></Reveal>
        <Reveal><ValueSection /></Reveal>
        <Reveal><Projects /></Reveal>
        <Reveal><Process /></Reveal>
        <Reveal><Blog /></Reveal>
        <Reveal><Experience /></Reveal>
        <Reveal><ProfileHighlights /></Reveal>
        <Reveal><LearningJourney /></Reveal>
        <Reveal><CurrentFocus /></Reveal>
        <Reveal><Testimonial /></Reveal>
        <Reveal><FAQ /></Reveal>
        <Reveal><Contact /></Reveal>
        <Reveal><WorkTogetherCTA /></Reveal>
      </main>
      <Footer />
    </div>
  );
}
