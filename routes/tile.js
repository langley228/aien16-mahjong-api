const express = require('express')
const router = express.Router()
const tileSvc = require('../config/di').getServices('TileSvc');
const tileGroupSvc = require('../config/di').getServices('TileGroupSvc');
const { TileModel, TileSearch, TileSearchResult } = require('./../models/mahjong').Tile;

const multer = require('multer')
const upload = multer()
router.route('/tiles')
    .get((req, res) => {
        const s = new TileSearchResult();
        s.search.keyword = req.query.keyword;
        s.pageList = {
            num: Number(req.query.num),
            size: Number(req.query.size),
        };
        tileSvc.searchTile(s).then(r => {
            if (r.nextPage) {
                const kw = encodeURIComponent(r.search.keyword);
                //{req.protocol}://${req.hostname}
                const fullURL = `${req.originalUrl}?num=${r.nextPage.pageList.num}&size=${r.nextPage.pageList.size}&keyword=${kw}`;// protocol + "://" + hostname + path;
                r.nextUrl = fullURL;
            }
            res.json(r);
        });
    });

router.route('/tile/:id')
    .get(async (req, res) => {
        tileSvc.getTileById(req.params.id).then(p => res.json(p));
    })
    .delete(async (req, res) => {
        tileSvc.deleteTileById(req.params.id).then(() => res.json({}));
    })
    .put(upload.single('img'), async (req, res) => {
        req.body.id = req.params.id;
        tileSvc.updateTile(req.body).then(p => res.json(p));
    });

router.route('/tile')
    .post(upload.single('img'), async (req, res) => {
        tileSvc.addTile(req.body).then(p => res.json(p));
    });

router.route('/canwin')
    .post(upload.single('img'), async (req, res) => {
        let data = {
            inIds: req.body.inIds,
            outIds: req.body.outIds,
            lastId: req.body.lastId,
            isSelfDrawn: req.body.isSelfDrawn == true,
            prevailingId: req.body.prevailingId,
            dealerId: req.body.dealerId
        };
        tileGroupSvc.CanWin(data).then(p => res.json(p));
    });

router.route('/readyhand')
    .post(upload.single('img'), async (req, res) => {
        tileGroupSvc.ReadyHand({
            inIds: req.body.inIds,
            outIds: req.body.outIds
        }).then(p => res.json(p));
    });

module.exports = router;