configura las rutas para las peticiones estableciendo una ruta
para autenticacion y otra para autorizacion

Authentication:

    POST /api/auth/signup
    POST /api/auth/signin


Authorization:

    GET /api/test/all
    GET /api/test/user for loggedin users (user/admin)
    GET /api/test/admin for admin