"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class MyFiles extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      MyFiles.belongsTo(models.User, {
        foreignKey: 'userId', 
        as: 'User', 
      });
    }
  }
  MyFiles.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      type: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      size: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      lastModified: {
        type: DataTypes.BIGINT,
        allowNull: false,
      },
      lastModifiedDate: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      webkitRelativePath: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      filePath: {
        type: DataTypes.STRING,
        allowNull: true,
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
      tableName: "Myfiles",
      modelName: "MyFiles",
    }
  );
  return MyFiles;
};
