import { User } from "../models/user";
import { UserRepository } from "../repository/user.repository";

export class UserService {
  public constructor(private readonly userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  public async addUser(userData: User): Promise<User> {
    return await this.userRepository.registerUser(userData);
  }
}
