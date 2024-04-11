# Entrevistador Inteligente

Entrevistador Inteligente es una plataforma que utiliza inteligencia artificial para ayudar a los usuarios a prepararse para entrevistas laborales de manera efectiva. Los usuarios pueden cargar su currículum vitae y completar un formulario que incluye la descripción del trabajo y el nombre de la empresa a la que desean postularse.

## Instalación

Instrucciones sobre cómo instalar el proyecto y configurar el entorno de desarrollo.

1. **Prerrequisitos**: 
- Asegúrate de tener instalado Node.js versión 20 en adelante Puedes descargarlo [aquí](https://nodejs.org/). 
- Además, necesitarás tener Angular CLI instalado globalmente. Si aún no lo tienes, puedes instalarlo ejecutando el siguiente comando: 
  `npm install -g @angular/cli`.
2. Clona el repositorio: `git clone https://github.com/EntrevistadorInteligente/landing-entrevistador.git`
3. Instala las dependencias: `npm install`
4. Ejecuta el proyecto: `npm start`

## Contribución

Si deseas contribuir a este proyecto, sigue estos pasos:

1. Haz un fork del repositorio
2. Crea una nueva rama con tu nombre ejemplo frailejon: `git checkout -b feature/frailejon`
3. Realiza tus cambios y haz commits: `git commit -m 'Añade una nueva característica'`
4. Sube tus cambios: `git push origin feature/frailejon`
5. Envía una solicitud de extracción (Pull Request)

Por favor, asegúrate de seguir nuestras pautas de contribución.

## Estructura del Proyecto

Este proyecto sigue una estructura organizativa específica para mantener una arquitectura limpia y modular. A continuación se detalla la organización de carpetas y los componentes principales en cada una:

### src/app/core

En esta carpeta se encuentran componentes y servicios fundamentales del núcleo de la aplicación:

## Components

1. **alert**: Componente para mostrar alertas y mensajes al usuario.
2. **carrusel**: Componente para mostrar contenido en forma de carrusel.
3. **contacto**: Componente que representa un formulario de contacto.
4. **help**: Componente para proporcionar ayuda contextual a los usuarios dentro de la aplicación.
5. **form-empresa**: Componente para formulario relacionado con la empresa.
6. **loader**: Componente de carga para indicar procesos en curso.
7. **login**: Componente para la funcionalidad de inicio de sesión.
8. **registro**: Componente para el registro de usuarios.
9. **error-403**: Este componente se muestra cuando el usuario no tiene permiso para acceder a un recurso.
10. **error-404**: Este componente se muestra cuando el usuario intenta acceder a una página que no existe.
11. **error-500**: Este componente se muestra cuando se produce un error.

## Guards

1. **rutas-no-visibles**: Este guardia protege las rutas de los componentes de error para evitar que sean accesibles sin autorización.

## Interceptors

1. **HttpErrorInterceptor**: Este interceptor captura las respuestas HTTP con errores y te permite manejarlas de forma personalizada.
2. **LoaderInterceptor**: Este interceptor muestra un indicador de carga mientras se espera una respuesta HTTP.
3. **OfflineInterceptor**: Este interceptor te permite manejar la situación cuando el usuario no tiene conexión a internet.

## Services

1. **signal-r**: Servicio que permite la comunicación en tiempo real utilizando SignalR.
2. **alert**: Servicio que permite gestionar alertas en toda la aplicación.
3. **error**: Servicio que permite gestionar errores de forma global en la aplicación.
4. **loader**: Servicio que permite mostrar un indicador de carga mientras se espera una respuesta de una operación asincrónica.
5. **network**: Servicio que permite verificar la conexión a internet y el estado de la red.
6. **offline**: Servicio que permite gestionar el comportamiento de la aplicación cuando el usuario no tiene conexión a internet.

### src/app/feature

Esta carpeta contiene el módulo y los componentes específicos para la página de aterrizaje:

## Inicio

1. **home**: Componentes relacionados con la página de inicio.
2. **home-login**: Componentes específicos para la página de inicio de sesión.

## Zona Entrevista

1. **zona-entrevista**: Componente para la entrevista al usuario

### src/app/shared

Aquí se encuentran los componentes, modelos y servicios compartidos entre varios módulos:

## Components

1. **menu**: Componente para la navegación principal de la aplicación.
2. **footer**: Componente para mostrar el pie de página de la aplicación.
3. **perfil**: Componente para mostrar y editar el perfil del usuario.

## Models

1. Definiciones de modelos y dtos utilizados en toda la aplicación.

    - **formulario-dto**:
    
        ```typescript
        export class FormularioDto {
            empresa: string;
            perfil: string;
            seniority: string;
            pais: string;
            constructor(
                empresa: string = '',
                perfil: string = '',
                seniority: string = '',
                pais: string = '') {
                this.empresa = empresa;
                this.perfil = perfil;
                this.seniority = seniority;
                this.pais = pais;
            }
        }
        ```
        - **Descripción**: DTO para almacenar información de un formulario.
        - **Campos**:
            `empresa`: Nombre de la empresa.
            `perfil`: Tipo de perfil buscado.
            `seniority`: Nivel de seniority.
            `pais`: País de ubicación.

    - **vista-previa-entrevista-dto**:
    
        ```typescript
        export class VistaPreviaEntrevistaDto {
            pregunta: string;
            constructor(pregunta: string){
                this.pregunta = pregunta;
            }
        }
        ```
        - **Descripción**: DTO para almacenar una pregunta de entrevista.
        - **Campos**:
            `pregunta`: Texto de la pregunta.

    - **preguntas-dto**:
    
        ```typescript
        export class PreguntasDto {
            respuesta: string;
            pregunta: string;
            constructor(
                respuesta: string = '',
                pregunta: string = '') {
                this.respuesta = respuesta;
                this.pregunta = pregunta;
            }
        }
        ```
        - **Descripción**: DTO para almacenar una pregunta y su respuesta.
        - **Campos**:
            `pregunta`: Texto de la pregunta.
            `respuesta`: Texto de la respuesta.

## Services

Servicios compartidos entre diferentes partes de la aplicación.

1. **alert-service**: Servicio para mostrar alertas y mensajes de notificación en la aplicación.
2. **dark-mode**: Servicio para gestionar el modo oscuro en la interfaz de usuario.
3. **feedback**: Servicio para recopilar comentarios y retroalimentación de los usuarios.
4. **integrador**: Servicio para integrar datos y funcionalidades de otros sistemas externos.
5. **login**: Servicio para gestionar la autenticación y el inicio de sesión de los usuarios.
6. **message-service**: Servicio para enviar y recibir mensajes dentro de la aplicación, como chat o notificaciones instantáneas.

### src/assets/img

Esta carpeta contiene recursos estáticos como imágenes utilizadas en la aplicación.

## Tecnologías Utilizadas

- Angular: Framework de desarrollo de aplicaciones web.
- PrimeNG: Biblioteca de componentes de UI para Angular.
- Bootstrap 5: Framework de diseño front-end para desarrollo web moderno.

### Dependencias

- Angular CLI: Herramienta de línea de comandos para Angular.
- PrimeIcons: Iconos adicionales para PrimeNG.
- ngx-bootstrap: Librería de componentes Bootstrap para Angular.
- angular-oauth2-oidc: Librería para la autenticación y autorización utilizando OAuth 2.0 y OpenID Connect en aplicaciones Angular.

## Estado del Proyecto

Entrevistador Inteligente se encuentra en desarrollo activo y se están agregando nuevas funcionalidades y mejoras continuamente.

## Contribución

¡Apreciamos cualquier contribución al proyecto!

## Licencia

Este proyecto es de código abierto.

## Contacto y Soporte

Si tienes alguna pregunta o necesitas ayuda, no dudes en ponerte en contacto con nosotros a través de [Discord aquí](https://discord.com/invite/AkR67b88YP){:target="_blank"}.

