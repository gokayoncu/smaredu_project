const User = require("../models/User");
const bcrypt = require("bcrypt");

exports.createUser = async (req, res) => {
  try {
    const user = await User.create(req.body);

    res.status(201).redirect('/login');
  } catch (error) {
    res.status(400).json({
      status: "fail",
      error,
    });
  }
};

exports.loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({
                status: 'fail',
                message: 'Kullanıcı bulunamadı',
            });
        }

        const same = await bcrypt.compare(password, user.password);
        if (!same) {
            return res.status(401).json({
                status: 'fail',
                message: 'Yanlış şifre',
            });
        }

        // KULLANICI OTURUMU
        req.session.userID = user._id;
        res.status(200).redirect('/');
    } catch (error) {
        console.error(error); // Hata ayıklama için hatayı logla
        res.status(400).json({
            status: 'fail',
            message: 'Giriş sırasında bir hata oluştu',
            error: error.message, // Daha açıklayıcı bir hata mesajı sağla
        });
    }
};
exports.logoutUser = async (req, res) => {
    try {
        req.session.destroy();
        res.status(200).redirect('/');
    } catch (error) {
        console.error(error); // Hata ayıklama için hatayı logla
        res.status(400).json({
            status: 'fail',
            message: 'Çıkış sırasında bir hata oluştu',
            error: error.message, // Daha açıklayıcı bir hata mesajı sağla
        });
    }
};

exports.getDashboardPage = (req, res) => {
    res.status(200).render("dashboard", { pageName: "dashboard" });
  };