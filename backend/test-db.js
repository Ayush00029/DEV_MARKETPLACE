import mongoose from "mongoose";
import dotenv from "dotenv";
import User from "./models/User.js";
import Project from "./models/Project.js";

dotenv.config();

const runTest = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB for database validation.");

    const users = await User.find({});
    console.log(`Users in database: ${users.length}`);
    users.forEach(u => console.log(`- ${u.name} (${u.email}) [role: ${u.role}, id: ${u._id}]`));

    const projects = await Project.find({});
    console.log(`Projects in database: ${projects.length}`);
    projects.forEach(p => console.log(`- ${p.title} [owner: ${p.owner}, price: ${p.price}, id: ${p._id}]`));

    if (users.length >= 2 && projects.length > 0) {
      const adminUser = users.find(u => u.role === "admin");
      const standardUser = users.find(u => u.role === "user");
      const targetProject = projects.find(p => p.owner.toString() === standardUser._id.toString());

      if (adminUser && standardUser && targetProject) {
        console.log(`\nSimulating purchase of project "${targetProject.title}" (owned by standard user) by Admin "${adminUser.name}"...`);
        
        const projectClone = await Project.create({
          title: targetProject.title,
          description: targetProject.description,
          techStack: targetProject.techStack,
          githubLink: targetProject.githubLink,
          liveLink: targetProject.liveLink,
          price: targetProject.price,
          category: targetProject.category,
          image: targetProject.image,
          status: "Saved",
          progress: 0,
          owner: adminUser._id,
        });

        console.log("SUCCESS! Cloned project created in DB:", projectClone._id);
        // Clean up the test clone
        await Project.deleteOne({ _id: projectClone._id });
        console.log("Cleaned up simulated test clone.");
      } else {
        console.log("\nCould not find matching admin/user/project combination for simulation.");
      }
    } else {
      console.log("\nNot enough data in DB to simulate a purchase.");
    }

    await mongoose.connection.close();
    console.log("Database connection closed.");
    process.exit(0);
  } catch (error) {
    console.error("Database validation failed:", error);
    process.exit(1);
  }
};

runTest();
