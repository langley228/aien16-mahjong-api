
module.exports = (tileSvc, mahjongModel) => {
    // const mahjongModel = require('mahjong-models');
    const { TileModel, TileSearch, TileSearchResult } = mahjongModel.Tile;
    const TileGroup = mahjongModel.TileGroup;
    const { PageList, PageSearch, PageListResult } = mahjongModel.PageList;

    class TileGroupSvc {
        constructor(tileSvc) {
            this.tileSvc = tileSvc;
        }
        CanWin(inIds, outIds, lastId) {
            let tileSearch = new TileSearchResult();
            let __meldMapping = this.__meldMapping;
            return tileSvc.searchTile(tileSearch).then(allTiles => {
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
                let groups = __meldMapping(true, exposed);
                if (groups == null)
                    return false;
                groups.forEach(tg => tileGroups.push(tg));
                //檢查裡面的牌
                groups = __meldMapping(false, concealed);
                if (groups == null)
                    return false;
                groups.forEach(tg => tileGroups.push(tg));

                //檢查將眼
                if (tileGroups.filter(tg => tg.isPair).length !== 1)
                    return false;

                //檢查組數 
                if (tileGroups.filter(tg => tg.isMeld).length !== 5)
                    return false;

                return true;
            });
        }


        __meldMapping(isExposed, tiles) {
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
    }
    return new TileGroupSvc(tileSvc);
}