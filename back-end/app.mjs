import express from "express";
import dotenv from "dotenv";

import userRoutes from "./routes/userRoutes.mjs";
import postRoutes from "./routes/postRoutes.mjs";
import commentRoutes from "./routes/commentRoutes.mjs";
import likeRoutes from "./routes/likeRoutes.mjs";
import followRoutes from "./routes/followRoutes.mjs";
import hashtagRoutes from "./routes/hashtagRoutes.mjs";

import { sequelize, testDBConnection } from "./config/database.mjs";

dotenv.config();

const app = express();
app.use(express.json());


app.use("/users", userRoutes);
app.use("/posts", postRoutes);
app.use("/comments", commentRoutes);
app.use("/likes", likeRoutes);
app.use("/follow", followRoutes);
app.use("/hashtags", hashtagRoutes);


async function main() {
    try {
        await testDBConnection();
        await sequelize.sync();

        app.listen(process.env.PORT, () => {
            console.log(`Serveur lancé sur localhost:${process.env.PORT}`);
        });
    } catch (err) {
        console.error(err);
    }
};

main();