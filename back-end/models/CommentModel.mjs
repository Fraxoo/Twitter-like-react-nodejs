// import { DataTypes } from "sequelize";
// import { sequelize } from "../config/database.mjs";




// export const Comment = sequelize.define("Comment", {
//     content: {
//         type: DataTypes.STRING,
//         allowNull: false,
//         validate: {
//             notEmpty: { msg: "Contenu requis" },
//             len: { args: [1, 280], msg: "1 a 280 caractéres" }
//         }
//     },
//     post_id: {
//         type: DataTypes.INTEGER,
//         allowNull: false,
//         references: { //securité
//             model: "post",
//             key: "id"
//         }
//     },
//     user_id: {
//         type: DataTypes.INTEGER,
//         allowNull: false,
//         references: {   //securité
//             model: "users",
//             key: "id"
//         }
//     }

// }, {
//     tableName: "comment",
//     timestamps: true
// })