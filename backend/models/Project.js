import mongoose from "mongoose";

const projectSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      required: true,
    },

    techStack: {
      type: [String],
    },

    githubLink: {
      type: String,
    },

    liveLink: {
      type: String,
    },

    price: {
      type: Number,
      default: 0,
    },

    category: {
      type: String,
      enum: [
        "Full Stack",
        "Frontend",
        "Backend",
        "AI",
        "Mobile App",
        "UI Kit",
        "API",
      ],
    },

    image: {
      type: String,
    },

    status: {
      type: String,
      enum: ["In Progress", "Completed", "Saved"],
      default: "In Progress",
    },

    progress: {
      type: Number,
      default: 0,
      min: 0,
      max: 100,
    },

    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

const Project = mongoose.model("Project", projectSchema);

export default Project;