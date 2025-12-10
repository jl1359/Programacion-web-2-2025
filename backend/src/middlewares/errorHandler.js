export const errorHandler = (err, req, res, next) => {
    console.error('Error:', err.message);
    console.error('Stack:', err.stack);
    if (err.name === 'MongoError' || err.name === 'MongoServerError') {
        return res.status(500).json({
        success: false,
        message: 'Error de base de datos',
        error: process.env.NODE_ENV === 'development' ? err.message : undefined
        });
    }
    if (err.name === 'ValidationError') {
        return res.status(400).json({
        success: false,
        message: 'Error de validacion',
        errors: Object.values(err.errors).map(e => e.message)
        });
    }
    res.status(err.status || 500).json({
        success: false,
        message: err.message || 'Errordel servidor',
        ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
    });
};