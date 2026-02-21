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
    const { username, password } = req.body;

    const user = await prisma.user.findUnique({ where: { username } });
    if (!user) return res.status(401).json({ error: "Invalid" });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(401).json({ error: "Invalid" });

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET);

    res.json({ token });
});

//track

app.post("/track", async (req, res) => {
    const { userId, featureName } = req.body;

    await prisma.featureClick.create({
        data: { userId, featureName },
    });

    res.json({ message: "Tracked" });
});

//analytics

app.get("/analytics", async (req, res) => {
    const { gender, minAge, maxAge, start, end } = req.query;

    const clicks = await prisma.featureClick.findMany({
        where: {
            timestamp: {
                gte: start ? new Date(start) : undefined,
                lte: end ? new Date(end) : undefined,
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

    const grouped = {};
    clicks.forEach((c) => {
        grouped[c.featureName] = (grouped[c.featureName] || 0) + 1;
    });

    res.json(grouped);
});

app.listen(process.env.PORT, () =>
    console.log("Server running on port", process.env.PORT)
);