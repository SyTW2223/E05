# Proyecto Sistemas y Tecnologías Web. Grupo 5
- Andrea Hernández Martín (alu0101119137@ull.edu.es)
- Ainoa Iglesias Dasilva (alu0101164403@ull.edu.es)
- Karina Kalwani Israni (alu0101109046@ull.edu.es)  

<p align="center">
    <a href="https://github.com/SyTW2223/E05/actions/workflows/node.js.yml">
        <img alt="Test" src="https://github.com/SyTW2223/E05/actions/workflows/node.js.yml/badge.svg">
    </a>
    <a href='https://github.com/SyTW2223/E05/actions/workflows/sonarcloud.yml'>
        <img src='https://github.com/SyTW2223/E05/actions/workflows/sonarcloud.yml/badge.svg' alt='Sonar Cloud' />
    </a>
</p>


## Introducción
Nuestra aplicación consiste en un sitio web que permite a los usuarios buscar
unos elementos en una base de datos ya existente y que se mantiene
actualizada. Los elementos son películas, libros y series, y el usuario podrá
interactuar con ellos. Los ítems consisten en una carátula, título y una
descripción.
Lo que la app permite hacer es:
- Registrarse: esto será obligatorio para todos los usuarios que quieran crear
listas y valorar elementos.
- Buscar elementos: la base de datos estará dividida en categorías,
libros/series/libros que a su vez pueden dividirse en subcategorías como
terror, comedia, fantasía...
- Marcar como leído/visto: una vez un usuario marca un ítem con esta
opción, el ítem pasará a una lista predeterminada de cada usuario. Existirá
una lista para películas, otra para series y otra para libros.
- Marcar para ver más tarde: cada usuario tendrá también una lista
predeterminada para libros, series y películas que guardará los elementos
que quiere ver más tarde.
- Crear listas: los usuarios pueden crear sus propias listas y añadir o eliminar
cualquier elemento de ella.
- Eliminar listas: se permite al usuario eliminar las listas predeterminadas y
las creadas por el mismo.
- Añadir elementos a las listas.
- Valorar ítem: los usuarios pueden valorar ítems para poder recordar
cuánto le gustó.