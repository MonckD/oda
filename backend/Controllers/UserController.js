import User from "../Models/User.js";

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll({
      order: [["id", "DESC"]],
    });
    res.status(200).json({ success: true, data: users });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getUserById = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "Utilisateur introuvable." });
    }
    res.status(200).json({ success: true, data: user });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateUser = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "Utilisateur introuvable." });
    }
    const updated = await user.update(req.body);
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

export const deleteUser = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "Utilisateur introuvable." });
    }
    await user.destroy();
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, motDePasse } = req.body;

    const user = await User.unscoped().findOne({ where: { email } });
    if (!user) {
      return res
        .status(401)
        .json({ success: false, message: "Email ou mot de passe incorrect." });
    }

    const valide = await user.verifierMotDePasse(motDePasse);
    if (!valide) {
      return res
        .status(401)
        .json({ success: false, message: "Email ou mot de passe incorrect." });
    }

    res.status(200).json({
      success: true,
      message: "Connexion réussie.",
      data: user.toJSON(),
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const logoutUser = async (req, res) => {
  res.status(200).json({ success: true, message: "Déconnexion réussie." });
};
