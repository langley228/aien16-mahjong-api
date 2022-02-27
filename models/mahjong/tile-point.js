
class TilePoint {
    static create(model) {
        if (model !== undefined && model != null) {
            let p = new Point();
            Object.keys(p).forEach(k => {
                if (Object.prototype.hasOwnProperty.call(model, k))
                    p[k] = model[k];
            });
            // Object.assign(p, model);
            return p;
        }
        return null;
    }
    name = false;
    point = 0;
    tiles = [];
}
module.exports = TilePoint;