# ⚖️ Página Web para Firma de Abogados (Acceso Restringido)

Esta aplicación web es el sitio oficial de una firma de abogados ficticia, diseñada para presentar sus servicios, noticias y detalles de contacto. Incorpora un sistema de autenticación robusto, con acceso al contenido principal **estrictamente restringido a un único usuario autorizado**.

---

## 🛠️ Tecnologías

* **Frontend:** [React](https://react.dev/) (con [Vite](https://vitejs.dev/) como bundler)
* **Estilos:** CSS3 (con variables CSS)
* **Autenticación:** [Firebase Authentication](https://firebase.google.com/docs/auth)
* **Despliegue:** [Firebase Hosting](https://firebase.google.com/docs/hosting) (puedes reemplazar por Vercel, Netlify, etc., si usas otro)
* **Control de Versiones:** [Git](https://git-scm.com/) / [GitHub](https://github.com/)

---



---

## 🚀 Configuración y Ejecución Local

Para poner en marcha el proyecto en tu máquina local:

1.  **Clonar el repositorio:**
    ```bash
    git clone [URL_DE_TU_REPOSITORIO]
    cd [nombre_de_tu_carpeta_de_proyecto]
    ```

2.  **Instalar dependencias:**
    ```bash
    npm install
    ```

3.  **Configurar Firebase:**
    * Asegúrate de tener un proyecto de Firebase creado en la consola de Google Firebase.
    * Crea o verifica el archivo `src/firebase.js` y configura tus credenciales. Asegúrate de que `auth` esté correctamente exportado:
        ```javascript
        // src/firebase.js
        import { initializeApp } from "firebase/app";
        import { getAuth } from "firebase/auth";

        const firebaseConfig = {
          apiKey: "TU_API_KEY", // <--- Reemplaza con tu clave API
          authDomain: "TU_AUTH_DOMAIN", // <--- Reemplaza con tu dominio de autenticación
          projectId: "TU_PROJECT_ID", // <--- Reemplaza con el ID de tu proyecto
          storageBucket: "TU_STORAGE_BUCKET",
          messagingSenderId: "TU_MESSAGING_SENDER_ID",
          appId: "TU_APP_ID"
        };

        const app = initializeApp(firebaseConfig);
        export const auth = getAuth(app);
        ```
    * En `src/auth/AuthContext.js`, **cambia el `ALLOWED_EMAIL`** a la dirección de correo electrónico específica del usuario que debe tener acceso.
    * Crea la cuenta de este usuario autorizado en la Consola de Firebase (`Authentication > Users > Add user`).

4.  **Ejecutar el servidor de desarrollo:**
    ```bash
    npm run dev
    ```
    Esto iniciará la aplicación en `http://localhost:5173/` (o un puerto similar).

---

## 🔒 Flujo de Autenticación y Acceso Restringido

Esta aplicación utiliza Firebase Authentication para gestionar el acceso de usuarios y aplica una estricta restricción de acceso:

* **Login:** Los usuarios pueden intentar iniciar sesión a través del modal de autenticación o la página de login dedicada.
* **Acceso Restringido:** El contenido principal de la aplicación (`HeroSection`, `AboutSection`, `ServicesSection`, `NewsSection`, etc.) **solo es visible para un usuario específico y pre-autorizado**.
    * La verificación del usuario autorizado se realiza en `src/auth/AuthContext.js`.
    * El email autorizado está definido en la constante `ALLOWED_EMAIL` dentro de `AuthContext.js`. Este valor debe coincidir con el email de la cuenta de Firebase del usuario que debe tener acceso.
    * Si un usuario intenta iniciar sesión con un email diferente al autorizado, su sesión será automáticamente cerrada y no tendrá acceso al contenido principal de la página.
* **Registro (Deshabilitado):** La funcionalidad de registro público está deshabilitada para mantener la exclusividad del acceso. Los usuarios autorizados deben ser creados manualmente en la consola de Firebase.

---

## 🚀 Despliegue

La aplicación está configurada para ser desplegada fácilmente en servicios de hosting. Se recomienda Firebase Hosting por su integración con el resto de los servicios de Firebase que ya utilizas.

1.  **Construir para producción:**
    Asegúrate de que todos tus cambios estén guardados y ejecuta el comando de construcción para generar los archivos optimizados para producción:
    ```bash
    npm run build
    ```
    Esto creará o actualizará la carpeta `dist/` en la raíz de tu proyecto.

2.  **Desplegar en Firebase Hosting:**
    * Asegúrate de tener Firebase CLI instalado globalmente (`npm install -g firebase-tools`) y de haber iniciado sesión (`firebase login`).
    * Navega a la raíz de tu proyecto en la terminal.
    * Ejecuta el comando de despliegue:
        ```bash
        firebase deploy --only hosting
        ```
    * La URL de la aplicación desplegada se mostrará en la terminal (ej. `https://tu-id-proyecto.web.app`). Esta es la URL que puedes compartir.

---

By: zere1ssei 
