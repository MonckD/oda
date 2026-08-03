import { creerUserSiAbsent } from "./Config/seedUser.js";

creerUserSiAbsent()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("Erreur :", error.message);
    process.exit(1);
  });
