import * as passport from "passport";

export const auth = (...roles) => {
  return [
    passport.authenticate('jwt', {session: false}),
    (req, res, next) => {
      if (!req.isAuthenticated()) {
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