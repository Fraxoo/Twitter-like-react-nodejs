import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import express from "express";
import { sequelize, testDBConnection } from "./config/database.mjs";
import userRoutes from "./routes/userRoutes.mjs"
import postRoutes from "./routes/postRoutes.mjs"
import likeRoutes from "./routes/likeRoutes.mjs"
import followRoutes from "./routes/followRoutes.mjs"
import multer from "multer";

dotenv.config();

const app = express();


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "/uploads/")
    },
    filename: (req, file, cb) => {
        const ext = path.extname(file.originalname); // .png / .mp4 etc.
        const baseName = path.basename(file.originalname, ext);
        cb(null, Date.now() + "-" + baseName + ext);
    },
});

function fileFilter(req, file, cb) {
    const isImage = file.mimetype.startsWith("image/");
    const isVideo = file.mimetype.startsWith("video/");

    if (isImage || isVideo) {
        cb(null, true); // on accepte
    } else {
        cb(new Error("Seules les images et vidéos sont autorisées"), false);
    }
}

const upload = multer({
    storage,
    fileFilter,
    limits: { fileSize: 100 * 1024 * 1024 }, // 100 Mo
});






app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: "http://localhost:5173", // a mettre pour pouvoir communiquer en local
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
}));


app.use("/users", userRoutes);
app.use("/post", postRoutes)
app.use("/like", likeRoutes)
app.use("/follow", followRoutes)


async function main() {
    try {
        await testDBConnection();
        // await sequelize.sync({force: true});
        // await sequelize.sync({alter: true,force:true});
        await sequelize.sync()

        app.listen(process.env.PORT, () => {
            console.log(`Serveur lancé sur le port : ${process.env.PORT}`);

        })
    } catch (err) {
        console.error(err)
    }
};

main();