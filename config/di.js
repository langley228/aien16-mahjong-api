const DiContainer = require('di-container');
const di = new DiContainer();

require('./di-config')(di);
require('./di-mahjong')(di);
require('./di-cors')(di);

module.exports = {
    getServices: (svcName) => {
        return di.get(svcName);
    },
    services: {
        TileSvc: di.get('TileSvc'),
        TileGroupSvc: di.get('TileGroupSvc')
    },
    repositories: {
        Mahjong: di.get('MahjongReps'),
    },
    models: {
        Mahjong: di.get('MahjongModels'),
    }
    ,
    corsConfig: di.get('cors-config')
};
