const express = require('express');
const cors = require('cors');
const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());
app.get('/', (req, res) => {
  res.send('Servidor funcionando');
});

let productos = [
  { id: 1, imagen:'producto1', nombre: 'Plátano chiapas ', categoria: 'Frutas y Verduras', precio: 28.90 },
  { id: 2, imagen:'producto2', nombre: 'Leche Alpura deslactosada', categoria: 'Lactéos', precio: 51 },
  { id: 3, imagen:'producto3', nombre: 'Cereal Kelloggs Zucaritas', categoria: 'Cereales', precio: 88 },
  { id: 4, imagen:'producto4', nombre: 'Mayonesa McCormick', categoria: 'Mayonesas', precio: 56 },
  { id: 5, imagen:'producto5', nombre: 'Pan Bimbo blanco', categoria: 'Cereales', precio: 44.50 },
];

// GET - Obtener todos los productos
app.get('/api/productos', (req, res) => {
  res.json(productos);
});

// GET - Obtener un producto por ID
app.get('/api/productos/:id', (req, res) => {
  const producto = productos.find(p => p.id === parseInt(req.params.id));
  if (!producto) return res.status(404).send('Producto no encontrado');
  res.json(producto);
});

// POST - Crear un nuevo producto
app.post('/api/productos', (req, res) => {
  const { nombre, categoria, precio } = req.body;
  const producto = {
    id: productos.length + 1,
    imagen: 'producto0',
    nombre,
    categoria,
    precio
  };
  productos.push(producto);
  res.status(201).json(producto);
});

// PUT - Actualizar un producto
app.put('/api/productos/:id', (req, res) => {
  const producto = productos.find(p => p.id === parseInt(req.params.id));
  if (!producto) return res.status(404).send('Producto no encontrado');

  const { nombre, categoria, precio } = req.body;
  producto.nombre = nombre;
  producto.categoria = categoria;
  producto.precio = precio;

  res.json(producto);
});

// DELETE - Eliminar un producto
app.delete('/api/productos/:id', (req, res) => {
  const productoIndex = productos.findIndex(p => p.id === parseInt(req.params.id));
  if (productoIndex === -1) return res.status(404).send('Producto no encontrado');

  productos.splice(productoIndex, 1);
  res.json({ message: 'Producto eliminado con éxito' });
});

app.listen(port, '0.0.0.0', () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});
