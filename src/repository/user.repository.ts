import { WhereOptions } from "sequelize";
import { SecreteKey } from "../../common/config/app-config";
import { SALT, TOKENEXPIRETIME } from "../../common/helper/constant";
import * as db from "../index";
import { User } from "../models/user";
import bcript from "bcryptjs";
import jwt from "jsonwebtoken";

export class UserRepository {
  public registerUser = async (userData: User): Promise<User> => {
    return await db.User.create(userData as User | any);
  };

  public loginUser = async (token: string): Promise<{ token: string } | unknown> => {
    return new Promise((res) => res({ token: token }));
  };

  public getUserDetails = async (where: WhereOptions): Promise<User | null> => {
    return db.User.findOne({ where });
  };

  public resetPassword = async (user: User): Promise<[number] | unknown> => {
    return await db.User.update(user, { where: { id: user.id } });
  };
}
