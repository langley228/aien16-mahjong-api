const env = process.env.NODE_ENV || 'development';
const initModels = require('./models/init-models').initModels;

module.exports = (config, Sequelize) => {
    let sequelize;
    if (config.use_env_variable) {
        sequelize = new Sequelize(process.env[config.use_env_variable], config);
    } else {
        sequelize = new Sequelize(config.database, config.username, config.password, config);
    }
    return {
        reps: initModels(sequelize, Sequelize),
        Sequelize: Sequelize
    };
};