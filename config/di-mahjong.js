
module.exports = di => {
    require('./di-mahjong-models')(di);
    require('./di-mahjong-reps')(di);
    require('./di-mahjong-svc')(di);
};