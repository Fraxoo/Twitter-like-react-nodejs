import { Sequelize, DataTypes } from "sequelize";


export async function loadSequelize() {
    try{
        const login = {
            databse: "app-database",
            username: "root",
            password: "root"
        }

        const sequelize = new Sequelize(login.databse,login.username,login.password,{
            host: '127.0.0.1',
            dialect: 'mysql'
        })

        const User = sequelize.define("User",{
            name: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true
            },
            lastname: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            username: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true
            },
            email: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true
            },
            password: {
                type: DataTypes.STRING,
                allowNull: false
            }
        })


        return sequelize;
    } catch (error){
        console.log(error);
        
    }
}