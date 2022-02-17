
module.exports = di => {
    di.factory('Sequelize',()=> require('sequelize'));
    di.factory('env', () => process.env.NODE_ENV || 'development');    
};