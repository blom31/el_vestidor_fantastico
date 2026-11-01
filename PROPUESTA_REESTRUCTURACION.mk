# Propuesta de estructura y reutilizacion
# Proyecto: El Vestidor Fantastico
# Fecha: 2026-11-01
# Proposito: propuesta para evaluar en conjunto antes de implementar.
#
# ALCANCE Y SUPUESTOS
# - Este archivo no cambia el codigo de la aplicacion.
# - El formulario de encargo es una demostracion local: confirma en pantalla, no persiste
#   ni envia datos. Esa conducta es intencional mientras no exista un servicio externo.
# - La accion PDF es una simulacion visual del prototipo y no tiene por que generar un
#   archivo hasta que se decida implementar esa funcionalidad.
# - No se propone agregar base de datos, backend, librerias de estado ni migrar a TypeScript.
# - La propuesta busca que el codigo sea mas facil de entender y extender, no dividirlo
#   artificialmente en muchos archivos.
#
# DIAGNOSTICO ESTRUCTURAL
# 1. App.jsx concentra varios cometidos: estado de navegacion/folio, seleccion de pieza,
#    apertura del modal, efectos de scroll y gestion de Web Audio. Conviene extraer solo
#    las responsabilidades con ciclo de vida o comportamiento independiente.
# 2. CosplayCard.jsx es el componente mas extenso y mezcla presentacion del dossier,
#    visualizador, acordeones, acciones y carrusel. Es el candidato principal a separar.
# 3. monographData.js concentra capitulos y fichas extensas de piezas, incluyendo URLs
#    remotas. La estructura de datos no esta separada del catalogo visual.
# 4. Hay patrones repetidos de navegacion y accion en Header, Footer y componentes de
#    contenido; los botones con la misma funcion pueden compartir componentes pequenos.
# 5. Los tokens Sass estan centralizados, una buena base, pero estilos globales/fuentes y
#    estilos de componentes se reparten entre index.css y archivos modulares.
# 6. Se usan nombres de clases utilitarias como "flex", "gap-2", "text-primary" en JSX,
#    pero no se detecta configuracion ni dependencia de Tailwind. Verificar cada una y
#    sustituirlas por CSS existente o por una convencion explicita antes de depender de ellas.
# 7. App.css, hero.png y los SVG de React/Vite parecen recursos iniciales; confirmar que
#    no esten referenciados antes de retirarlos.
#
# ESTRUCTURA OBJETIVO PROPUESTA
# src/
#   app/
#     App.jsx                    Composicion de la pagina y proveedores si hicieran falta.
#     usePageNavigation.js       Navegacion entre secciones y folio activo.
#   components/
#     ui/
#       IconButton.jsx           Boton iconico accesible, solo si hay usos repetidos.
#       SectionHeading.jsx       Pretitulo/titulo/divisor si las secciones comparten patron.
#       Accordion.jsx            Control accesible reutilizable para dossier.
#     layout/
#       SiteHeader.jsx           Header y navegacion editorial.
#       SiteFooter.jsx           Footer/colofon.
#   features/
#     cover/
#       Cover.jsx
#       Cover.module.scss
#     chapters/
#       ChapterMenu.jsx
#       ChapterItem.jsx          Extraer si el elemento se reutiliza o gana complejidad.
#       chapters.js              Datos de indice.
#       ChapterMenu.module.scss
#     catalog/
#       CatalogSection.jsx       Contenedor del catalogo.
#       SpecimenHeader.jsx       Identificacion y acciones de pieza.
#       SpecimenViewer.jsx       Vistas final/macro/plano.
#       TechnicalDossier.jsx     Metricas, materiales, tecnicas y conservacion.
#       SpecimenCarousel.jsx     Seleccion de otras piezas.
#       specimens.js             Datos de piezas del catalogo.
#       catalogSelectors.js      Busqueda/seleccion derivada, solo si se necesita.
#       *.module.scss            Estilos cercanos a su componente.
#     commissions/
#       CommissionDialog.jsx     Dialogo con formulario simulado.
#       commissionForm.js        Valores iniciales y transformaciones del formulario.
#       CommissionDialog.module.scss
#     soundscape/
#       useSoundscape.js         Creacion, activacion y limpieza del audio.
#   data/
#     media.js                   Rutas de imagenes locales, si conviene centralizarlas.
#   styles/
#     _tokens.scss               Paleta, tipografias, breakpoints, radios y transiciones.
#     _mixins.scss               Mixins existentes que se mantengan compartidos.
#     global.scss                Reset, fuentes, body, seleccion y scroll.
#   main.jsx
#
# La estructura anterior es una direccion, no una lista obligatoria de archivos. Si una
# extraccion no tiene responsabilidad clara o no reduce complejidad, mantener el codigo junto.
#
# CAMBIOS PROPUESTOS POR PRIORIDAD
#
# FASE 1 - ORDENAR SIN CAMBIAR LA EXPERIENCIA
# A. Aclarar el punto de entrada:
#    - Mantener main.jsx como arranque y App.jsx como composicion.
#    - Retirar CSS/activos de plantilla solo despues de comprobar que no se importan.
#    - Actualizar README con comandos npm, Node soportado y estructura basica.
# B. Consolidar estilos globales:
#    - Mover reset, fuentes, body y reglas globales a un unico global.scss importado una vez.
#    - Mantener los CSS Modules para estilos especificos de cada componente.
#    - Usar variables Sass existentes como fuente unica; evitar duplicar colores y breakpoints.
#    - Centralizar la carga de fuentes (ahora aparece en index.html y src/index.css).
# C. Organizar el catalogo:
#    - Separar chaptersData y specimensData en archivos por dominio.
#    - Mantener ids estables (ch-01, opus-084) para no romper seleccion ni relaciones.
#    - Extraer los datos sin renombrar campos en el primer paso; una migracion de esquema
#      se haria despues, en un cambio separado y probado.
# D. Corregir estilos utilitarios ambiguos:
#    - Auditar clases como flex, gap-2, text-primary, block y font-mono.
#    - Si Tailwind no es una decision del proyecto, reemplazarlas con clases de modulo o
#      utilidades globales Sass documentadas. No instalar Tailwind solo para unas pocas clases.
#
# FASE 2 - REDUCIR COMPLEJIDAD DE LOS COMPONENTES
# A. Dividir CosplayCard.jsx por responsabilidad:
#    - SpecimenHeader: codigo, nombre y botones.
#    - SpecimenViewer: pestanas y vistas de imagen/plano.
#    - TechnicalDossier: metricas, acordeones y cronologia.
#    - SpecimenCarousel: tarjetas para seleccionar otra pieza.
#    - El contenedor conserva el estado que realmente comparten estas partes.
# B. Extraer de App.jsx:
#    - usePageNavigation: listener de scroll, seccion seleccionada, folio y desplazamiento.
#    - useSoundscape: AudioContext, osciladores y limpieza al desmontar.
#    - Mantener abierto/cerrado y seleccion del dialogo en App o en una pequena feature
#      commission, evitando crear un gestor de estado global sin necesidad.
# C. Reducir props que no se usan:
#    - Pasar a cada componente solo callbacks y valores que consuma.
#    - Eliminar imports, props y datos duplicados a medida que se muevan responsabilidades.
#
# FASE 3 - REUTILIZACION SELECTIVA Y CONSISTENCIA
# A. Reutilizar patrones con semantica compartida:
#    - Acordeon: conservar contenido distinto, centralizar atributos/teclado/estado visual.
#    - Encabezado de seccion: solo si Cover, capitulos y catalogo comparten estructura real.
#    - Boton iconico/accion: reutilizar cuando se repitan estilos y comportamiento; no crear
#      un componente generico con decenas de variantes.
# B. Consolidar navegacion:
#    - Definir ids de seccion en un solo lugar y reutilizarlos en Header/Footer.
#    - Mantener Encargos como accion de dialogo, no simular una seccion con scroll.
#    - Asegurar que folio, navegacion y desplazamiento representan el mismo estado.
# C. Mejorar elementos repetidos de listas:
#    - Usar ids estables como key en materiales/tecnicas cuando el modelo los provea.
#    - Mantener el fallback de pieza desconocida en un unico selector, no duplicarlo.
#
# FASE 4 - VALIDACION Y MANTENIBILIDAD
# A. Agregar pruebas acotadas sin infraestructura externa:
#    - Seleccionar capitulo cambia pieza y desplaza a la galeria.
#    - Seleccionar tarjeta del carrusel actualiza el dossier.
#    - Abrir/cerrar el dialogo y precargar la pieza seleccionada.
#    - El formulario prototipo muestra su confirmacion local sin afirmar persistencia.
#    - La navegacion actualiza seccion y folio.
# B. Definir engines.node y ejecutar CI con npm ci, npm run lint y npm run build.
# C. Mantener npm audit y npm outdated como verificaciones periodicas; no actualizar majors
#    en el mismo cambio que una refactorizacion de estructura.
# D. Comprobar manualmente teclado, movil y movimiento reducido tras modificar componentes.
#
# GUIA DE MIGRACION SEGURA
# 1. Crear una rama de trabajo y registrar el estado actual. No sobrescribir cambios locales.
# 2. Completar una fase por PR/cambio pequeno: mover primero, mejorar despues.
# 3. Tras cada extraccion, ejecutar build y lint; revisar el diff y comparar la interfaz.
# 4. Mantener ids, nombres visibles, imagenes, interacciones y apariencia mientras se
#    reorganiza. Evitar redisenar el producto en paralelo a la refactorizacion.
# 5. Retirar elementos antiguos solo tras probar referencias, imports y build.
#
# CRITERIOS PARA CONSIDERAR COMPLETADA LA REESTRUCTURACION
# - App.jsx se limita a componer la pagina y coordinar estado de alto nivel.
# - La ficha de catalogo puede cambiarse sin editar datos de capitulos ni la interfaz general.
# - El visualizador, el dossier y el carrusel se pueden revisar/modificar por separado.
# - No hay clases utilitarias sin definicion ni duplicacion accidental de fuentes/tokens.
# - Navegacion, seleccion de piezas, formulario demostrativo y apariencia siguen funcionando.
# - Build correcto, lint sin advertencias nuevas y pruebas de interaccion para flujos clave.
#
# NO INCLUIDO EN ESTA PROPUESTA
# - Envio real de formularios, persistencia, base de datos o integracion de correo.
# - Generacion real de PDF.
# - Cambios de contenido, identidad visual, dependencias o framework.
# - Reescritura completa de componentes solo para alcanzar un numero de lineas menor.
#
# ESTADO DEL REPOSITORIO
# Al preparar esta propuesta ya existian cambios locales en Footer.jsx y varios SCSS, asi
# como REVISION_PROYECTO.mk. Se conservaron todos; esta propuesta se agrega en un archivo nuevo.
