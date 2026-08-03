import User from "../Models/User.js";
import { connection } from "./db.js";

export const creerUserSiAbsent = async () => {
  const nom = process.env.ADMIN_NOM || "Admin";
  const prenom = process.env.ADMIN_PRENOM || "Principal";
  const email = process.env.ADMIN_EMAIL || "admin@odc.ci";
  const motDePasse = process.env.ADMIN_MOT_DE_PASSE || "secret123";
  const role = process.env.ADMIN_ROLE || "admin";

  await connection();

  const [user, cree] = await User.findOrCreate({
    where: { email },
    defaults: { nom, prenom, email, motDePasse, role },
  });

  console.log(cree ? "Utilisateur créé :" : "Utilisateur déjà existant :", user.email);
  console.log("Connexion ->", email, "/", motDePasse);

  return { user, cree };
};
