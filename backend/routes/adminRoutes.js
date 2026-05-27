import express from "express";
import User from "../models/User.js";
import Project from "../models/Project.js";

const router = express.Router();

// GET STATISTICS
// GET /api/admin/stats
router.get("/stats", async (req, res) => {
  try {
    const totalUsers = await User.countDocuments({});
    const totalProjects = await Project.countDocuments({});

    const totalValueResult = await Project.aggregate([
      {
        $group: {
          _id: null,
          total: { $sum: "$price" },
        },
      },
    ]);
    const totalValue = totalValueResult.length > 0 ? totalValueResult[0].total : 0;

    const categoryStats = await Project.aggregate([
      {
        $group: {
          _id: "$category",
          count: { $sum: 1 },
        },
      },
    ]);

    const categories = categoryStats.map((stat) => ({
      name: stat._id || "Uncategorized",
      count: stat.count,
    }));

    res.status(200).json({
      totalUsers,
      totalProjects,
      totalValue,
      categories,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET ALL USERS (EXCLUDING PASSWORDS)
// GET /api/admin/users
router.get("/users", async (req, res) => {
  try {
    const users = await User.find({}).select("-password").sort({ createdAt: -1 });
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// TOGGLE USER ROLE
// PUT /api/admin/users/:id/role
router.put("/users/:id/role", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user._id.toString() === req.user._id.toString()) {
      return res.status(400).json({ message: "You cannot change your own role" });
    }

    // Toggle role
    user.role = user.role === "admin" ? "user" : "admin";
    await user.save();

    res.status(200).json({
      message: `User role updated to ${user.role}`,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// DELETE USER (AND CASCADE DELETE THEIR PROJECTS)
// DELETE /api/admin/users/:id
router.delete("/users/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user._id.toString() === req.user._id.toString()) {
      return res.status(400).json({ message: "You cannot delete your own admin account" });
    }

    // Cascade delete projects owned by this user
    await Project.deleteMany({ owner: user._id });

    // Delete the user
    await user.deleteOne();

    res.status(200).json({
      message: "User and all their listed projects deleted successfully",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
