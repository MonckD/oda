import { DataTypes } from "sequelize";
import bcrypt from "bcryptjs";
import { sequelize } from "../Config/db.js";

const Admin = sequelize.define(
  "Admin",
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    nom: {
      type: DataTypes.STRING(100),
      allowNull: false,
      validate: {
        notEmpty: { msg: "Le nom est obligatoire." },
      },
    },
    prenom: {
      type: DataTypes.STRING(100),
      allowNull: false,
      validate: {
        notEmpty: { msg: "Le prénom est obligatoire." },
      },
    },
    email: {
      type: DataTypes.STRING(150),
      allowNull: false,
      unique: {
        msg: "Cet email est déjà utilisé.",
      },
      validate: {
        isEmail: { msg: "Adresse email invalide." },
        notEmpty: { msg: "L'email est obligatoire." },
      },
    },
    motDePasse: {
      type: DataTypes.STRING(255),
      allowNull: false,
      validate: {
        notEmpty: { msg: "Le mot de passe est obligatoire." },
        len: {
          args: [6, 255],
          msg: "Le mot de passe doit contenir au moins 6 caractères.",
        },
      },
    },
  },
  {
    tableName: "admins",
    timestamps: true,
    hooks: {
      beforeCreate: async (admin) => {
        admin.motDePasse = await bcrypt.hash(admin.motDePasse, 10);
      },
      beforeUpdate: async (admin) => {
        if (admin.changed("motDePasse")) {
          admin.motDePasse = await bcrypt.hash(admin.motDePasse, 10);
        }
      },
    },
  }
);

Admin.prototype.toJSON = function () {
  const valeurs = { ...this.get() };
  delete valeurs.motDePasse;
  return valeurs;
};

Admin.prototype.verifierMotDePasse = function (motDePasse) {
  return bcrypt.compare(motDePasse, this.motDePasse);
};

export default Admin;
