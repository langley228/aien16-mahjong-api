

class TileGroup {
    static create(model) {
        if (model !== undefined && model != null) {
            let p = new TileGroup();
            Object.keys(p).forEach(k => {
                if (Object.prototype.hasOwnProperty.call(model, k))
                    p[k] = model[k];
            });
            // Object.assign(p, model);
            return p;
        }
        return null;
    }
    isMeld = false;
    isPair = false;
    isTriplet = false;
    isSequence = false;
    isKong = false;
    isExposed = false;
    tiles = [];
}
module.exports = TileGroup;