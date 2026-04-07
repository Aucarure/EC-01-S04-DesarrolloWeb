const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/usuariosController');

router.get('/', ctrl.listarUsuarios);
router.get('/filtrar', ctrl.filtrarPorNombre);
router.get('/transformar', ctrl.transformarUsuarios);

module.exports = router;