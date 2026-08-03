import Admin from "./Models/Admin.js";
import { connection } from "./Config/db.js";

const NOM = process.env.ADMIN_NOM || "Admin";
const PRENOM = process.env.ADMIN_PRENOM || "Principal";
const EMAIL = process.env.ADMIN_EMAIL || "admin@odc.ci";
const MOT_DE_PASSE = process.env.ADMIN_MOT_DE_PASSE || "secret123";

const creerAdmin = async () => {
  await connection();

  const [admin, cree] = await Admin.findOrCreate({
    where: { email: EMAIL },
    defaults: {
      nom: NOM,
      prenom: PRENOM,
      email: EMAIL,
      motDePasse: MOT_DE_PASSE,
    },
  });

  console.log(cree ? "Admin créé :" : "Admin déjà existant :", admin.email);
  console.log("Connexion ->", EMAIL, "/", MOT_DE_PASSE);
  process.exit(0);
};

creerAdmin().catch((error) => {
  console.error("Erreur :", error.message);
  process.exit(1);
});
