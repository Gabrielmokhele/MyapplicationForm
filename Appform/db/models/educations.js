'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Educations extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Educations.belongsTo(models.User, {
        foreignKey: 'userId', 
        as: 'User', 
      });
    }
  }
  Educations.init({
    institution: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    qualification:{
      type: DataTypes.STRING,
      allowNull: false,
    },
    startDate1: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    endDate1: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    description: {
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
  }, {
    sequelize,
    modelName: 'Educations',
  });
  return Educations;
};
