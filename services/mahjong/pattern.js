
module.exports = (mahjongModel) => {
    const { TileModel, TileSearch, TileSearchResult, TilePoint } = mahjongModel.Tile;
    const TileGroup = mahjongModel.TileGroup;
    const { PageList, PageSearch, PageListResult } = mahjongModel.PageList;

    class PatternSvc {
        constructor() {
            this.PatternMatchs = [];
            // this.PatternMatchs.push(new NoTerminalsPattern());
            this.PatternMatchs.push(new AllTripletsPattern());
            this.PatternMatchs.push(new WindPattern());
            this.PatternMatchs.push(new DragonsPattern());
            this.PatternMatchs.push(new OneSuitPattern());
            this.PatternMatchs.push(new ConcealedTripletsPattern());
            this.PatternMatchs.push(new AllConcealedHandPattern());
        }
        Matchs(option) {
            let result = [];

            this.PatternMatchs.forEach(m => {
                let opt = { ...option };
                opt.patterns = result;
                let patterns = m.Match(opt);
                if (patterns.length > 0)
                    patterns.forEach(p => result.push(p));
            });
            return result;
        }
    }

    class NoTerminalsPattern {
        constructor() {

        }
        Match(option) {
            let result = [];
            let { concealedGp, exposedGp } = option;
            let groups = [...concealedGp];
            exposedGp.forEach(t => groups.push(t));
            let notHonorGp = groups.filter(g => g.tiles.filter(t => t.isHonor));
            let count = notHonorGp;
            if (count === 0)
                result.push({
                    id: 'NoTerminals',
                    name: '斷么九',
                });
            return result;
        }
    }

    class AllTripletsPattern {
        constructor() {

        }
        Match(option) {
            let result = [];
            let { concealedGp, exposedGp } = option;
            let groups = [...concealedGp];
            exposedGp.forEach(t => groups.push(t));
            let tripletCount = groups.filter(t => t.isTriplet || t.isKong).length;
            let pairCount = groups.filter(t => t.isPair).length;
            if (tripletCount + pairCount === groups.length && pairCount === 1) {
                let honorGp = groups.filter(g => g.tiles.filter(t => t.isHonor).length > 0);
                //字一色不另計碰碰胡
                if (honorGp.length === groups.length)
                    result.push({
                        id: 'AllHonors',
                        name: '字一色',
                    });
                else
                    result.push({
                        id: 'AllTriplets',
                        name: '碰碰胡',
                    });
            }
            return result;
        }
    }

    class WindPattern {
        constructor() {

        }
        Match(option) {
            let result = [];
            let { concealedGp, exposedGp, prevailing, dealer } = option;
            let groups = [...concealedGp];
            exposedGp.forEach(t => groups.push(t));
            let windGp = groups.filter(g => g.tiles.filter(t => t.isWind).length > 0);
            let tripletGp = windGp.filter(g => g.isKong || g.isTriplet);
            let pairGp = windGp.filter(g => g.isPair);
            if (windGp.length === 4) {
                if (tripletGp.length === 4)
                    result.push({
                        id: 'BigFourWinds',
                        name: '大四喜',
                    });
                else if (tripletGp.length === 3 && pairGp.length === 1)
                    result.push({
                        id: 'SmallFourWinds',
                        name: '小四喜',
                    });
            }

            //大小四喜不另計門風或／及圈風
            if (result.length === 0) {
                let mapping = (id, count) => {
                    switch (id) {
                        case 28:
                            return {
                                id: count > 1 ? 'EastWindEast' : 'EastWind',
                                name: count > 1 ? '東風東' : '東風',
                            };
                        case 29:
                            return {
                                id: count > 1 ? 'SouthWindSouth' : 'SouthWind',
                                name: count > 1 ? '南風南' : '南風',
                            };
                        case 30:
                            return {
                                id: count > 1 ? 'WestWindWest' : 'WestWind',
                                name: count > 1 ? '西風西' : '西風',
                            };
                        case 31:
                            return {
                                id: count > 1 ? 'NorthWindNorth' : 'NorthWind',
                                name: count > 1 ? '北風北' : '北風',
                            };
                        default:
                            return null;
                    }
                };
                let findWind = [];
                if (prevailing && prevailing.id)
                    findWind.push({ id: prevailing.id, count: 1 });
                if (dealer && dealer.id) {
                    let wind = findWind.find(w => w.id === dealer.id);
                    if (wind)
                        wind.count += 1;
                    else
                        findWind.push({ id: dealer.id, count: 1 });
                }
                findWind.forEach(f => {
                    if (tripletGp.filter(g => g.tiles[0].id === f.id).length > 0) {
                        let pattern = mapping(f.id, f.count);
                        if (pattern != null)
                            result.push(pattern);
                    }
                });
            }
            return result;
        }
    }

    class DragonsPattern {
        constructor() {

        }
        Match(option) {
            let result = [];
            let { concealedGp, exposedGp } = option;
            let groups = [...concealedGp];
            exposedGp.forEach(t => groups.push(t));

            let dragonGp = groups.filter(g => g.tiles.filter(t => t.isDragon).length > 0);
            let tripletGp = dragonGp.filter(g => g.isKong || g.isTriplet);
            let pairGp = dragonGp.filter(g => g.isPair);
            if (dragonGp.length === 3) {
                if (tripletGp.length === 3)
                    result.push({
                        id: 'BigThreeDragons',
                        name: '大三元',
                    });
                else if (tripletGp.length === 2 && pairGp.length === 1)
                    result.push({
                        id: 'SmallThreeDragons',
                        name: '小三元',
                    });
            }
            //大小三元不另三元台
            if (result.length === 0) {
                let mapping = (id) => {
                    switch (id) {
                        case 32:
                            return {
                                id: 'RedDragon',
                                name: '紅中',
                            };
                        case 33:
                            return {
                                id: 'GreenDragon',
                                name: '青發',
                            };
                        case 34:
                            return {
                                id: 'WhiteDragon',
                                name: '白板',
                            };
                        default:
                            return null;
                    }
                };
                tripletGp.forEach(g => {
                    let pattern = mapping(g.tiles[0].id);
                    if (pattern != null)
                        result.push(pattern);
                });
            }
            return result;
        }
    }

    class OneSuitPattern {
        constructor() {

        }
        Match(option) {
            let result = [];
            let { concealedGp, exposedGp } = option;
            let groups = [...concealedGp];
            exposedGp.forEach(t => groups.push(t));
            let rankGp = groups.filter(g => g.tiles.filter(t => !t.isHonor).length > 0);
            if (rankGp.length === 0)
                return result;
            else (rankGp.length > 1)
            {
                let oneSuitCount = rankGp.filter(g =>
                    g.tiles[0].isDot === rankGp[0].tiles[0].isDot &&
                    g.tiles[0].isBamboo === rankGp[0].tiles[0].isBamboo &&
                    g.tiles[0].isCharacter === rankGp[0].tiles[0].isCharacter).length;
                if (oneSuitCount < rankGp.length)
                    return result;
            }

            let honorGp = groups.filter(g => g.tiles.filter(t => t.isHonor).length > 0);
            if (honorGp.length === 0)
                result.push({
                    id: 'PureOneSuit',
                    name: '清一色',
                });
            else
                result.push({
                    id: 'MixedOneSuit',
                    name: '混一色',
                });
            return result;
        }
    }

    class ConcealedTripletsPattern {
        constructor() {

        }
        Match(option) {
            let result = [];
            let { concealedGp, tile, isSelfDrawn } = option;
            let groups = [...concealedGp];
            let tripletsGp = groups.filter(g => g.isTriplet || g.isKong);
            let count = tripletsGp.length;
            if (!isSelfDrawn) {
                let lastGp = groups.filter(g => g.tiles.filter(t => t.id === tile.id).length > 0);
                if (lastGp.filter(g => g.isTriplet || g.isKong).length > 0 && lastGp.length === 1)
                    count -= 1;
            }
            if (count > 2) {
                if (count > 4)
                    result.push({
                        id: 'FiveConcealedTriplets',
                        name: '五暗刻',
                    });
                else if (count > 3)
                    result.push({
                        id: 'FourConcealedTriplets',
                        name: '四暗刻',
                    });
                else
                    result.push({
                        id: 'ThreeConcealedTriplets',
                        name: '三暗刻',
                    });
            }
            return result;
        }
    }

    class AllConcealedHandPattern {
        constructor() {

        }
        Match(option) {
            let result = [];
            let { concealedGp, exposedGp, tile, isSelfDrawn } = option;

            if (isSelfDrawn && exposedGp.length === 0) {
                result.push({
                    id: 'AllConcealedHandSelfDrawn',
                    name: '門清自摸',
                });
            }
            else if (isSelfDrawn) {
                result.push({
                    id: 'SelfDrawn',
                    name: '自摸',
                });
            }
            else if (exposedGp.length === 0) {
                result.push({
                    id: 'AllConcealedHand',
                    name: '門清',
                });
            }
            return result;
        }
    }

    return new PatternSvc();
}