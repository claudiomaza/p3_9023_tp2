const express = require('express');
const router = express.Router();

const { crearVenta } = require('../controllers/ventasController');

router.post('/', crearVenta);

module.exports = router;
