const { authJwt } = require("../middlewares");
const controller = require("../controllers/user.controller");

module.exports = function(app) {
  /*
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept, Authorization, Pragma, Cache-Control,  X-Requested-With",
    );
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST");
    next();
  });*/


  app.all("/*", function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Cache-Control, Pragma, Origin, Authorization, Content-Type, X-Requested-With");
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST");
    return next();
  });

  app.get("/login/all", controller.allAccess);

  app.get("/login/user", [authJwt.verifyToken], controller.userBoard);

  app.get(
    "/login/admin",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.adminBoard
  );
};