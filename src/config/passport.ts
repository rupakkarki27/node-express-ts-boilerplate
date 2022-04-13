import passport from "passport";
import passportLocal from "passport-local";
import passportJWT from "passport-jwt";
import validator from "validator";

import User, { IUser } from "../models/user.model";
import { JWT_SECRET } from "./secrets";

const localStrategy = passportLocal.Strategy;
const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;

/**
 * This is the local signup strategy that uses phoneNumber and password to signup a user
 * If a phoneNumber or email already exists it returns a 500 status code
 */

export interface IJWTUser {
  user: {
    _id: string;
    email: string;
  };
  iat: number;
}

passport.use(
  "signup",
  new localStrategy(
    {
      usernameField: "email",
      passwordField: "password",
      passReqToCallback: true,
    },
    async (req, email, password, done) => {
      try {
        const isEmail = validator.isEmail(email);

        if (!isEmail) {
          return done(null, false, { message: "Please provide a valid email" });
        }

        const userExists = await User.findOne({ email: email });

        if (userExists) {
          return done(null, false, { message: "The user already exists." });
        }

        const user: IUser = await User.create({
          email,
          password,
        });

        return done(null, user);
      } catch (error) {
        return done(error, null);
      }
    }
  )
);

/**
 * Local strategy for signing in a user, verifies the username and password
 *
 */

passport.use(
  "signin",
  new localStrategy(
    {
      usernameField: "email",
      passwordField: "password",
    },
    async (email, password, done) => {
      try {
        const isEmail = validator.isEmail(email);

        if (!isEmail) {
          return done(null, false, { message: "Not a valid email" });
        }

        const user: IUser = await User.findOne({ email: email });

        if (!user) return done(null, false, { message: "User not found." });

        const isPasswordValid = await user.comparePassword(password);

        if (!isPasswordValid)
          return done(null, false, { message: "Wrong Password" });

        return done(null, user, { message: "Logged in Successfully" });
      } catch (e) {
        return done(e);
      }
    }
  )
);

/**
 * jwt authorization strategy for protected routes
 */
passport.use(
  new JWTStrategy(
    {
      secretOrKey: JWT_SECRET,
      jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    },
    async (jwt_payload: IJWTUser, done) => {
      try {
        const user: IUser = await User.findById(jwt_payload.user._id);

        if (user) {
          return done(null, user._id);
        } else {
          return done(null, false);
        }
      } catch (e) {
        return done(e);
      }
    }
  )
);
