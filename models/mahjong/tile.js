

const PageModel = require('./page-list');
class TileModel {
    static create(model) {
        if (model !== undefined && model != null) {
            let p = new TileModel();
            Object.keys(p).forEach(k => {
                p[k] = model[k];
            });
            // Object.assign(p, model);
            return p;
        }
        return null;
    }
    id;
    name;
    rank = 0;
    isDragon = false;
    isWind = false;
    isHonor = false;
    isDot = false;
    isCharacter = false;
    isFlower = false;
    count = 1;
}

class TileSearch extends PageModel.PageSearch {
}


class TileSearchResult extends TileSearch {
    result = new PageModel.PageListResult();
}


module.exports.TileModel = TileModel;
module.exports.TileSearch = TileSearch;
module.exports.TileSearchResult = TileSearchResult;