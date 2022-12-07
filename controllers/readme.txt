-> los controladores son para la autenticacion de usuarios

Hay dos funciones que necesitan de esto:
    -> iniciar sesion/signin:
        busca el nombre en bbdd
        comprueba que sea la contraseña correcta con bcrypt
        genera token con jsonwebtoken
        devuelve la info y acceso al token
    -> registrarse/signup: crea un usuario en la bbdd con rol user al no ser especificado