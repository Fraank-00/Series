const express = require('express');
const cors = require('cors');
const { sequelize } = require('./DB');
const Usuario = require('./src/models/User');
require('dotenv').config()

const authRouter = require('./src/auth/Authen'); // Importa las rutas de autenticación.
//const authenticateToken = require('./src/auth/middleware'); // Importa el middleware para autenticación de tokens.


const app = express();

// Middleware para manejar JSON

app.use(express.json());
app.use(cors()); 

// Ruta de ejemplo
app.get('/', (req, res) => {
    res.send("ejemplo"); //
});

// Usar las rutas de autentica
app.use('/auth', authRouter);


// Sincronización de modelos y inicio del servidor
sequelize.sync({ force: false }) // Sincroniza los modelos de Sequelize con la base de datos.
  .then(() => {
    console.log('Tablas sincronizadas');
    app.listen(3000, () => {
      console.log('El servidor está corriendo en el puerto 3000'); 
    });
  })
  .catch(err => console.error('Error al sincronizar modelos:', err)); 