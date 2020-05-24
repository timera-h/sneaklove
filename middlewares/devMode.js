module.exports = (req, res, next) => {
  req.session.currentUser = {
    _id: "5ec941e1cc1e523bd4e971ce",
    name: "toto",
    lastname:"dupont",
    role: "admin",
    email: "dupont@mail.com",
  };
  next();
};
