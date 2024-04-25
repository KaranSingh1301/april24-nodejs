const registerController = (req, res) => {
  console.log("register api");
  return res.send("register all okssss");
};

const loginController = (req, res) => {
  console.log("login apisss");
  return res.send("login all osssk");
};

module.exports = { registerController, loginController };
