import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import express from "express";
import { sequelize, testDBConnection } from "./config/database.mjs";
import userRoutes from "./routes/userRoutes.mjs"
import postRoutes from "./routes/postRoutes.mjs"
import likeRoutes from "./routes/likeRoutes.mjs"
// import commentRoutes from "./routes/commentRoutes.mjs";


dotenv.config();

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: "http://localhost:5173", // a mettre pour pouvoir communiquer en local
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
}));


app.use("/users",userRoutes);
app.use("/post",postRoutes)
// app.use("/comment",commentRoutes)
app.use("/like",likeRoutes)


async function main() {
    try{
        await testDBConnection();
        // await sequelize.sync({force: true});
        // await sequelize.sync({alter: true,force:true});
        await sequelize.sync()

        app.listen(process.env.PORT,() => {
            console.log(`Serveur lancé sur le port : ${process.env.PORT}`);
            
        })
    } catch (err) {
        console.error(err)
    }
};

main();