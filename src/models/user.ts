import { DataTypes, Model } from "sequelize";
import { sequelize } from "./index";
import { UserRoles } from "../../common/helper/enum";
import { TestPerformance } from "./test_performance";
import { TestStats } from "./test_stats";

class User extends Model {
  id!: number;
  first_name!: string;
  last_name!: string;
  email!: string;
  role!: string;
  password!: string;
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
    timestamps: true,
    sequelize,
    tableName: "user",
    modelName: "user",
  }
);

User.hasMany(TestPerformance, { foreignKey: "user_id" });
User.hasMany(TestStats, { foreignKey: "user_id" });
TestStats.belongsTo(User, { foreignKey: "user_id" });

export { User };
