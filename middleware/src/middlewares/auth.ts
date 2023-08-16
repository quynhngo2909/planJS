import * as passport from "passport";

export const auth = (...roles) => {
  return [
    passport.authenticate("jwt", { session: false }),
    (req, res, next) => {
      const user = req.user;
      console.log(user);
      console.log(user.role);
      console.log(roles.indexOf(user.role));
      if (roles.indexOf(user.role) >= 0) {
        next();
      } else {
        return res.status(401).send();
      }
    },
  ];
};

