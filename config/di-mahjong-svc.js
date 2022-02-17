
module.exports = di => {
    di.factory('di-mahjong-svc', () => require('./../services/mahjong'));
    di.factory('TileSvc', () => di.get('di-mahjong-svc').TileSvc(di.get('MahjongReps'), di.get('MahjongModels')));
    di.factory('TileGroupSvc', () => di.get('di-mahjong-svc').TileGroupSvc(di.get('TileSvc'), di.get('MahjongModels')));
};