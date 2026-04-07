const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/itemsController');

router.get('/', ctrl.listarItems);
router.get('/buscar', ctrl.buscarItem);  // ← antes de /:id y usando ctrl
router.get('/:id', ctrl.obtenerItem);
router.post('/', ctrl.crearItem);
router.put('/:id', ctrl.actualizarItem);
router.delete('/:id', ctrl.eliminarItem);

module.exports = router;