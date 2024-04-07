# Entrevistador Inteligente

Entrevistador Inteligente es una plataforma que utiliza inteligencia artificial para ayudar a los usuarios a prepararse para entrevistas laborales de manera efectiva. Los usuarios pueden cargar su currículum vitae y completar un formulario que incluye la descripción del trabajo y el nombre de la empresa a la que desean postularse.

## Instalación

Instrucciones sobre cómo instalar el proyecto y configurar el entorno de desarrollo.

1. Clona el repositorio: `git clone https://github.com/EntrevistadorInteligente/landing-entrevistador.git`
2. Instala las dependencias: `npm install`
3. Ejecuta el proyecto: `npm start`

## Contribución

Si deseas contribuir a este proyecto, sigue estos pasos:

1. Haz un fork del repositorio
2. Crea una nueva rama con tu nombre: `git checkout -b feature/frailejon`
3. Realiza tus cambios y haz commits: `git commit -m 'Añade una nueva característica'`
4. Sube tus cambios: `git push origin feature/frailejon`
5. Envía una solicitud de extracción (Pull Request)

Por favor, asegúrate de seguir nuestras pautas de contribución.

# Estructura del Proyecto

Este proyecto sigue una estructura organizativa específica para mantener una arquitectura limpia y modular. A continuación se detalla la organización de carpetas y los componentes principales en cada una:

## src/app/core

En esta carpeta se encuentran componentes y servicios fundamentales del núcleo de la aplicación:

### Components

1. **alert**: Componente para mostrar alertas y mensajes al usuario.
2. **carrusel**: Componente para mostrar contenido en forma de carrusel.
3. **contacto**: Componente que representa un formulario de contacto.
4. **drag**: Componente para funcionalidades de arrastrar y soltar.
5. **form-empresa**: Componente para formulario relacionado con la empresa.
6. **loader**: Componente de carga para indicar procesos en curso.
7. **login**: Componente para la funcionalidad de inicio de sesión.
8. **registro**: Componente para el registro de usuarios.
9. **perfil**: Componente para mostrar y editar el perfil del usuario.

### Services

1. **signal-r**: Servicio para la comunicación en tiempo real utilizando SignalR.
2. **alert**: Servicio para gestionar alertas en toda la aplicación.

## src/app/landing

Esta carpeta contiene el módulo y los componentes específicos para la página de aterrizaje:

1. **home**: Componentes relacionados con la página de inicio.
2. **home-login**: Componentes específicos para la página de inicio de sesión.

## src/app/shared

Aquí se encuentran los componentes, modelos y servicios compartidos entre varios módulos:

### Components

1. **menu**: Componente para la navegación principal de la aplicación.
2. **footer**: Componente para mostrar el pie de página de la aplicación.

### Models

1. Definiciones de modelos y dtos utilizados en toda la aplicación.

### Services

1. Servicios compartidos entre diferentes partes de la aplicación.

## src/assets

Esta carpeta contiene recursos estáticos como imágenes utilizadas en la aplicación.

## Tecnologías Utilizadas

- Angular
- PrimeNG
- Bootstrap 5

## Estado del Proyecto

Entrevistador Inteligente se encuentra en desarrollo activo y se están agregando nuevas funcionalidades y mejoras continuamente.

## Contribución

¡Apreciamos cualquier contribución al proyecto!

## Licencia

Este proyecto es de código abierto.


