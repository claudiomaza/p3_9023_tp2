const express = require('express');
const cors = require('cors');
const app = express();
const ventasRoutes = require('./routes/ventas');

app.use(cors());
app.use(express.json());

app.use('/ventas', ventasRoutes);

app.listen(3001, () => {
  console.log('Servidor backend corriendo en puerto 3001');
});

