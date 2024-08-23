"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Experiences extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Experiences.belongsTo(models.User, {
        foreignKey: 'userId', 
        as: 'User', 
      });
    }
  }
  Experiences.init(
    {
      employer: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      position: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      startDate: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      endDate: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      roleDescription: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      userId: { 
        type: DataTypes.UUID,
        references: {
          model: 'users', 
          key: 'id', 
        },
      },
    },
    {
      sequelize,
      modelName: "Experiences",
    }
  );
  return Experiences;
};
