# Configuración de Cloudinary

## Introducción

Cloudinary es un servicio en la nube que proporciona soluciones de almacenamiento y manipulación de imágenes. En nuestro proyecto, utilizamos Cloudinary para gestionar y almacenar imágenes de productos, banners y otros recursos gráficos.

## Configuración

Para empezar a utilizar Cloudinary en tu proyecto, sigue estos pasos:

1. **Regístrate en Cloudinary:** Si aún no tienes una cuenta, regístrate en [Cloudinary](https://cloudinary.com/) y crea un nuevo proyecto.


2. **Obtén tus credenciales:** Una vez registrado, obtén tus credenciales de Cloudinary, que incluyen tu `cloud_name`, `api_key` y `api_secret`.

3. **Instala la biblioteca de Cloudinary:** Utilizamos la biblioteca `cloudinary` para interactuar con el servicio. Puedes instalarla mediante npm:

   ```bash
   npm install cloudinary
   ```
4. Teniendo instalado `dotenv`, crear las variables de entorno correspondientes para requerirlas en el archivo `/config/cloudinary.js`, con la siguiente estructura;
    ```javascript
    require('dotenv').config();

    module.exports = {
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET,
    };
    ```
5. En el archivo `app.js` requerir la versión 2 del módulo de `cloudinary` y ejecutar su metodo `config`:
     ```javascript
     const cloudinary = require('cloudinary').v2;

     cloudinary.config({
        cloud_name: process.env.CLOUD_NAME,
        api_key: process.env.API_KEY,
        api_secret: process.env.API_SECRET
    });
     ```


## Subida de Imágenes

#### Ruta para Subir Imágenes

La ruta `/api/admin/create` se utiliza para cargar nuevas imágenes de productos a Cloudinary. Aquí está cómo funciona:

- **Método HTTP:** POST

- **Parámetros:** La solicitud utiliza el middleware Multer para manejar las solicitudes de archivos. Se espera que se envíen archivos de imagen con el nombre `imageFiles`.

- **Ejemplo de Solicitud:** Puedes utilizar herramientas como Postman o cURL para enviar una solicitud POST a esta ruta, adjuntando archivos de imagen.

- **Ejemplo de Respuesta:** Después de cargar con éxito, recibirás una respuesta que incluye información sobre la imagen subida, incluyendo la URL de acceso.

### Manipulación de Imágenes

Cloudinary ofrece una amplia gama de transformaciones de imágenes, que incluyen redimensionar, recortar, aplicar filtros y más. Puedes consultar la [documentación oficial de Cloudinary](https://cloudinary.com/documentation/image_transformations) para obtener detalles completos sobre cómo aplicar estas transformaciones.

### Ejemplo Práctico

En nuestro controlador de administración (`adminApiController.js`), puedes observar cómo se realiza la subida de imágenes y se almacenan las URL de las imágenes en la base de datos. Aquí hay un ejemplo de código que muestra cómo se suben las imágenes:

```javascript
const cloudinary = require('cloudinary').v2;
const multer = require('multer');

const upload = multer({ dest: './public/uploads/' });

// Ruta para subir una imagen a Cloudinary
router.post('/create', upload.array('imageFiles', 3), createProduct);

// Crear el producto y almacenar el URL de la imagen
const newProduct = await db.Product.create({
  name: title,
  price: +price,
  // ... (otros campos del producto)
  imageUrls: imageUrlString, // Almacenar las URL de las imágenes
});
```
