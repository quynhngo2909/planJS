import * as express from "express";
import { dbCreateConnection } from './orm/dbCreateConnection';
import * as dotenv from "dotenv";
import { rootRouter } from "./routers";
import * as passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { ExtractJwt, Strategy } from "passport-jwt";
import * as bcrypt from "bcryptjs";
import { getUserByEmail, saveUser } from "./services/userServices";
import { User } from "./orm/entities/User";

dotenv.config();

const startServer = async () => {
    try {
        await dbCreateConnection();

        const app = express();
        app.use(express.urlencoded({ extended: false }));
        app.use(express.json());
        app.use("/", rootRouter);

        passport.use(
            new LocalStrategy(async (username, password, done) => {
                if (!username || !password) {
                    return done(null, false, { message: "Invalid username or password" });
                }
                const user = await getUserByEmail(username);
                console.log(user);

                if (!user) {
                    return done(null, false, { message: "Username is not available" });
                }

                //   const isMatch = await bcrypt.compare(password, user.password);

                if (password == user.password) {
                    return done(null, user); // req.user = user;
                }
                return done(null, false, { message: "Password is invalid. Try again?" });
            })
        );

        passport.use(
            new Strategy({
                secretOrKey: process.env.JWT_SECRET_KEY,
                jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
                algorithms: ["HS512"]
            }, async (payload, done) => {
                console.log('payload received', payload);
                console.log(payload);
                const user = await getUserByEmail(payload.usename);
                if (!user) {
                    done(null, false);
                } else {
                    done(null, user);
                }
            })
        )

        app.use(passport.initialize());
        app.use(passport.session());
        const PORT = process.env.PORT;
        app.listen(PORT, () => {
            console.log("Server is running.");
        });

    }
    catch (err) {
        console.log(err + "");
        process.exit(1);
    }
};

startServer();