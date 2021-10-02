import { injectable } from "tsyringe";
import { User } from "../schemas/User";

interface ICreateUserDTO {
  email: string;
  socket_id: string;
  avatar: string;
  name: string;
}

@injectable()
export class CreateUserService {
  async execute({ 
    avatar,
    email,
    name,
    socket_id
  }: ICreateUserDTO) {
    const userAlreadyExists = await User.findOne({ email }).exec();

    if (userAlreadyExists) {
      const user = await User.findOneAndUpdate(
        {
          _id: userAlreadyExists._id,
        }, 
        {
          $set: { socket_id, avatar, name }
        },
        {
          new: true
        }
      );

      return user;
    } else {
      const user = await User.create({
        avatar,
        email,
        name,
        socket_id
      });

      return user;
    }
  }
}