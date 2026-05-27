import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import User from "./models/User.js";
import Project from "./models/Project.js";

dotenv.config();

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB for seeding...");

    // Clear existing data
    await User.deleteMany({});
    await Project.deleteMany({});
    console.log("Cleared existing collection data.");

    // Generate hashed passwords
    const adminPassword = await bcrypt.hash("admin123", 10);
    const developerPassword = await bcrypt.hash("developer123", 10);

    // Create Admin User
    const admin = await User.create({
      name: "Admin Manager",
      email: "admin@example.com",
      password: adminPassword,
      role: "admin",
    });
    console.log("Seeded Admin User: admin@example.com");

    // Create Standard User
    const developer = await User.create({
      name: "Jane Developer",
      email: "jane@example.com",
      password: developerPassword,
      role: "user",
    });
    console.log("Seeded Standard User: jane@example.com");

    // Create Sample Projects
    const projects = [
      {
        title: "SaaS Analytics Dashboard",
        description: "A premium admin dashboard built with React and Chart.js featuring cohort retention tables and real-time subscription metric tracking.",
        techStack: ["React", "Chart.js", "Tailwind CSS", "Node.js"],
        githubLink: "https://github.com",
        liveLink: "https://example.com",
        price: 79,
        category: "Full Stack",
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=900&q=80",
        status: "Completed",
        progress: 100,
        owner: developer._id,
      },
      {
        title: "AI Portfolio Builder",
        description: "An automated compiler translating JSON developer profiles into static hosting pages using GPT prompts.",
        techStack: ["Next.js", "OpenAI API", "Tailwind CSS"],
        githubLink: "https://github.com",
        liveLink: "https://example.com",
        price: 129,
        category: "AI",
        image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=900&q=80",
        status: "In Progress",
        progress: 65,
        owner: developer._id,
      },
      {
        title: "Mobile Food Delivery App",
        description: "React Native prototype demonstrating customer navigation, restaurant selections, checkout carts, and courier coordinates tracking.",
        techStack: ["React Native", "Stripe", "Redux Toolkit"],
        githubLink: "https://github.com",
        liveLink: "https://example.com",
        price: 99,
        category: "Mobile App",
        image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=900&q=80",
        status: "Saved",
        progress: 40,
        owner: admin._id,
      }
    ];

    await Project.insertMany(projects);
    console.log("Successfully seeded 3 mock projects.");

    await mongoose.connection.close();
    console.log("Database connection closed. Seeding complete!");
    process.exit(0);
  } catch (error) {
    console.error("Seeding failed:", error);
    process.exit(1);
  }
};

seedDatabase();
