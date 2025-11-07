import express from "express";
import { User } from "../models/index.mjs";

const router = express.Router();

router.post("/", async (req,res) => {
    try {
        const user = await User.create(req.body);
        res.json(user);
    } catch (err){
        res.status(500).json({ error: err.message })
    }
});



router.get("/", async (req,res) => {
    const users = await User.findAll();
    res.json(users);
});


export default router;