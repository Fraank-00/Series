
const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
  // Extrae el token del encabezado 'authorization' en la solicitud HTTP
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Obtiene el token después de la palabra 'Bearer'

  if (token == null) return res.sendStatus(401); // Si no hay token, responde con un estado 401 (No autorizado)

  // Verifica el token usando el secreto JWT
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      console.error('Token verification failed:', err);
      return res.sendStatus(403); // Si el token es inválido, responde con un estado 403 (Prohibido)
    }

    console.log('Token verified, user:', user); // Imprime la información del usuario verificada en la consola
    req.user = user; // Añade la información del usuario al objeto de solicitud para uso posterior
    next(); // Llama a la siguiente función de middleware
  });
};

module.exports = authenticateToken