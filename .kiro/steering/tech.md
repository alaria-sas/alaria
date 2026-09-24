---
inclusion: always
---

# Alaria — Stack y comandos

## Stack

- **React 19** con **TypeScript** (`~6.0`), SPA.
- **Vite 8** como bundler y dev server (`@vitejs/plugin-react`).
- **Redux Toolkit 2** + **react-redux 9** para estado global.
- **React Router 7** (`react-router-dom`) para enrutamiento (`BrowserRouter`).
- **Supabase** (`@supabase/supabase-js`) como backend: base de datos Postgres, storage y
  consultas. NO se usa Supabase Auth (ver `structure.md` y las convenciones de seguridad).
- **Sass** para estilos (un `.scss` por componente + variables globales).
- **Leaflet** + **react-leaflet** para mapas de ubicación de inmuebles.
- **Recharts** para gráficos del dashboard.
- **react-dropzone** para subida de archivos multimedia.
- **date-fns** para manejo de fechas.
- **lucide-react** para iconos.
- **Oxlint** como linter (no ESLint).

## Comandos

```bash
npm run dev       # servidor de desarrollo Vite (no lo lances tú en background)
npm run build     # tsc -b && vite build — el build valida tipos antes de empaquetar
npm run lint      # oxlint
npm run preview   # sirve el build de dist/
```

El `build` corre `tsc -b` primero, así que **un error de tipos rompe el build**. Después
de cambiar código, corré `npm run build` o al menos `tsc -b` para verificar tipos, y
`npm run lint` para el linter.

## Variables de entorno

Definidas en `.env` (ver `.env.example`), leídas vía `import.meta.env`:

- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`

Si faltan, `isSupabaseConfigured` en `src/modules/shared/services/supabase.ts` es `false`
y el cliente usa valores placeholder (la app carga pero no hay datos).

## Base de datos

El esquema y los datos semilla están versionados como SQL en la raíz del repo
(`supabase-schema.sql`, `supabase-seed-data.sql`, `supabase-schedules.sql`,
`supabase-amenities.sql`, `supabase-pending-state.sql`, `supabase-full-setup.sql`). Son la
fuente de verdad del modelo de datos: si cambiás una tabla, actualizá el SQL correspondiente.

## Despliegue

Se despliega en **Vercel** (`vercel.json`).

## Alias de imports

`modules` → `src/modules` (definido en `vite.config.ts` y los `tsconfig`). Importá siempre
`modules/...` en vez de rutas relativas largas.
