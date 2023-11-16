const express = require('express');
const router = express.Router();
const morgan = require('morgan');

router.use(morgan('dev'));

module.exports = router;