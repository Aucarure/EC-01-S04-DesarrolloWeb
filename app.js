const express = require('express');
const path = require('path');
const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

const itemsRouter = require('./routes/items');
const usuariosRouter = require('./routes/usuarios');

app.use('/items', itemsRouter);
app.use('/usuarios', usuariosRouter);

app.get('/', (req, res) => {
  res.redirect('/items');
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});