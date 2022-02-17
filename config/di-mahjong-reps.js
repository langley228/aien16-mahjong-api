
module.exports = di => {
    di.factory('MahjongReps-config', () => require('./mahjong-reps-config.json')[di.get('env')]);
    di.factory('MahjongReps', () => require('./../reps/mahjong')(di.get('MahjongReps-config'), di.get('Sequelize')));
};