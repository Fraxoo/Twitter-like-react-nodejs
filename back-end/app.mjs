import express from "express";
import dotenv from "dotenv";
import userRoutes from "./routes/userRoutes.mjs";
import { sequelize, testDBConnection } from "./config/database.mjs";

dotenv.config();

const app = express();
app.use(express.json());

app.use("/users",userRoutes);

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