export const auth = (...roles) => {
  return [
    (req, res, next) => {
      if (!req.isAuthenticated()) {
        console.log("auth: " + req.user)
        return res.status(401).send();
      }
      const user = req.user;
      if (roles.indexOf(user.role.name) >= 0) {
        next();
      } else {
        return res.status(401).send();
      }
    },
  ];
};

