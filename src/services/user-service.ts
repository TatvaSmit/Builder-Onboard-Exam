import _ from "lodash";
import { ThrowError } from "../../common/helper/common-functions";
import { HttpErrorType, UserRequest } from "../../common/helper/enum";
import { User } from "../models/user";
import { UserRepository } from "../repository/user.repository";
import { WhereOptions } from "sequelize";
import bcript from "bcryptjs";
import { SALT, TOKENEXPIRETIME } from "../../common/helper/constant";
import jwt from "jsonwebtoken";
import { SecreteKey } from "../../common/config/app-config";

export class UserService {
  public constructor(private readonly userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  public async addUser(userData: User): Promise<User | Error> {
    const user = await User.findOne({ where: { email: userData.email } });
    if (user) {
      return ThrowError(HttpErrorType.UserAlreadyRegistered);
    }
    const hashedPassword = await bcript.hash(userData.password, SALT);
    userData.password = hashedPassword;
    return await this.userRepository.registerUser(userData);
  }

  public loginUser = async (params: any): Promise<any | Error> => {
    const { email, password } = params;
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return ThrowError(HttpErrorType.UserDoesnotExist);
    }
    if (user && (await bcript.compare(password, user.password))) {
      const token = jwt.sign({ user }, SecreteKey, { expiresIn: TOKENEXPIRETIME });
      return await this.userRepository.loginUser(token);
    } else {
      return ThrowError(HttpErrorType.PasswordIncorrect);
    }
  };

  public getUserDetails = async (req: UserRequest): Promise<User | null> => {
    const where: WhereOptions = { id: _.get(req, "user.id", 0) };
    return await this.userRepository.getUserDetails(where);
  };

  public resetPassword = async (params: any): Promise<any | Error> => {
    const { email, password, newPassword } = params;
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return ThrowError(HttpErrorType.UserDoesnotExist);
    }
    if (_.isEqual(password, newPassword)) {
      return ThrowError(HttpErrorType.NewPasswordCanTBeSameAsOld);
    }
    if (user && (await bcript.compare(password, user.password))) {
      const hashedPassword = await bcript.hash(newPassword, SALT);
      user.password = hashedPassword;
    } else {
      return ThrowError(HttpErrorType.PasswordIncorrect);
    }
    return await this.userRepository.resetPassword(user);
  };
}
