import * as dotenv from "dotenv";
import * as express from "express";
import * as passport from "passport";
import * as LocalStrategy from "passport-local";
import { ExtractJwt, Strategy } from "passport-jwt";
import * as bcrypt from "bcryptjs";
import { dbCreateConnection } from './orm/dbCreateConnection';
import { rootRouter } from "./routers";
import { getUserByEmail } from "./services/userServices";

dotenv.config();

const startServer = async () => {
    try {
        await dbCreateConnection();

        const app = express();
        app.use(express.urlencoded({ extended: false }));
        app.use(express.json({limit: "50kb"}));
       
        app.use(passport.initialize());

        passport.use(
            new LocalStrategy.Strategy({}, async (username, password, done) => {
                if (!username || !password) {
                    return done(null, false, { message: "Invalid username or password" });
                }
                const user = await getUserByEmail(username);

                if (!user) {
                    return done(null, false, { message: "Username is not available" });
                }

                // const isMatch = await bcrypt.compare(password, user.password);

                if (password === user.password) {
                    console.log(user);
                    return done(null, user); // req.user = user;
                }
                return done(null, false, { message: "Password is invalid. Try again?" });
            })
        );

        passport.use(
            new Strategy({
                secretOrKey: process.env.JWT_SECRET_KEY,
                jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            }, async (payload, done) => {
                const user = await getUserByEmail(payload.usename);
                console.log('user', JSON.stringify(user));
                if (!user) {
                    done(null, false);
                } else {
                    done(null, user);
                }
            })
        )

        app.use("/", rootRouter);

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