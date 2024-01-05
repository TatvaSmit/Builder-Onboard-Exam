import * as db from "../index";
import { User } from "../models/user";

export class UserRepository {
  public async registerUser(userData: User): Promise<User> {
    return await db.User.create(userData as any);
  }
}
