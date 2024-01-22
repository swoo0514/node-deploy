const express = require('express');

const { isLoggedIn } = require('../middlewares');
const { follow } = require('../controllers/user');
const { unFollow } = require('../controllers/user');

const router = express.Router();

router.post('/:id/follow', isLoggedIn, follow);

router.post('/:id/unFollow', isLoggedIn, unFollow);

module.exports = router;
