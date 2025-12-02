import multer from "multer";
import path from "path"
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const sanitize = (str) =>
    str
        .normalize("NFD")                   // transforme accents -> lettres + diacritiques
        .replace(/[\u0300-\u036f]/g, "")    // supprime les diacritiques (é -> e)
        .replace(/[^a-zA-Z0-9.\-_]/g, "_"); // remplace caractères spéciaux // important sinon bordel dans la sauvegarde d'image 

const storage = multer.diskStorage({
    destination: "./uploads",
    filename: (req, file, cb) => {
        const timestamp = Date.now();
        const cleanName = sanitize(file.originalname);
        cb(null, `${timestamp}-${cleanName}`);
    }
});



function fileFilter(req, file, cb) {
    const isImage = file.mimetype.startsWith("image/");
    const isVideo = file.mimetype.startsWith("video/");

    if (isImage || isVideo) {
        cb(null, true);
    } else {
        cb(new Error("Format non supporté (image ou vidéo uniquement)"), false);
    }
}

const limits = {
    fileSize: 100 * 1024 * 1024, // 100 Mo max
};

const upload = multer({
    storage,
    fileFilter,
    limits,
});



// Upload d'UN fichier pour un avatar
export const uploadAvatar = upload.single("avatar");

// Upload d'UN fichier pour la bannière
export const uploadBanner = upload.single("banner");

// Upload d'UN fichier média attaché à un Post (image ou vidéo)
export const uploadSingleMedia = upload.single("media");

// Upload de plusieurs médias pour un post
export const uploadManyMedias = upload.array("medias", 10);


// Export brut si besoin
export default upload;
