'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('persons', 'userId', {
      type: Sequelize.UUID,
      references: {
        model: 'users', 
        key: 'id', 
      },
      onDelete: 'CASCADE', 
      onUpdate: 'CASCADE', 
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('persons', 'userId');
  }
};

