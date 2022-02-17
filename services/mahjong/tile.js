
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
      searchTile(tileSearch) {
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
    }
  
    return new TileSvc(mahjongReps);
  }