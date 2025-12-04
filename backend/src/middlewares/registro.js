import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'dev_secret';
//verificacion de token
export function authMiddleware(req, res, next) {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(401).json({ message: 'Token no obtenido' });
    }
    const [bearer, token] = authHeader.split(' ');
    if (bearer !== 'Bearer' || !token) {
        return res.status(401).json({ message: 'Formato de token incorrecto' });
    }
    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        console.error('Error verificando token:', err.message);
        return res.status(401).json({
            message:
                err.name === 'TokenExpiredError'
                    ? 'Token expirado'
                    : 'Token incorrecto'
        });
    }
}
//Validar roles
export function requireRole(...rolesPermitidos) {
    return (req, res, next) => {
        if (!req.user) {
            return res.status(401).json({ message: 'No autenticado' });
        }
        if (!rolesPermitidos.includes(req.user.rol)) {
            return res.status(403).json({ message: 'No tienes permisos suficientes' });
        }
        next();
    };
}