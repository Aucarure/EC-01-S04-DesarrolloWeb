const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, '../data/items.json');

function leerItems() {
  const data = fs.readFileSync(dataPath, 'utf-8');
  return JSON.parse(data);
}

function guardarItems(items) {
  fs.writeFileSync(dataPath, JSON.stringify(items, null, 2));
}

exports.listarItems = (req, res) => {
  const items = leerItems();
  const errorMsg = req.query.error || null;
  res.render('items/index', { items, errorMsg });
};

exports.obtenerItem = (req, res) => {
  const items = leerItems();
  const item = items.find(i => i.id === parseInt(req.params.id));
  if (!item) return res.status(404).json({ error: 'Producto no encontrado' });
  res.json(item);
};

exports.buscarItem = (req, res) => {
  const { nombre } = req.query;

  if (!nombre) {
    return res.status(400).json({ error: 'El nombre es requerido para buscar' });
  }

  const items = leerItems();
  const item = items.find(i => i.nombre.toLowerCase() === nombre.toLowerCase());

  if (!item) {
    return res.status(404).json({ error: `Producto "${nombre}" no encontrado` });
  }

  res.json(item);
};

exports.crearItem = (req, res) => {
  const { nombre, descripcion, stock } = req.body;

  if (!nombre || !descripcion) {
    return res.status(400).json({ error: 'Error 400 :Nombre y descripción son requeridos' });
  }
  if (stock === '' || isNaN(Number(stock)) || Number(stock) < 0) {
    return res.status(400).json({ error: 'Error 400 :El stock debe ser un número válido mayor o igual a 0' });
  }

  const items = leerItems();
  const nuevoItem = {
    id: items.length > 0 ? items[items.length - 1].id + 1 : 1,
    nombre,
    descripcion,
    stock: parseInt(stock)
  };
  items.push(nuevoItem);
  guardarItems(items);
  res.status(201).json(nuevoItem); 
};

exports.actualizarItem = (req, res) => {
  const { nombre, descripcion, stock } = req.body;
  if (!nombre || !descripcion) {
    return res.status(400).json({ error: 'Nombre y descripción son requeridos' });
  }
  if (stock === '' || isNaN(Number(stock)) || Number(stock) < 0) {
    return res.status(400).json({ error: 'El stock debe ser un número válido mayor o igual a 0' });
  }
  const items = leerItems();
  const index = items.findIndex(i => i.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).json({ error: 'Producto no encontrado' });
  items[index] = { ...items[index], nombre, descripcion, stock: parseInt(stock) };
  guardarItems(items);
  res.json(items[index]);
};

exports.eliminarItem = (req, res) => {
  const items = leerItems();
  const index = items.findIndex(i => i.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).json({ error: 'Producto no encontrado' });
  items.splice(index, 1);
  guardarItems(items);
  res.json({ mensaje: 'Producto eliminado correctamente' });
};