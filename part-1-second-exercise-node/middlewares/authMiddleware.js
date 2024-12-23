const jwt = require('jsonwebtoken');

// Este middleware de autenticación se encarga de manejar la seguridad y validación de los tokens JWT en la aplicación.
// 1. Validación del token: El middleware verifica si el encabezado de autorización contiene un token. Si no se proporciona, se devuelve un estado 401 con el mensaje "Access denied".
// 2. Verificación del token: Si se encuentra un token, se utiliza la biblioteca `jsonwebtoken` para verificar su validez usando una clave secreta almacenada en `process.env.JWT_SECRET`.
//    - Si el token es válido, se decodifica y los datos del usuario (`req.user`) se adjuntan al objeto de la solicitud para su uso posterior.
//    - Si el token es inválido o ha expirado, se responde con un estado 403 y el mensaje "Invalid token".
// 3. Flujo seguro: Al utilizar este middleware, solo las solicitudes con un token válido pueden acceder a rutas protegidas, garantizando que los recursos estén protegidos de accesos no autorizados.


const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'Access denied' });

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified;
    next();
  } catch (err) {
    res.status(403).json({ error: 'Invalid token' });
  }
};

module.exports = authMiddleware;
