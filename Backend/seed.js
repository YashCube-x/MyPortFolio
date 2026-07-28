import dotenv from "dotenv";
import connectDB from "./config/db.js";
import Project from "./models/Project.js";
import Certificate from "./models/Certificate.js";
import Service from "./models/Service.js";
import { updateSettings } from "./models/Settings.js";

dotenv.config();

const projects = [
  {
    category: "AI & BACKEND",
    title: "Urban Issue Detector API",
    type: "FastAPI / YOLO11",
    client: "Personal Project",
    duration: "Ongoing",
    task: "AI Model & API",
    budget: "Open Source",
    description:
      "AI-powered API (FastAPI + YOLO11) that detects city issues like potholes and garbage from images. Enables smart urban monitoring.",
    github: "https://github.com/YashCube-x/UrbanIssueDetector-API",
    demo: "https://urbanissuedetector.onrender.com/docs",
    order: 0,
  },
  {
    category: "AI WEB APP",
    title: "YashBot",
    type: "React + Vite",
    client: "Personal Project",
    duration: "1 Week",
    task: "Frontend AI",
    budget: "Open Source",
    description: "Interactive AI ChatBot built with React & Vite. Features real-time responses and a modern, clean UI.",
    github: "https://github.com/YashCube-x/ChatBot",
    demo: "https://yashbot.netlify.app/",
    order: 1,
  },
  {
    category: "WEB APP",
    title: "Weather App",
    type: "Javascript API",
    client: "Personal Project",
    duration: "2 Weeks",
    task: "API Integration",
    budget: "Open Source",
    description: "Responsive SPA that fetches weather via API; using async fetch/Promises. Deployed on GitHub Pages.",
    github: "https://github.com/YashCube-x/Weather-App",
    demo: "https://yashcube-x.github.io/Weather-App/",
    order: 2,
  },
  {
    category: "GAME DEV",
    title: "Tic-Tac-Toe",
    type: "Web Game",
    client: "Personal Project",
    duration: "1 Week",
    task: "Game Logic",
    budget: "Open Source",
    description: "Two-player game with state handling and win/draw detection; responsive UI.",
    github: "https://github.com/YashCube-x/TicTocToe",
    demo: "https://yashcube-x.github.io/TicTocToe/",
    order: 3,
  },
  {
    category: "GAME DEV",
    title: "Stone-Paper-Scissors",
    type: "Web Game",
    client: "Personal Project",
    duration: "3 Days",
    task: "Logic Implementation",
    budget: "Open Source",
    description: "Classic game with randomized computer moves and scoring; lightweight UI.",
    github: "https://github.com/YashCube-x/Stone-Paper-Sicor",
    demo: "https://yashcube-x.github.io/Stone-Paper-Sicor/",
    order: 4,
  },
];

const certificates = [
  {
    title: "Blockchain Fundamentals Certificate",
    year: "2024",
    desc: "Certified in blockchain concepts and dApp basics.",
    link: "https://drive.google.com/file/d/1oTP4s-8wlIh4jxLMLTCrPBVt3Jm2rJTR/view",
    order: 0,
  },
  {
    title: "Robo Rumble — Participation",
    year: "2025",
    desc: "Participation certificate from CSJMU Innovation Cell.",
    link: "https://drive.google.com/file/d/1OpZ07odHO3EdXIHIUU7iUBy_CJBmjUpv/view",
    order: 1,
  },
  {
    title: "Cyber Security Course — IIT Kanpur",
    year: "2024",
    desc: "Completed course on cyber security fundamentals.",
    link: "https://drive.google.com/file/d/1FxVyPBWPBe8DRrWVTByMWBsYie19n9xn/view",
    order: 2,
  },
];

const services = [
  {
    icon: "Code2",
    title: "Web Development",
    desc: "Building modern, responsive web applications using React, Node.js, and Express. Focused on clean UI and efficient backend integration.",
    tags: ["React", "Node.js", "Express", "MongoDB"],
    order: 0,
  },
  {
    icon: "BrainCircuit",
    title: "Algorithms & Logic",
    desc: "Solving complex computational problems using C++ and Data Structures. Optimized solutions for performance and scalability.",
    tags: ["C++", "DSA", "Optimization"],
    order: 1,
  },
];

const settings = {
  email: "yashcube07@gmail.com",
  phone: "+91-9125900756",
  location: "Kanpur, Uttar Pradesh 208024",
  social: {
    github: "https://github.com/YashCube-x",
    instagram: "https://www.instagram.com/itz__me__suyash_?igsh=MWIxbHhsN2N1d3d1eA==",
    facebook: "",
    linkedin: "https://www.linkedin.com/in/yashcube07/",
  },
};

async function seed() {
  await connectDB();

  const projectCount = await Project.countDocuments();
  if (projectCount === 0) {
    await Project.insertMany(projects);
    console.log(`✅ Seeded ${projects.length} projects (no images — add via dashboard)`);
  } else {
    console.log("↷ Projects already exist, skipping");
  }

  const certCount = await Certificate.countDocuments();
  if (certCount === 0) {
    await Certificate.insertMany(certificates);
    console.log(`✅ Seeded ${certificates.length} certificates (no images — add via dashboard)`);
  } else {
    console.log("↷ Certificates already exist, skipping");
  }

  const serviceCount = await Service.countDocuments();
  if (serviceCount === 0) {
    await Service.insertMany(services);
    console.log(`✅ Seeded ${services.length} services`);
  } else {
    console.log("↷ Services already exist, skipping");
  }

  await updateSettings(settings);
  console.log("✅ Settings upserted (email/phone/location/social links)");

  console.log("\nDone. Resume + project/certificate images still need to be uploaded via the /admin dashboard.");
  process.exit(0);
}

seed().catch((error) => {
  console.error("Seed failed:", error);
  process.exit(1);
});
