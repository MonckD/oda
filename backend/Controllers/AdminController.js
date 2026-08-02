import Admin from "../Models/Admin.js";

export const getAllAdmins = async (req, res) => {
  try {
    const admins = await Admin.findAll({
      order: [["id", "DESC"]],
    });
    res.status(200).json({ success: true, data: admins });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getAdminById = async (req, res) => {
  try {
    const admin = await Admin.findByPk(req.params.id);
    if (!admin) {
      return res
        .status(404)
        .json({ success: false, message: "Administrateur introuvable." });
    }
    res.status(200).json({ success: true, data: admin });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateAdmin = async (req, res) => {
  try {
    const admin = await Admin.findByPk(req.params.id);
    if (!admin) {
      return res
        .status(404)
        .json({ success: false, message: "Administrateur introuvable." });
    }
    const updated = await admin.update(req.body);
    res.status(200).json({ success: true, data: updated });
  } catch (error) {
    if (error.name === "SequelizeUniqueConstraintError") {
      return res
        .status(409)
        .json({ success: false, message: "Cet email est déjà utilisé." });
    }
    if (error.name === "SequelizeValidationError") {
      return res.status(400).json({
        success: false,
        message: "Données invalides.",
        errors: error.errors.map((e) => ({ field: e.path, message: e.message })),
      });
    }
    res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteAdmin = async (req, res) => {
  try {
    const admin = await Admin.findByPk(req.params.id);
    if (!admin) {
      return res
        .status(404)
        .json({ success: false, message: "Administrateur introuvable." });
    }
    await admin.destroy();
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const loginAdmin = async (req, res) => {
  try {
    const { email, motDePasse } = req.body;

    const admin = await Admin.unscoped().findOne({ where: { email } });
    if (!admin) {
      return res
        .status(401)
        .json({ success: false, message: "Email ou mot de passe incorrect." });
    }

    const valide = await admin.verifierMotDePasse(motDePasse);
    if (!valide) {
      return res
        .status(401)
        .json({ success: false, message: "Email ou mot de passe incorrect." });
    }

    res.status(200).json({
      success: true,
      message: "Connexion réussie.",
      data: admin.toJSON(),
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const logoutAdmin = async (req, res) => {
  res.status(200).json({ success: true, message: "Déconnexion réussie." });
};
