# Introducción

Este es el backend que respalda la aplicación de comercio electrónico [Low Cost](https://github.com/TDelgadodev/Low_Cost_Frontend), cuyo frontend está disponible en Low Cost Frontend. La plataforma de Low Cost ofrece una amplia gama de productos, que van desde artículos para el hogar hasta dispositivos de tecnología, como teléfonos móviles y televisores.

## Desarrolladores
Este proyecto fue desarrollado por:

- [Thiago Delgado](https://github.com/TDelgadodev)
- [Gabriel Lanzillotti](https://github.com/gnicolaslan)

## Tecnologías Utilizadas
El backend de Low Cost se desarrolló utilizando un conjunto de tecnologías y herramientas que permiten su funcionamiento eficiente y seguro. Estas tecnologías incluyen:

1. **Node.js**: Como entorno de tiempo de ejecución de JavaScript, Node.js es la base de nuestro backend, lo que permite una programación eficiente y escalable del servidor.

2. **Express**: Utilizamos Express como el framework web para Node.js, lo que facilita la creación de rutas, middleware y la gestión de solicitudes HTTP.

3. **Base de Datos SQL (MySQL)**: Almacenamos datos críticos en una base de datos SQL para garantizar la integridad y consistencia de los datos. MySQL es el sistema de gestión de bases de datos que utilizamos.

4. **Nodemailer**: Nodemailer se utiliza para el envío de correos electrónicos, lo que permite la comunicación con los usuarios, y tambien permitir al usuario cambiar su contraseña mediante un codigo recibido por email.

5. **Bcrypt**: Para garantizar la seguridad de las contraseñas de los usuarios, utilizamos Bcrypt para el hash de contraseñas y la protección de credenciales.

6. **CORS**: Para permitir peticiones externas y asegurar la interoperabilidad con el frontend, implementamos el manejo de CORS (Cross-Origin Resource Sharing).

7. **Cloudinary y Multer**: Utilizamos Cloudinary y Multer para la gestión de imágenes en la nube y la subida de imágenes de productos. Ante cualquier duda, puede [verificar el guia de Cloudinary](https://github.com/gnicolaslan/webLowCost/blob/master/guia-cloudinary.md)

8. **Sequelize**: Sequelize es un ORM (Object-Relational Mapping) que facilita la interacción con la base de datos MySQL y simplifica las operaciones de consulta.

9. **Mercado Pago**: Integramos Mercado Pago para el manejo de pagos y el seguimiento del estado de las compras realizadas en la plataforma.

10. **JSON Web Tokens (JWT)**: Implementamos JWT para la autenticación de usuarios, lo que garantiza que las rutas y los recursos estén protegidos y que los usuarios tengan acceso autorizado.

## Instalacion

Siga estos pasos para configurar y ejecutar el backend de Low Cost en su entorno de desarrollo:

1. Clone el proyecto desde el repositorio en GitHub:
    ```Bash
    git clone https://github.com/gnicolaslan/webLowCost
    ```
2. Navegue al directorio del proyecto:
     ```Bash
     cd webLowCost
      ```
3. Instale las dependencias del proyecto utilizando npm o yarn:
    ```Bash
    npm install
        # o
    yarn install
    ```
4. Cree un archivo de variables de entorno duplicando el archivo .env.example y renombrándolo a .env. Puede hacerlo manualmente o con el siguiente comando:
    ```Bash
    cp .env.example .env
    ```
5. Complete las variables de entorno en el archivo .env con la información necesaria para su entorno de desarrollo. Aquí están las variables que debe configurar:
 
>### Entorno de Desarrollo:
>
> - `NODE_ENV`: El nombre del entorno de desarrollo (por ejemplo,`development`,`test`,`production`, etc).
>
>#### Base de datos
>
>- `DB_USERNAME`: El nombre de usuario de la base de datos.
>- `DB_PASSWORD`: La contraseña del usuario de la base de datos.
>- `DB_DATABASE`: El nombre de la base de datos.
>- `DB_HOST`: El host de la base de datos (por ejemplo, localhost).
>- `DB_PORT`: El puerto de la base de datos (normalmente 3306).
> 
> #### Nodemailer
> 
>- `EMAIL`: La dirección de correo electrónico que se utilizará para enviar correos electrónicos.
>- `EMAIL_PASSWORD`:  La contraseña del correo electrónico configurado para enviar correos electrónicos.
>
>#### Cloudinary:
>
>- `CLOUD_NAME`: Su nombre de nube en Cloudinary.
>- `API_KEY`: Su clave de API de Cloudinary.
>- `API_SECRET`:  Su secreto de API de Cloudinary.
>- `API_ENVIRONMENT_VARIABLE`: (Opcional) Variable de entorno para seleccionar un entorno diferente (puede dejarla vacía en la mayoría de los casos).
>
>#### JWT
>- `JWT_SECRET`: Una clave secreta utilizada para el proceso de autenticación del usuario. 
>   Guarda y cierra el archivo .env después de configurar todas las variables de entorno.
> 

6. Guarda y cierra el archivo `.env` después de configurar todas las variables de entorno.

    Con estos pasos completados, su entorno de desarrollo estará configurado y listo para ejecutar el backend de Low Cost. Puede iniciar el servidor mediante el siguiente comando:
    ```Bash
    npm start
    # o
    yarn start
    ```
7. Extra: Para mas informacion sobre el funcionamiento de la API, [puedes visitar su despectiva documentacion]().