import { SecreteKey } from "../../common/config/app-config";
import * as db from "../index";
import { User } from "../models/user";
import bcript from "bcryptjs";
import jwt from "jsonwebtoken";

export class UserRepository {
  public async registerUser(userData: User): Promise<User> {
    const hashedPassword = await bcript.hash(userData.password, 10);
    userData.password = hashedPassword;
    return await db.User.create(userData as User | any);
  }

  public async loginUser(email: string, password: string): Promise<{ token: string } | any> {
    const user = await db.User.findOne({ where: { email } });
    if (user && (await bcript.compare(password, user.password))) {
      const token = jwt.sign({ user }, SecreteKey, { expiresIn: "1h" });
      return new Promise((res) => res({ token: token }));
    }
  }
}
