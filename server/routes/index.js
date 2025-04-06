const express = require("express");
const mongo = require('mongoose');
const bcrypt = require("bcryptjs");
const router = express.Router();
const userModel = require("../models/userModel");
const jwt = require("jsonwebtoken");
const projectModel = require("../models/projectModel");

const secret = "secret";

// Render the home page
router.get("/", (req, res) => {
    res.render("index", { title: "Express" });
});

// Signup route
router.post("/signup", async (req, res) => {
    try {
        const { username, name, email, password } = req.body;
        const emailExists = await userModel.findOne({ email });
        if (emailExists) {
            return res.json({ success: false, message: "E-Mail already exists" });
        }

        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);

        await userModel.create({ username, name, email, password: hash });
        res.json({ success: true, message: "User Created Successfully!" });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server Error", error: error.message });
    }
});

// Login route
router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await userModel.findOne({ email });

        if (user && (await bcrypt.compare(password, user.password))) {
            const token = jwt.sign({ email: user.email, userId: user._id }, secret);
            res.json({ success: true, message: "User logged in successfully", token, userId: user._id });
        } else {
            res.json({ success: false, message: "Invalid email or password" });
        }
    } catch (error) {
        res.status(500).json({ success: false, message: "Server Error", error: error.message });
    }
});

// Get user details
router.post("/getUserDetails", async (req, res) => {
    try {
        const { userId } = req.body;
        const user = await userModel.findOne({ _id: userId });

        if (user) {
            res.json({ success: true, message: "User details fetched successfully", user });
        } else {
            res.json({ success: false, message: "User not found!" });
        }
    } catch (error) {
        res.status(500).json({ success: false, message: "Server Error", error: error.message });
    }
});

// Create a project
router.post("/createProject", async (req, res) => {
    try {
        const { userId, title } = req.body;
        const user = await userModel.findOne({ _id: userId });

        if (user) {
            const project = await projectModel.create({ title, createdBy: userId });
            res.json({ success: true, message: "Project Created Successfully!", projectId: project._id });
        } else {
            res.json({ success: false, message: "User not found!" });
        }
    } catch (error) {
        res.status(500).json({ success: false, message: "Server Error", error: error.message });
    }
});

// Get all projects for a user
router.post("/getProjects", async (req, res) => {
    try {
        const { userId } = req.body;
        const user = await userModel.findOne({ _id: userId });

        if (user) {
            const projects = await projectModel.find({ createdBy: userId });
            res.json({ success: true, message: "Projects fetched successfully", projects });
        } else {
            res.json({ success: false, message: "User not found!" });
        }
    } catch (error) {
        res.status(500).json({ success: false, message: "Server Error", error: error.message });
    }
});

// Delete a project
router.post("/deleteProject", async (req, res) => {
    try {
        const { userId, projId } = req.body;

        if (!mongo.Types.ObjectId.isValid(userId) || !mongo.Types.ObjectId.isValid(projId)) {
            return res.json({ success: false, message: "Invalid user or project ID" });
        }

        const user = await userModel.findOne({ _id: userId });

        if (!user) {
            return res.json({ success: false, message: "User not found!" });
        }

        const project = await projectModel.findOne({
            _id: new mongo.Types.ObjectId(projId),
            userId: new mongo.Types.ObjectId(userId)
        });

        if (!project) {
            return res.json({ success: false, message: "Project not found or you are not authorized to delete it!" });
        }

        await projectModel.findOneAndDelete({ _id: projId });

        res.json({ success: true, message: "Project deleted successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Server Error", error: error.message });
    }
});



// Get a single project
router.post("/getProject", async (req, res) => {
    try {
        const { userId, projId } = req.body;
        const user = await userModel.findOne({ _id: userId });

        if (user) {
            const project = await projectModel.findOne({ _id: projId });
            res.json({ success: true, message: "Project fetched successfully", project });
        } else {
            res.json({ success: false, message: "User not found!" });
        }
    } catch (error) {
        res.status(500).json({ success: false, message: "Server Error", error: error.message });
    }
});

// Update a project
router.post("/updateProject", async (req, res) => {
    try {
        const { userId, htmlCode, cssCode, jsCode, projId } = req.body;
        const user = await userModel.findOne({ _id: userId });

        if (user) {
            const project = await projectModel.findOneAndUpdate(
                { _id: projId },
                { htmlCode, cssCode, jsCode },
                { new: true } 
            );

            if (project) {
                res.json({ success: true, message: "Project updated successfully" });
            } else {
                res.json({ success: false, message: "Project not found!" });
            }
        } else {
            res.json({ success: false, message: "User not found!" });
        }
    } catch (error) {
        res.status(500).json({ success: false, message: "Server Error", error: error.message });
    }
});

module.exports = router;
