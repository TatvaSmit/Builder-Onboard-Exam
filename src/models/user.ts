import { DataTypes, Model } from "sequelize";
import { sequelize } from "./index";
import { UserRoles } from "../../common/helper/enum";

class User extends Model {
  id!: number;
  first_name!: string;
  last_name!: string;
  email!: string;
  role!: string;
  password!: string;
  date_created?: Date;
  date_modified?: Date;
}

User.init(
  {
    id: {
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
      type: DataTypes.BIGINT,
    },
    first_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    last_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.ENUM(UserRoles.Admin, UserRoles.Developer),
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "user",
    modelName: "user",
  }
);


export { User };
