import Project from "../models/Project.js";


// CREATE PROJECT
export const createProject = async (req, res) => {
  try {
    const {
      title,
      description,
      techStack,
      githubLink,
      liveLink,
      price,
      category,
      image,
      status,
      progress,
    } = req.body;

    const project = await Project.create({
      title,
      description,
      techStack,
      githubLink,
      liveLink,
      price,
      category,
      image,
      status,
      progress,
      owner: req.user._id,
    });

    res.status(201).json(project);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


// GET ALL PROJECTS
export const getProjects = async (req, res) => {
  try {
    const projects = await Project.find().populate(
      "owner",
      "name email"
    );

    res.status(200).json(projects);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


// GET SINGLE PROJECT
export const getProjectById = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id).populate(
      "owner",
      "name email"
    );

    if (!project) {
      return res.status(404).json({
        message: "Project not found",
      });
    }

    res.status(200).json(project);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


// UPDATE PROJECT
export const updateProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({
        message: "Project not found",
      });
    }

    // Only owner can update
    if (project.owner.toString() !== req.user._id.toString()) {
      return res.status(401).json({
        message: "Not authorized",
      });
    }

    const updatedProject = await Project.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.status(200).json(updatedProject);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


// DELETE PROJECT
export const deleteProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({
        message: "Project not found",
      });
    }

    // Only owner or admin can delete
    if (project.owner.toString() !== req.user._id.toString() && req.user.role !== "admin") {
      return res.status(401).json({
        message: "Not authorized",
      });
    }

    await project.deleteOne();

    res.status(200).json({
      message: "Project deleted successfully",
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


// BUY/CLONE PROJECT
export const buyProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({
        message: "Project template not found",
      });
    }
    // Check if buyer is already the owner
    if (project.owner.toString() === req.user._id.toString()) {
      return res.status(400).json({
        message: "You cannot purchase your own project codebase listing",
      });
    }

    // Duplicate project for buyer
    const projectClone = await Project.create({
      title: project.title,
      description: project.description,
      techStack: project.techStack,
      githubLink: project.githubLink,
      liveLink: project.liveLink,
      price: project.price,
      category: project.category,
      image: project.image,
      status: "Saved",
      progress: 0,
      owner: req.user._id,
    });

    res.status(201).json({
      message: "Project purchased successfully",
      project: projectClone,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};