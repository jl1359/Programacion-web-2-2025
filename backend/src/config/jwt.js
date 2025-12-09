if (process.env.NODE_ENV === 'production' && !process.env.JWT_SECRET) {
    throw new Error('JWT_SECRET debe estar configurado');
}
export const JWT_SECRET = process.env.JWT_SECRET || 'dev_secret';
export const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '1h';