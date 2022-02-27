
module.exports = di => {
    di.factory('cors-config', () => require('./cors-config.json')[di.get('env')]);
};