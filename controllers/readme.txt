-> los controladores son para las operaciones de cada datos: autenticacion de usuarios, crud con mongoose

Hay dos funciones que necesitan de esto:
    -> iniciar sesion/signin:
        busca el nombre en bbdd
        comprueba que sea la contraseña correcta con bcrypt
        genera token con jsonwebtoken
        devuelve la info y acceso al token
    -> registrarse/signup: crea un usuario en la bbdd con rol user al no ser especificado

Operaciones crud de los datos (la mayoeria de operaciones son comunes):
    ->
    ->
    ->