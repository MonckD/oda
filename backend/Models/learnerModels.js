import { sequelize } from "../Config/db.js";
import { DataTypes } from "sequelize";



const learner = sequelize.define("learner", {

    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },

    nom: {
        type: DataTypes.STRING,
        allowNull: false,
    },

    prenom: {
        type: DataTypes.STRING,
        allowNull: false,
    },

    email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            isEmail: true,
        },
    },

    telephone: {
        type: DataTypes.STRING,
        allowNull: false,
    },

    sexe: {
        type: DataTypes.STRING,
        allowNull: false,
    },

    age: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },

    ville: {
        type: DataTypes.STRING,
        allowNull: false,
    },

    niveau_etude: {
        type: DataTypes.STRING,
        allowNull: false,
    },

    formation: {
        type: DataTypes.STRING,
        allowNull: false,
    },

    cohorte: {
        type: DataTypes.STRING,
        allowNull: false,
    },

    date_inscription: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },

    statut: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    identifiant: {
        type: DataTypes.STRING,
        unique: true
},

});

export default learner ;
