const express = require('express');
const router = express.Router();
const itemsCtrl = require('../../controllers/api/items');

// GET /api/items
router.get('/', itemsCtrl.index);
// POST /api/items/addcomment
router.post('/:id/addcomment', itemsCtrl.addComment);
// GET /api/items/:id
router.get('/:id', itemsCtrl.show);


module.exports = router;