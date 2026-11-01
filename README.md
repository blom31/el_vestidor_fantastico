# El Vestidor Fantástico

Monografía digital interactiva dedicada al cosplay de alta costura, las armaduras de fantasía y el trabajo de atelier. El proyecto presenta sus piezas como una revista editorial: portada, índice de capítulos, galería visual y dossiers técnicos.

## Síntesis

La aplicación es un prototipo frontend de una publicación digital para explorar un catálogo de piezas de fantasía. Permite recorrer capítulos, consultar diferentes vistas de una pieza, revisar sus materiales y técnicas, y abrir un formulario de encargo de demostración.

El proyecto no dispone actualmente de backend ni base de datos. Por eso, el formulario muestra una confirmación local sin enviar ni guardar los datos. La acción de ficha PDF también es demostrativa: no crea ni descarga un archivo.

## Funcionalidades

- Portada editorial y navegación por secciones.
- Índice interactivo que relaciona capítulos con piezas del catálogo.
- Galería con vista de pieza, detalle macro y plano ilustrativo.
- Dossier técnico con materiales, técnicas, conservación y métricas.
- Selección de piezas relacionadas mediante un carrusel.
- Formulario de encargo en modo demostración.
- Ambientación sonora generada en el navegador mediante Web Audio API.
- Diseño adaptable con estilos Sass Modules.

## Tecnologías

- **React 19** para la interfaz.
- **Vite 8** para desarrollo local y compilación.
- **Sass** para los estilos y sus módulos.
- **Lucide React** para los iconos.
- **Oxlint** para análisis estático del código.

## Requisitos

- Node.js `^20.19.0` o `>=22.12.0`.
- npm.

## Instalación y uso

Clona el repositorio y entra en la carpeta del proyecto. Luego instala las dependencias:

```bash
npm ci
```

Inicia el servidor de desarrollo:

```bash
npm run dev
```

Vite mostrará en la terminal la dirección local para abrir en el navegador.

### Comandos disponibles

| Comando | Descripción |
| --- | --- |
| `npm run dev` | Inicia el servidor de desarrollo con recarga en caliente. |
| `npm run build` | Genera la compilación de producción en `dist/`. |
| `npm run preview` | Sirve localmente la compilación de producción. |
| `npm run lint` | Analiza el código con Oxlint. |

## Estructura del proyecto

```text
.
├── public/                 Recursos estáticos públicos, como iconos y favicon
├── src/
│   ├── assets/             Imágenes y recursos importados desde la aplicación
│   ├── components/         Componentes de portada, navegación, catálogo y formulario
│   ├── data/
│   │   └── monographData.js
│   │                         Datos de capítulos y piezas del catálogo
│   ├── styles/             Sass Modules y estilos compartidos
│   │   ├── _mixins.scss    Mixins Sass
│   │   ├── _variables.scss Tokens visuales: colores, tipografía y breakpoints
│   │   └── *.module.scss   Estilos encapsulados por componente
│   ├── App.jsx             Composición principal y estado de la aplicación
│   ├── index.css           Estilos globales
│   └── main.jsx            Punto de entrada de React
├── index.html              Documento HTML inicial
├── package.json            Dependencias y comandos npm
├── package-lock.json       Versiones resueltas para instalaciones reproducibles
└── vite.config.js          Configuración de Vite
```

## Dependencias

Las versiones indicadas son las declaradas en `package.json`; `package-lock.json` registra las versiones concretas resueltas para la instalación.

### Aplicación

| Paquete | Versión declarada | Uso |
| --- | --- | --- |
| `react` | `^19.3.1` | Componentes y estado de la interfaz. |
| `react-dom` | `^19.3.1` | Renderizado de React en el navegador. |
| `lucide-react` | `^1.66.0` | Iconos de la interfaz. |

### Desarrollo

| Paquete | Versión declarada | Uso |
| --- | --- | --- |
| `vite` | `^8.3.5` | Servidor de desarrollo y compilación. |
| `@vitejs/plugin-react` | `^6.1.2` | Integración de React con Vite. |
| `sass` | `^1.107.1` | Compilación de Sass y Sass Modules. |
| `oxlint` | `^1.89.0` | Análisis estático y lint. |
| `@types/react` | `^19.3.0` | Definiciones de tipos de React. |
| `@types/react-dom` | `^19.3.0` | Definiciones de tipos de React DOM. |

## Contenido y recursos

Los datos de capítulos y piezas se mantienen en `src/data/monographData.js`. Algunas imágenes y fuentes tipográficas se cargan desde servicios externos, por lo que su disponibilidad depende de esos proveedores y de la conexión del navegador.

## Estado del proyecto

Prototipo visual e interactivo en evolución. No incluye persistencia de datos, servicios de envío, generación real de PDF ni pruebas automatizadas configuradas.
