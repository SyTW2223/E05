configura las rutas para las peticiones estableciendo una ruta para cada opercion
para autenticacion y para autorizacion
estas rutas redirigen a los controllers

Authentication:

    POST /api/auth/signup
    POST /api/auth/signin


Authorization:

    GET /api/test/all
    GET /api/test/user for loggedin users (user/admin)
    GET /api/test/admin for admin

CRUD:

    