import Admin from "../Models/Admin.js";
import { connection } from "./db.js";

export const creerAdminSiAbsent = async () => {
  const nom = process.env.ADMIN_NOM || "Admin";
  const prenom = process.env.ADMIN_PRENOM || "Principal";
  const email = process.env.ADMIN_EMAIL || "admin@odc.ci";
  const motDePasse = process.env.ADMIN_MOT_DE_PASSE || "secret123";

  await connection();

  const [admin, cree] = await Admin.findOrCreate({
    where: { email },
    defaults: { nom, prenom, email, motDePasse },
  });

  console.log(cree ? "Admin créé :" : "Admin déjà existant :", admin.email);
  console.log("Connexion ->", email, "/", motDePasse);

  return { admin, cree };
};
