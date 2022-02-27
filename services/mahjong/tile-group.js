
const PatternSvc = require('./pattern');
module.exports = (tileSvc, mahjongModel) => {
    // const mahjongModel = require('mahjong-models');
    const { TileModel, TileSearch, TileSearchResult } = mahjongModel.Tile;
    const TileGroup = mahjongModel.TileGroup;
    const { PageList, PageSearch, PageListResult } = mahjongModel.PageList;

    class TileGroupSvc {
        constructor(tileSvc) {
            this.tileSvc = tileSvc;
            this.patternSvc = PatternSvc(mahjongModel);
        }


        CanWin(option) {
            let { inIds, outIds, lastId, isSelfDrawn } = option;
            isSelfDrawn = isSelfDrawn === true;
            let tileSearch = new TileSearchResult();
            let __meldMapping = this.__meldMapping;
            return tileSvc.searchTile(tileSearch).then(allTiles => {
                let result = {
                    canWin: false
                };
                let tileGroups = [];
                let concealed = [];
                let exposed = [];
                let tile = null;
                if (inIds)
                    inIds.map(id => allTiles.result.datas.find((t, index, ary) => t.id == id)).forEach(t => {
                        if (t)
                            concealed.push(t);
                    });
                if (outIds)
                    outIds.map(id => allTiles.result.datas.find((t, index, ary) => t.id == id)).forEach(t => {
                        if (t)
                            exposed.push(t);
                    });
                if (lastId)
                    tile = allTiles.result.datas.find((t, index, ary) => t.id == lastId);

                if (tile != null) {
                    concealed.push(tile);
                }
                concealed = concealed.sort((a, b) => a.id - b.id);
                exposed = exposed.sort((a, b) => a.id - b.id);

                //檢查外面的牌
                let exposedGp = __meldMapping(true, exposed, allTiles);
                if (exposedGp == null)
                    return result;
                exposedGp.forEach(tg => tileGroups.push(tg));

                //檢查裡面的牌
                let concealedGp = __meldMapping(false, concealed, allTiles);
                if (concealedGp == null)
                    return result;
                concealedGp.forEach(tg => tileGroups.push(tg));

                //檢查將眼
                if (tileGroups.filter(tg => tg.isPair).length !== 1)
                    return result;

                //檢查組數 
                if (tileGroups.filter(tg => tg.isMeld).length !== 5)
                    return result;

                result.canWin = true;
                result.patterns = this.patternSvc.Matchs({
                    concealedGp,
                    exposedGp,
                    tile,
                    isSelfDrawn
                })
                return result;
            });
        }


        ReadyHand(option) {
            let { inIds, outIds } = option;
            let tileSearch = new TileSearchResult();
            let __meldMapping = this.__meldMapping;
            return tileSvc.searchTile(tileSearch).then(allTiles => {
                let reset = (id) => {
                    let concealed = [];
                    let exposed = [];
                    let tile = null;
                    if (inIds)
                        inIds.map(id => allTiles.result.datas.find((t, index, ary) => t.id == id)).forEach(t => {
                            if (t)
                                concealed.push(t);
                        });

                    if (outIds)
                        outIds.map(id => allTiles.result.datas.find((t, index, ary) => t.id == id)).forEach(t => {
                            if (t)
                                exposed.push(t);
                        });
                    tile = allTiles.result.datas.find((t, index, ary) => t.id == id);
                    return {
                        concealed,
                        exposed,
                        tile
                    }
                };

                let readyTiles = [];
                for (let i = 1; i <= 42; i++) {
                    let tileGroups = [];
                    let { concealed, exposed, tile } = reset(i);
                    concealed.push(tile);
                    concealed = concealed.sort((a, b) => a.id - b.id);
                    exposed = exposed.sort((a, b) => a.id - b.id);

                    //檢查外面的牌
                    let groups = __meldMapping(true, exposed, allTiles);
                    if (groups == null)
                        continue;
                    groups.forEach(tg => tileGroups.push(tg));

                    //檢查裡面的牌
                    groups = __meldMapping(false, concealed, allTiles);
                    if (groups == null)
                        continue;
                    groups.forEach(tg => tileGroups.push(tg));

                    //檢查將眼
                    if (tileGroups.filter(tg => tg.isPair).length !== 1)
                        continue;

                    //檢查組數 
                    if (tileGroups.filter(tg => tg.isMeld).length !== 5)
                        continue;
                    readyTiles.push(tile);
                }
                return readyTiles;
            });
        }

        __meldMapping_old(isExposed, tiles) {
            let tilesClone = tiles.filter(t => !t.isFlower).sort((a, b) => a.id - b.id);
            let tileGroups = [];
            let sub = new Array(43);
            for (let i = 0; i < sub.length; i++) {
                sub[i] = [];
            }

            for (let i = 1; i < sub.length; i++) {
                //reset
                for (let j = 1; j < sub.length; j++) {
                    sub[j].splice(0, sub[j].length); //clear
                    tiles.filter(t => t.id === j).forEach(t => sub[j].push(t));
                }
                tileGroups.splice(0, tileGroups.length); //clear

                //pair
                if (!isExposed && sub[i].length > 1) {
                    let pair = sub[i].splice(0, 2);
                    let pairGropp = TileGroup.create({
                        isPair: true,
                        isExposed: isExposed,
                        tiles: pair,
                    });
                    tileGroups.push(pairGropp);
                }

                //筒
                for (let j = 1; j <= 7; j++) {
                    let count = sub[j].length;
                    for (let x = 0; x < count; x++) {
                        if (sub[j].length > 0 && sub[j + 1].length > 0 && sub[j + 2].length > 0) {
                            let meld = [sub[j].shift(), sub[j + 1].shift(), sub[j + 2].shift()];
                            let pairGropp = TileGroup.create({
                                isMeld: true,
                                isSequence: true,
                                isExposed: isExposed,
                                tiles: meld,
                            });
                            tileGroups.push(pairGropp);
                        }

                    }
                }
                //條
                for (let j = 10; j <= 16; j++) {
                    let count = sub[j].length;
                    for (let x = 0; x < count; x++) {
                        if (sub[j].length > 0 && sub[j + 1].length > 0 && sub[j + 2].length > 0) {
                            let meld = [sub[j].shift(), sub[j + 1].shift(), sub[j + 2].shift()];
                            let pairGropp = TileGroup.create({
                                isMeld: true,
                                isSequence: true,
                                isExposed: isExposed,
                                tiles: meld,
                            });
                            tileGroups.push(pairGropp);
                        }

                    }
                }
                //萬
                for (let j = 19; j <= 25; j++) {
                    let count = sub[j].length;
                    for (let x = 0; x < count; x++) {
                        if (sub[j].length > 0 && sub[j + 1].length > 0 && sub[j + 2].length > 0) {
                            let meld = [sub[j].shift(), sub[j + 1].shift(), sub[j + 2].shift()];
                            let pairGropp = TileGroup.create({
                                isMeld: true,
                                isSequence: true,
                                isExposed: isExposed,
                                tiles: meld,
                            });
                            tileGroups.push(pairGropp);
                        }

                    }
                }

                //刻或槓
                for (let j = 0; j <= 34; j++) {
                    if (sub[j].length > 2) {
                        let meld = sub[j].splice(0, sub[j].length);
                        let pairGropp = TileGroup.create({
                            isMeld: true,
                            isTriplet: meld.length < 4,
                            isKong: meld.length > 3,
                            isExposed: isExposed,
                            tiles: meld,
                        });
                        tileGroups.push(pairGropp);
                    }
                }

                let subCount = sub.map(s => s.length).reduce((a, b) => a + b);
                if (subCount == 0) {
                    return tileGroups;
                }
            }

            return null;
        }

        __sevenPairsMapping(concealed, exposed, tile) {
            if (exposed.find(t => !t.isFlower))
                return null;
            if (concealed.find(t => t.isFlower))
                return null;
            if (concealed.length === 0)
                return null;
            if (concealed.length !== 13)
                return null;

            let tileGroups = [];
            let tiles = [...exposed];
            tiles.push(tile);
            tiles = tiles.sort((a, b) => a.id - b.id);
            while (tiles[0].id == tiles[1].id) {
                let pair = sub[i].tiles.splice(0, 2);
                let pairGropp = TileGroup.create({
                    isPair: true,
                    isExposed: false,
                    tiles: pair,
                });
                tileGroups.push(pairGropp);
            }
            if (tiles.length === 0 && pairGropp.length === 7)
                return tileGroups;
            return null;
        }

        __thirteenOrphansMapping(concealed, exposed, tile) {
            if (exposed.find(t => !t.isFlower))
                return null;
            if (concealed.find(t => t.isFlower))
                return null;
            if (concealed.length === 0)
                return null;
            if (concealed.length !== 13)
                return null;

            let tiles = [...exposed];
            tiles.push(tile);

            if (tiles.find(t.isDot && t.rank > 1 && t.rank < 9))
                return null;
            if (tiles.find(t.isBamboo && t.rank > 1 && t.rank < 9))
                return null;
            if (tiles.find(t.isCharacter && t.rank > 1 && t.rank < 9))
                return null;
            for (let i = 0; i < tiles.length - 1; i++) {
                if (tiles[i].id == tiles[i + 1].id)
                    return null;
            }
            let tileGroups = [];
            let pair = sub[i].tiles.splice(0, 2);
            let pairGropp = TileGroup.create({
                isExposed: false,
                isThirteenOrphans: true,
                tiles: tiles,
            });
            tileGroups.push(pairGropp);
            return tileGroups;
        }


        __meldMapping(isExposed, tiles, allTiles) {
            let tileGroups = [];
            let subs = new Array(43);
            for (let i = 0; i < subs.length; i++) {
                subs[i] = {
                    default: allTiles.result.datas.find(v => v.id == i),
                    tiles: []
                };
            }
            let reset = () => {
                for (let j = 1; j < subs.length; j++) {
                    subs[j].tiles.splice(0, subs[j].tiles.length); //clear
                    tiles.filter(t => t.id === j).forEach(t => subs[j].tiles.push(t));
                }
                tileGroups.splice(0, tileGroups.length); //clear
            }
            for (let i = 1; i < subs.length; i++) {
                //reset
                reset();
                //pair
                let pair = null;
                if (!isExposed && subs[i].tiles.length > 1) {
                    pair = subs[i].tiles.splice(0, 2);
                    let pairGropp = TileGroup.create({
                        isPair: true,
                        isExposed: isExposed,
                        tiles: pair,
                    });
                    tileGroups.push(pairGropp);
                }


                let addSequenceGroup = min => {
                    let meld = [subs[min].tiles.shift(), subs[min + 1].tiles.shift(), subs[min + 2].tiles.shift()];
                    let pairGropp = TileGroup.create({
                        isMeld: true,
                        isSequence: true,
                        isExposed: isExposed,
                        tiles: meld,
                    });
                    tileGroups.push(pairGropp);
                    return pairGropp
                };

                let findSequenceGroup = (sqSub, subitem) => {
                    let count = subitem.tiles.length;
                    //找從數量最少的開始找
                    for (let x = 1; x <= count; x++) {
                        for (let r = subitem.default.rank - 2; r <= subitem.default.rank; r++) {
                            let rankSub = [
                                sqSub.find(s => s.default.rank == r),
                                sqSub.find(s => s.default.rank == r + 1),
                                sqSub.find(s => s.default.rank == r + 2)
                            ];
                            if (rankSub[0] && rankSub[1] && rankSub[2]) {
                                if (rankSub[0].tiles.length > 0 && rankSub[1].tiles.length > 0 && rankSub[2].tiles.length > 0) {
                                    if (rankSub[0].tiles.length <= x && rankSub[1].tiles.length <= x && rankSub[2].tiles.length <= x) {
                                        return addSequenceGroup(r);
                                    }
                                }
                            }
                        }
                    }
                    for (let r = subitem.default.rank - 2; r <= subitem.default.rank; r++) {
                        let rankSub = [
                            sqSub.find(s => s.default.rank == r),
                            sqSub.find(s => s.default.rank == r + 1),
                            sqSub.find(s => s.default.rank == r + 2)
                        ];
                        if (rankSub[0] && rankSub[1] && rankSub[2]) {
                            if (rankSub[0].tiles.length > 0 && rankSub[1].tiles.length > 0 && rankSub[2].tiles.length > 0) {
                                return addSequenceGroup(r);
                            }
                        }
                    }
                    return null;
                };


                //找順子
                let sqGroup = null;
                do {
                    //最大最小值
                    let ranges = [
                        {
                            min: Math.min(...subs.filter(s => s.default && s.default.isDot && s.tiles.length > 0).map(s => s.default.rank)),
                            max: Math.max(...subs.filter(s => s.default && s.default.isDot && s.tiles.length > 0).map(s => s.default.rank))
                        },
                        {
                            min: Math.min(...subs.filter(s => s.default && s.default.isBamboo && s.tiles.length > 0).map(s => s.default.rank)),
                            max: Math.max(...subs.filter(s => s.default && s.default.isBamboo && s.tiles.length > 0).map(s => s.default.rank))
                        },
                        {
                            min: Math.min(...subs.filter(s => s.default && s.default.isCharacter && s.tiles.length > 0).map(s => s.default.rank)),
                            max: Math.max(...subs.filter(s => s.default && s.default.isCharacter && s.tiles.length > 0).map(s => s.default.rank))
                        }
                    ]
                    let checkSqIndexs = subs
                        .filter((s, index) =>
                            //數量 1~2 張
                            s.tiles.length > 0 && s.tiles.length < 3 &&
                            //筒條萬
                            index >= 1 && index <= 27)
                        .sort((a, b) => {
                            //排序 1.數量小->大, 2.越靠近最大/小值優先判斷
                            if (a.tiles.length === b.tiles.length && a.default.isDot === b.default.isDot &&
                                a.default.isBamboo === b.default.isBamboo && a.default.isCharacter === b.default.isCharacter) {
                                let range;
                                if (a.default.isDot)
                                    range = ranges[0];
                                else if (a.default.isBamboo)
                                    range = ranges[1];
                                else
                                    range = ranges[2];
                                let a_sort = a.default.rank - range.min;
                                if (range.max - a.default.rank < a_sort)
                                    a_sort = range.max - a.default.rank;
                                let b_sort = b.default.rank - range.min;
                                if (range.max - b.default.rank < b_sort)
                                    b_sort = range.max - b.default.rank;

                                return a_sort - b_sort;
                            }
                            return a.tiles.length - b.tiles.length;
                        })
                        .map((s) => s.default.id);
                    sqGroup = null;
                    for (let j = 0; j < checkSqIndexs.length; j++) {
                        let subitem = subs[checkSqIndexs[j]];
                        let sqSub = subs.filter(s =>
                            s.default &&
                            s.default.isDot == subitem.default.isDot &&
                            s.default.isBamboo == subitem.default.isBamboo &&
                            s.default.isCharacter == subitem.default.isCharacter);
                        sqGroup = findSequenceGroup(sqSub, subitem);
                        if (sqGroup != null)
                            break;
                    }
                }
                while (sqGroup != null)

                //刻或槓
                for (let j = 0; j <= 34; j++) {
                    if (subs[j].tiles.length > 2) {
                        let meld = subs[j].tiles.splice(0, subs[j].tiles.length);
                        let meldGropp = TileGroup.create({
                            isMeld: true,
                            isTriplet: meld.length < 4,
                            isKong: meld.length > 3,
                            isExposed: isExposed,
                            tiles: meld,
                        });
                        tileGroups.push(meldGropp);
                    }
                }

                let subCount = subs.map(s => s.tiles.length).reduce((a, b) => a + b);
                if (subCount == 0) {
                    return tileGroups;
                }
            }
            return tileGroups;
        }

    }
    return new TileGroupSvc(tileSvc);
}