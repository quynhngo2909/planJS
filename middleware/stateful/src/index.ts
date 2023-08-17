import * as express from "express";
import { dbCreateConnection } from './orm/dbCreateConnection';
import * as dotenv from "dotenv";
import { rootRouter } from "./routers";
import * as passport from "passport";
import * as LocalStrategy from "passport-local";
import * as bcrypt from "bcryptjs";
import { getUserByEmail, getUserById } from "./services/userServices";
import * as session from "express-session";

dotenv.config();

const startServer = async () => {
    try {
        await dbCreateConnection();

        const app = express();
        app.use(express.urlencoded({ extended: false }));
        app.use(express.json());

        app.use(
            session({
                secret: process.env.SESSION_SECRET_KEY,
                resave: false,
                saveUninitialized: false,
            })
        );

        app.use(passport.initialize());
        app.use(passport.session());

        passport.use(
            new LocalStrategy.Strategy({}, async (username, password, done) => {
                if (!username || !password) {
                    return done(null, false, { message: "Invalid username or password" });
                }
                const user = await getUserByEmail(username);

                if (!user) {
                    return done(null, false, { message: "Username is not available" });
                }

                const isMatch = await bcrypt.compare(password, user.password);

                if (password == user.password) {
                    console.log(user);
                    return done(null, user); // req.user = user;
                }
                return done(null, false, { message: "Password is invalid. Try again?" });
            })
        );

        passport.serializeUser((user, done) => {
            // @ts-ignore
            done(null, user.id);
        });

        passport.deserializeUser(async (id, done) => {

            console.log(id);
            const user = await getUserById(id);
            done(null, user);
        });

        app.use("/", rootRouter);

        app.use((err, req, res, next) => {
            if (err) {
                console.log(err);
            }
        })

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