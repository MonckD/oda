import { creerAdminSiAbsent } from "./Config/seedAdmin.js";

creerAdminSiAbsent()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("Erreur :", error.message);
    process.exit(1);
  });
