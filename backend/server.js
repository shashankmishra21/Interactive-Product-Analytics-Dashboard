require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { PrismaClient } = require("@prisma/client");

const app = express();
const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());


//auth middleware
const auth = (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
        return res.status(401).json({ error: "No token provided" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.userId = decoded.userId;
        next();
    } catch (err) {
        return res.status(401).json({ error: "Invalid token" });
    }
};

// auth
app.post("/register", async (req, res) => {
    try {
        const { username, password, age, gender } = req.body;
        const hashed = await bcrypt.hash(password, 10);
        const user = await prisma.user.create({
            data: { username, password: hashed, age, gender },
        });

        res.json({ message: "User created" });
    } catch (err) {
        res.status(400).json({ error: "User exists" });
    }
});

app.post("/login", async (req, res) => {
    try {
        const { username, password } = req.body;
        console.log("LOGIN ATTEMPT:", username, password);

        if (!username || !password) {
            return res.status(400).json({ error: "Missing credentials" });
        }

        const user = await prisma.user.findFirst({
            where: { username: username },
        });

        if (!user) {
            return res.status(401).json({ error: "User not found" });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(401).json({ error: "Wrong password" });
        }

        const token = jwt.sign(
            { userId: user.id },
            process.env.JWT_SECRET || "secret",
            { expiresIn: "7d" }
        );

        return res.json({ token });
    } catch (err) {
        console.error("LOGIN ERROR:", err);
        return res.status(500).json({ error: "Server error" });
    }
});

//track
app.post("/track", auth, async (req, res) => {
    const { featureName } = req.body;
    await prisma.featureClick.create({
        data: {
            userId: req.userId,
            featureName,
        },
    });

    res.json({ message: "Tracked successfully" });
});

//analytics
app.get("/analytics", async (req, res) => {
    const { gender, minAge, maxAge, start, end } = req.query;


    const clicks = await prisma.featureClick.findMany({
        where: {
            timestamp: {
                gte: start ? new Date(start + "T00:00:00.000Z") : undefined,
                lte: end ? new Date(end + "T23:59:59.999Z") : undefined,
            },
            user: {
                gender: gender || undefined,
                age: {
                    gte: minAge ? parseInt(minAge) : undefined,
                    lte: maxAge ? parseInt(maxAge) : undefined,
                },
            },
        },
    });

    const featureCounts = {};
    const timeTrend = {};

    clicks.forEach((c) => {
        featureCounts[c.featureName] = (featureCounts[c.featureName] || 0) + 1;

        const day = new Date(c.timestamp).toISOString().split("T")[0];
        timeTrend[day] = (timeTrend[day] || 0) + 1;
    });

    res.json({
        barChart: featureCounts,
        lineChart: timeTrend,
    });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log("Server running on port", PORT));