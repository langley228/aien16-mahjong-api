
module.exports = (mahjongReps, mahjongModel) => {
  // const mahjongModel = require('mahjong-models');
  const { TileModel, TileSearch, TileSearchResult } = mahjongModel.Tile;
  const { PageList, PageSearch, PageListResult } = mahjongModel.PageList;

  class TileSvc {
    constructor(mahjongReps) {
      this.tileRep = mahjongReps.reps.Tile;
      this.Sequelize = mahjongReps.Sequelize;
    }
    // constructor() {
    //   const config = require(__dirname + '/../config/config.json')[env];
    //   const mahjongModels = require('mahjong-models');
    //   const mahjongModels = mahjongModels(config);
    //   const tileRep = mahjongModels.Tile;
    //   this.tileRep = tileRep;
    // }
    addTile(tile) {
      const { id, img, create_date, ...p } = TileModel.create(tile);
      const tileRep = this.tileRep;

      return tileRep.create(p)
        .then(r => r.id)
        .then(id => tileRep.findByPk(id))
        .then(r => TileModel.create(r));
    }
    updateTile(tile) {
      const { id, img, create_date, ...p } = TileModel.create(tile);
      return this.tileRep.findByPk(id)
        .then(r => r.update(p))
        .then(r => TileModel.create(r));
    }
    getTileById(id) {
      return this.tileRep.findByPk(id)
        .then(r => TileModel.create(r));
    }
    deleteTileById(id) {
      const tileRep = this.tileRep;
      return tileRep.findByPk(id)
        .then(r => {
          if (r)
            return tileRep.destroy({ where: { id: r.id } });
          return 0;
        });
    }

    searchTile_db(tileSearch) {
      let pageList = new PageList();
      Object.assign(pageList, tileSearch.pageList);
      const limit = pageList.size;
      const offset = (pageList.num - 1) * pageList.size;
      const where = {};
      const Op = this.Sequelize.Op;
      if (tileSearch.search && tileSearch.search.keyword && tileSearch.search.keyword !== '') {
        //https://sequelize.org/v5/manual/querying.html
        // where.name = { [Op.substring]: tileSearch.search.name };

        Object.assign(where, {
          [Op.or]: [
            { name: { [Op.substring]: tileSearch.search.keyword } },
            // { desc: { [Op.substring]: tileSearch.search.keyword } },
          ]
        });
      }
      return this.tileRep.findAndCountAll({
        where: where,
        limit: limit,  //每頁幾個
        offset: offset //跳過幾個 = limit * index
      }).then(
        dbResult => {
          let result = new TileSearchResult();
          pageList.total = Math.ceil(1.0 * dbResult.count / pageList.size);
          result.search = tileSearch.search;
          result.pageList = pageList;
          result.result.total = dbResult.count;
          result.result.total = dbResult.count;
          let rowsCount = offset;
          if (dbResult.rows) {
            result.result.datas = dbResult.rows.map(row => TileModel.create(row));
            rowsCount += result.result.datas.length;
          }
          if (result.result.total > rowsCount) {
            let nextPage = new TileSearch();
            nextPage.search = result.search;
            nextPage.pageList.num = result.pageList.num + 1;
            nextPage.pageList.size = result.pageList.size;
            nextPage.pageList.total = result.pageList.total;
            result.nextPage = nextPage;
          }
          return result;
        });
    }
    
    searchTile(tileSearch) {
      return new Promise((resolve, reject) => {
        resolve({
          "search": {},
          "pageList": {
            "num": 1,
            "size": 50,
            "total": 1
          },
          "result": {
            "total": 42,
            "datas": [
              {
                "id": 1,
                "name": "一筒",
                "rank": 1,
                "isDragon": false,
                "isWind": false,
                "isHonor": false,
                "isDot": true,
                "isBamboo": false,
                "isCharacter": false,
                "isFlower": false,
                "count": 4
              },
              {
                "id": 2,
                "name": "二筒",
                "rank": 2,
                "isDragon": false,
                "isWind": false,
                "isHonor": false,
                "isDot": true,
                "isBamboo": false,
                "isCharacter": false,
                "isFlower": false,
                "count": 4
              },
              {
                "id": 3,
                "name": "三筒",
                "rank": 3,
                "isDragon": false,
                "isWind": false,
                "isHonor": false,
                "isDot": true,
                "isBamboo": false,
                "isCharacter": false,
                "isFlower": false,
                "count": 4
              },
              {
                "id": 4,
                "name": "四筒",
                "rank": 4,
                "isDragon": false,
                "isWind": false,
                "isHonor": false,
                "isDot": true,
                "isBamboo": false,
                "isCharacter": false,
                "isFlower": false,
                "count": 4
              },
              {
                "id": 5,
                "name": "五筒",
                "rank": 5,
                "isDragon": false,
                "isWind": false,
                "isHonor": false,
                "isDot": true,
                "isBamboo": false,
                "isCharacter": false,
                "isFlower": false,
                "count": 4
              },
              {
                "id": 6,
                "name": "六筒",
                "rank": 6,
                "isDragon": false,
                "isWind": false,
                "isHonor": false,
                "isDot": true,
                "isBamboo": false,
                "isCharacter": false,
                "isFlower": false,
                "count": 4
              },
              {
                "id": 7,
                "name": "七筒",
                "rank": 7,
                "isDragon": false,
                "isWind": false,
                "isHonor": false,
                "isDot": true,
                "isBamboo": false,
                "isCharacter": false,
                "isFlower": false,
                "count": 4
              },
              {
                "id": 8,
                "name": "八筒",
                "rank": 8,
                "isDragon": false,
                "isWind": false,
                "isHonor": false,
                "isDot": true,
                "isBamboo": false,
                "isCharacter": false,
                "isFlower": false,
                "count": 4
              },
              {
                "id": 9,
                "name": "九筒",
                "rank": 9,
                "isDragon": false,
                "isWind": false,
                "isHonor": false,
                "isDot": true,
                "isBamboo": false,
                "isCharacter": false,
                "isFlower": false,
                "count": 4
              },
              {
                "id": 10,
                "name": "一條",
                "rank": 1,
                "isDragon": false,
                "isWind": false,
                "isHonor": false,
                "isDot": false,
                "isBamboo": true,
                "isCharacter": false,
                "isFlower": false,
                "count": 4
              },
              {
                "id": 11,
                "name": "二條",
                "rank": 2,
                "isDragon": false,
                "isWind": false,
                "isHonor": false,
                "isDot": false,
                "isBamboo": true,
                "isCharacter": false,
                "isFlower": false,
                "count": 4
              },
              {
                "id": 12,
                "name": "三條",
                "rank": 3,
                "isDragon": false,
                "isWind": false,
                "isHonor": false,
                "isDot": false,
                "isBamboo": true,
                "isCharacter": false,
                "isFlower": false,
                "count": 4
              },
              {
                "id": 13,
                "name": "四條",
                "rank": 4,
                "isDragon": false,
                "isWind": false,
                "isHonor": false,
                "isDot": false,
                "isBamboo": true,
                "isCharacter": false,
                "isFlower": false,
                "count": 4
              },
              {
                "id": 14,
                "name": "五條",
                "rank": 5,
                "isDragon": false,
                "isWind": false,
                "isHonor": false,
                "isDot": false,
                "isBamboo": true,
                "isCharacter": false,
                "isFlower": false,
                "count": 4
              },
              {
                "id": 15,
                "name": "六條",
                "rank": 6,
                "isDragon": false,
                "isWind": false,
                "isHonor": false,
                "isDot": false,
                "isBamboo": true,
                "isCharacter": false,
                "isFlower": false,
                "count": 4
              },
              {
                "id": 16,
                "name": "七條",
                "rank": 7,
                "isDragon": false,
                "isWind": false,
                "isHonor": false,
                "isDot": false,
                "isBamboo": true,
                "isCharacter": false,
                "isFlower": false,
                "count": 4
              },
              {
                "id": 17,
                "name": "八條",
                "rank": 8,
                "isDragon": false,
                "isWind": false,
                "isHonor": false,
                "isDot": false,
                "isBamboo": true,
                "isCharacter": false,
                "isFlower": false,
                "count": 4
              },
              {
                "id": 18,
                "name": "九條",
                "rank": 9,
                "isDragon": false,
                "isWind": false,
                "isHonor": false,
                "isDot": false,
                "isBamboo": true,
                "isCharacter": false,
                "isFlower": false,
                "count": 4
              },
              {
                "id": 19,
                "name": "一萬",
                "rank": 1,
                "isDragon": false,
                "isWind": false,
                "isHonor": false,
                "isDot": false,
                "isBamboo": false,
                "isCharacter": true,
                "isFlower": false,
                "count": 4
              },
              {
                "id": 20,
                "name": "二萬",
                "rank": 2,
                "isDragon": false,
                "isWind": false,
                "isHonor": false,
                "isDot": false,
                "isBamboo": false,
                "isCharacter": true,
                "isFlower": false,
                "count": 4
              },
              {
                "id": 21,
                "name": "三萬",
                "rank": 3,
                "isDragon": false,
                "isWind": false,
                "isHonor": false,
                "isDot": false,
                "isBamboo": false,
                "isCharacter": true,
                "isFlower": false,
                "count": 4
              },
              {
                "id": 22,
                "name": "四萬",
                "rank": 4,
                "isDragon": false,
                "isWind": false,
                "isHonor": false,
                "isDot": false,
                "isBamboo": false,
                "isCharacter": true,
                "isFlower": false,
                "count": 4
              },
              {
                "id": 23,
                "name": "五萬",
                "rank": 5,
                "isDragon": false,
                "isWind": false,
                "isHonor": false,
                "isDot": false,
                "isBamboo": false,
                "isCharacter": true,
                "isFlower": false,
                "count": 4
              },
              {
                "id": 24,
                "name": "六萬",
                "rank": 6,
                "isDragon": false,
                "isWind": false,
                "isHonor": false,
                "isDot": false,
                "isBamboo": false,
                "isCharacter": true,
                "isFlower": false,
                "count": 4
              },
              {
                "id": 25,
                "name": "七萬",
                "rank": 7,
                "isDragon": false,
                "isWind": false,
                "isHonor": false,
                "isDot": false,
                "isBamboo": false,
                "isCharacter": true,
                "isFlower": false,
                "count": 4
              },
              {
                "id": 26,
                "name": "八萬",
                "rank": 8,
                "isDragon": false,
                "isWind": false,
                "isHonor": false,
                "isDot": false,
                "isBamboo": false,
                "isCharacter": true,
                "isFlower": false,
                "count": 4
              },
              {
                "id": 27,
                "name": "九萬",
                "rank": 9,
                "isDragon": false,
                "isWind": false,
                "isHonor": false,
                "isDot": false,
                "isBamboo": false,
                "isCharacter": true,
                "isFlower": false,
                "count": 4
              },
              {
                "id": 28,
                "name": "東",
                "rank": 0,
                "isDragon": false,
                "isWind": true,
                "isHonor": true,
                "isDot": false,
                "isBamboo": false,
                "isCharacter": false,
                "isFlower": false,
                "count": 4
              },
              {
                "id": 29,
                "name": "南",
                "rank": 0,
                "isDragon": false,
                "isWind": true,
                "isHonor": true,
                "isDot": false,
                "isBamboo": false,
                "isCharacter": false,
                "isFlower": false,
                "count": 4
              },
              {
                "id": 30,
                "name": "西",
                "rank": 0,
                "isDragon": false,
                "isWind": true,
                "isHonor": true,
                "isDot": false,
                "isBamboo": false,
                "isCharacter": false,
                "isFlower": false,
                "count": 4
              },
              {
                "id": 31,
                "name": "北",
                "rank": 0,
                "isDragon": false,
                "isWind": true,
                "isHonor": true,
                "isDot": false,
                "isBamboo": false,
                "isCharacter": false,
                "isFlower": false,
                "count": 4
              },
              {
                "id": 32,
                "name": "中",
                "rank": 0,
                "isDragon": true,
                "isWind": false,
                "isHonor": true,
                "isDot": false,
                "isBamboo": false,
                "isCharacter": false,
                "isFlower": false,
                "count": 4
              },
              {
                "id": 33,
                "name": "發",
                "rank": 0,
                "isDragon": true,
                "isWind": false,
                "isHonor": true,
                "isDot": false,
                "isBamboo": false,
                "isCharacter": false,
                "isFlower": false,
                "count": 4
              },
              {
                "id": 34,
                "name": "白",
                "rank": 0,
                "isDragon": true,
                "isWind": false,
                "isHonor": true,
                "isDot": false,
                "isBamboo": false,
                "isCharacter": false,
                "isFlower": false,
                "count": 4
              },
              {
                "id": 35,
                "name": "春",
                "rank": 1,
                "isDragon": false,
                "isWind": false,
                "isHonor": false,
                "isDot": false,
                "isBamboo": false,
                "isCharacter": false,
                "isFlower": true,
                "count": 1
              },
              {
                "id": 36,
                "name": "夏",
                "rank": 2,
                "isDragon": false,
                "isWind": false,
                "isHonor": false,
                "isDot": false,
                "isBamboo": false,
                "isCharacter": false,
                "isFlower": true,
                "count": 1
              },
              {
                "id": 37,
                "name": "秋",
                "rank": 3,
                "isDragon": false,
                "isWind": false,
                "isHonor": false,
                "isDot": false,
                "isBamboo": false,
                "isCharacter": false,
                "isFlower": true,
                "count": 1
              },
              {
                "id": 38,
                "name": "冬",
                "rank": 4,
                "isDragon": false,
                "isWind": false,
                "isHonor": false,
                "isDot": false,
                "isBamboo": false,
                "isCharacter": false,
                "isFlower": true,
                "count": 1
              },
              {
                "id": 39,
                "name": "梅",
                "rank": 1,
                "isDragon": false,
                "isWind": false,
                "isHonor": false,
                "isDot": false,
                "isBamboo": false,
                "isCharacter": false,
                "isFlower": true,
                "count": 1
              },
              {
                "id": 40,
                "name": "蘭",
                "rank": 2,
                "isDragon": false,
                "isWind": false,
                "isHonor": false,
                "isDot": false,
                "isBamboo": false,
                "isCharacter": false,
                "isFlower": true,
                "count": 1
              },
              {
                "id": 41,
                "name": "菊",
                "rank": 3,
                "isDragon": false,
                "isWind": false,
                "isHonor": false,
                "isDot": false,
                "isBamboo": false,
                "isCharacter": false,
                "isFlower": true,
                "count": 1
              },
              {
                "id": 42,
                "name": "竹",
                "rank": 4,
                "isDragon": false,
                "isWind": false,
                "isHonor": false,
                "isDot": false,
                "isBamboo": false,
                "isCharacter": false,
                "isFlower": true,
                "count": 1
              }
            ]
          }
        });
      });
    }
  }

  return new TileSvc(mahjongReps);
}