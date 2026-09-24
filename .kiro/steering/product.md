---
inclusion: always
---

# Alaria — Producto

## Qué es

Alaria es una aplicación web de **gestión de inmuebles en Bogotá**. Permite publicar,
buscar y visitar propiedades (venta y arriendo), agendar citas de visita y gestionar
favoritos. Es una SPA de una sola página pública con un área administrativa.

## Actores y roles

Hay dos roles, definidos en la tabla `house_roles` y resueltos en el estado `auth.role`:

- **`user`** (usuario común): navega el catálogo de inmuebles, agenda citas de visita y
  administra sus favoritos.
- **`admin`** (administrador): además de lo anterior, crea/edita/desactiva inmuebles,
  gestiona la multimedia, administra los catálogos y ve el dashboard con métricas.

El control de acceso es por ruta, mediante `ProtectedRoute` con la prop `requiredRole`.
Un usuario sin el rol requerido es redirigido al listado de inmuebles.

## Dominios funcionales

- **properties (inmuebles)**: el núcleo. Listado con filtros, detalle, alta/edición
  (formulario completo y "flash register" rápido), mapa con Leaflet, galería multimedia
  (fotos y videos) y estados del inmueble (Disponible, Reservado, Vendido, Arrendado,
  Pendiente).
- **appointments (citas)**: agendamiento de visitas a inmuebles, con fecha, hora, notas
  y estados (Pendiente, Confirmada, Completada, Cancelada). Incluye gestión de horarios.
- **catalogs (catálogos)**: administración de tablas lookup — tipos de inmueble, tipos de
  transacción, localidades, estratos, estados — y contactos/usuarios.
- **favorites (favoritos)**: inmuebles marcados por cada usuario.
- **auth**: login, registro y perfil.
- **dashboard**: panel administrativo con gráficos (Recharts).

## Rutas (en español)

Las rutas de usuario están en español y son parte del producto, no un detalle técnico:
`/inmuebles`, `/inmuebles/:id`, `/citas`, `/mis-favoritos`, `/perfil`. El área admin va
bajo `/admin/*` (`/admin/dashboard`, `/admin/inmuebles/crear`, `/admin/inmuebles/flash`,
`/admin/catalogos`). Definidas en `src/modules/shared/constants/routes.ts`.

## Idioma

La UI, los mensajes de error y los comentarios del código están en **español**. Mantené
ese idioma al agregar textos visibles o mensajes al usuario.
