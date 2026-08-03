import express from "express";
import dotenv from "dotenv";
import { connection } from "./Config/db.js";
import { sequelize } from "./Config/db.js";
import UserRoutes from "./Routes/UserRoutes.js";
import LearnerRoutes from "./Routes/learnerRoutes.js";
import { creerUserSiAbsent } from "./Config/seedUser.js";

dotenv.config();

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
    res.status(200).json({
        success: true,
        message: "API Orange Digital Center — Gestion des apprenants",
    });
});

app.use("/api/users", UserRoutes);
app.use("/api", LearnerRoutes);


const port = process.env.PORT || 7000;


const connecte = async () => {
    try {

        await connection();
        await sequelize.sync();

        await creerUserSiAbsent();

        app.listen(port, () => {
            console.log(`Serveur connecté sur le port: ${port}`);
        });

    } catch (error) {

        console.log("Erreur de démarrage :", error.message);

    }
};





connecte();