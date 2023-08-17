import * as passport from "passport";

export const auth = (...roles) => {
  return [
    passport.authenticate('local'),
    (req, res, next) => {
      if (!req.isAuthenticated()) {
        console.log("auth: " + req.user)
        return res.status(401).send();
      }
      const user = req.user;
      console.log('user: ' + JSON.stringify(user));
      if (roles.indexOf(user.role) >= 0) {
        next();
      } else {
        return res.status(401).send();
      }
    },
  ];
};

