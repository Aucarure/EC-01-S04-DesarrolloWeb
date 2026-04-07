const axios = require('axios');
const API_URL = 'https://jsonplaceholder.typicode.com/users';

exports.listarUsuarios = async (req, res) => {
  try {
    const response = await axios.get(API_URL);
    res.render('usuarios/index', { usuarios: response.data, filtrados: null });
  } catch (error) {
    res.status(500).json({ error: 'Error al consumir la API externa' });
  }
};

exports.filtrarPorNombre = async (req, res) => {
  try {
    const { nombre } = req.query;
    const response = await axios.get(API_URL);
    const filtrados = response.data.filter(u =>
      u.name.toLowerCase().includes(nombre.toLowerCase())
    );
    res.render('usuarios/index', { usuarios: response.data, filtrados });
  } catch (error) {
    res.status(500).json({ error: 'Error al filtrar usuarios' });
  }
};

exports.transformarUsuarios = async (req, res) => {
  try {
    const response = await axios.get(API_URL);
    const transformados = response.data.map(u => ({
      nombre: u.name,
      email: u.email
    }));
    res.render('usuarios/transformar', { transformados });
  } catch (error) {
    res.status(500).json({ error: 'Error al transformar usuarios' });
  }
};