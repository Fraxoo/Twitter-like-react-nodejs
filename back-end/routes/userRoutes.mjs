import express from "express";
import { User } from "../models/index.mjs";

const router = express.Router();

router.get("/", async (req, res) => {
    try {
        const users = await User.findAll();
        res.json(users);
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
});

router.get("/:id", async (req, res) => {
    try {
        const userID = req.params.id;
        const user = await User.findByPk(userID);
        if (!user) return res.status(404).json({ error: "User not found" });
        res.json(user);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
})

router.post("/", async (req, res) => {
    try {
        const user = await User.create(req.body);
        res.json(user);
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
});


router.put("/:id", async (req, res) => {
    try {
        const userID = req.params.id;
        const user = await User.findByPk(userID);
        if (!user) return res.status(404).json({ error: "User not found" });
        await user.update(req.body);
        res.json(user);
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
});

router.patch("/:id",async (req,res) => {
    try{
        const user = await User.findByPk(req.params.id);
        if(!user) return res.status(404).json({error : "User not found"});
        await user.update(req.body);
        res.json(user);
    }catch (err) {
        res.status(500).json({ error: err.message })
    }
})


router.delete("/:id",async (req,res) => {
    try{
        const user = await User.findByPk(req.params.id);
        if(!user) return res.status(404).json({error : "User not found"});
        await user.destroy();
        res.json({ message : "User Deleted" });
    }catch (err) {
        res.status(500).json({ error : err.message });
    }
})




export default router;