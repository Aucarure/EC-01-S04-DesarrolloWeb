const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/itemsController');

router.get('/', ctrl.listarItems);
router.get('/:id', ctrl.obtenerItem);
router.post('/', ctrl.crearItem);
router.put('/:id', ctrl.actualizarItem);
router.delete('/:id', ctrl.eliminarItem);

module.exports = router;