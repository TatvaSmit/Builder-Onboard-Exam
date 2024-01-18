import { SecreteKey } from "../../common/config/app-config";
import { SALT, TOKENEXPIRETIME } from "../../common/helper/constant";
import * as db from "../index";
import { User } from "../models/user";
import bcript from "bcryptjs";
import jwt from "jsonwebtoken";

export class UserRepository {
  public registerUser = async (userData: User): Promise<User> => {
    const hashedPassword = await bcript.hash(userData.password, SALT);
    userData.password = hashedPassword;
    return await db.User.create(userData as User | any);
  };

  public loginUser = async (password: string, user: User): Promise<{ token: string } | unknown> => {
    if (user && (await bcript.compare(password, user.password))) {
      const token = jwt.sign({ user }, SecreteKey, { expiresIn: TOKENEXPIRETIME });
      return new Promise((res) => res({ token: token }));
    }
  };

  public resetPassword = async (
    oldPassword: string,
    newPassword: string,
    user: User
  ): Promise<[number] | unknown> => {
    if (user && (await bcript.compare(oldPassword, user.password))) {
      const hashedPassword = await bcript.hash(newPassword, SALT);
      user.password = hashedPassword;
      return await db.User.update(user, { where: { id: user.id } });
    }
  };
}
