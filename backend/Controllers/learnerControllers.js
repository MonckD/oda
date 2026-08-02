import Learner from "../Models/learnerModels.js";

function generateId() {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let id = "";

    for (let i = 0; i < 6; i++) {
        id += chars.charAt(Math.floor(Math.random() * chars.length));
    }

    return id;
};

const generateUniqueId = async (Model) => {
    let id;
    let exists = true;

    while (exists) {
        id = generateId();

        const learner = await Model.findOne({
            where: { identifiant: id }
        });

        if (!learner) {
            exists = false;
        }
    }

    return id;
};

export const createLearner = async (req, res) => {
    console.log("Données reçues :", req.body);
    try {

        const identifiant = await generateUniqueId(Learner);
        const learner = await Learner.create({
            nom: req.body.nom,
            prenom: req.body.prenom,
            email: req.body.email,
            telephone: req.body.telephone,
            sexe: req.body.sexe,
            age: req.body.age,
            ville: req.body.ville,
            niveau_etude: req.body.niveau_etude,
            formation: req.body.formation,
            cohorte: req.body.cohorte,
            statut: req.body.statut,
            identifiant: req.body.identifiant || identifiant


        });


        res.status(201).json({
            message: "Learner créé avec succès",
            learner
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};
export const readLearner = async (req, res) => {
    try {
        const learner = await Learner.findAll();
        res.status(200).json({
            message: "listes des leaners",
            learner
        })
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }

}
export const getByIdLearner = async (req, res) => {
    try {
        const learner = await Learner.findByPk(req.params.id);
        if (!learner) {
            res.status(404).json({
                message: "Learner n'ont trouver"
            });
        }
        res.status(200).json(learner);

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

export const updateLearner = async (req, res) => {
    try {
        const learner = await Learner.findByPk(req.params.id);
        if (!learner) {
            res.status(404).json({
                message: "Learner n'ont trouver"
            });
        }
        await Learner.update(
            req.body, {
            where: {
                id: req.params.id
            }

        }
        )
        const updateLearner = await Learner.findByPk(req.params.id);
        res.status(200).json(updateLearner);

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};
export const deleteLearner = async (req, res) => {
    try {
        const learner = await Learner.findByPk(req.params.id);
        if (!learner) {
            res.status(404).json({
                message: "Learner n'ont trouver"
            });
        }
        await learner.destroy();

        res.status(204).json({
            message: "learner supprimer"
        })

    } catch (error) {
        res.status(500).json({
            message: error.message
        });

    }
}
export const searchLearnerByNom = async (req, res) => {
    try {
        const { nom } = req.query;


        if (!nom) {
            return res.status(400).json({
                message: "nom requis"
            });
        }

        const learner = await Learner.findOne({
            where: { nom }
        });

        if (!learner) {
            return res.status(404).json({
                message: "Aucun apprenant trouvé"
            });
        }

        res.status(200).json(learner);

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};
