const express = require('express')
const router = express.Router()
const tileSvc = require('../config/di').services.TileSvc;
const tileGroupSvc = require('../config/di').services.TileGroupSvc;
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
        tileGroupSvc.CanWin(req.body.inIds, req.body.outIds, req.body.lastId).then(p => res.json({
            canWin: p
        }));
    });

module.exports = router;