import _ from "lodash";
import { ThrowError } from "../../common/helper/common-functions";
import { HttpErrorType } from "../../common/helper/enum";
import { User } from "../models/user";
import { UserRepository } from "../repository/user.repository";

export class UserService {
  public constructor(private readonly userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  public async addUser(userData: User): Promise<User | Error> {
    const user = await User.findOne({ where: { email: userData.email } });
    if (user) {
      return ThrowError(HttpErrorType.UserAlreadyRegistered);
    }
    return await this.userRepository.registerUser(userData);
  }

  public loginUser = async (params: any): Promise<any | Error> => {
    const { email, password } = params;
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return ThrowError(HttpErrorType.UserDoesnotExist);
    }
    return await this.userRepository.loginUser(password, user);
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
    return await this.userRepository.resetPassword(password, newPassword, user);
  };
}
