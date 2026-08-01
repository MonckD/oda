import express from "express";
import dotenv from "dotenv";
import { connection } from "./config/db.js";
import { sequelize } from "./config/db.js";
import learnerRoutes from "./Routes/learnerRoutes.js"

dotenv.config();

const app = express();

app.use(express.json());


const port = process.env.PORT || 7000;
app.use("/api",learnerRoutes);


const connecte = async () => {
    try {

        await connection();
        await sequelize.sync({ alter: true });

        app.listen(port, () => {
            console.log(`Serveur connecté sur le port: ${port}`);
        });

    } catch (error) {

        console.log("Erreur de démarrage :", error.message);

    }
};
connecte();