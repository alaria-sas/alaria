---
inclusion: always
---

# Alaria — Estructura y arquitectura

## Organización por módulo de dominio

El código vive en `src/modules/<dominio>`. Los dominios son: `auth`, `properties`,
`appointments`, `catalogs`, `dashboard` y `shared`. Cada módulo de dominio sigue la misma
estructura interna:

```
modules/<dominio>/
├── components/     # Atomic Design: atoms/ molecules/ organisms/ templates/
├── pages/          # una carpeta por página, con su .tsx y su .scss
├── services/       # capa de acceso a datos (Supabase)
├── store/          # slice de Redux Toolkit del dominio
└── types/          # tipos e interfaces del dominio (index.ts)
```

`shared` es transversal: componentes reutilizables, `store/` (configuración del store y
`uiSlice`), `constants/routes.ts`, `hooks/`, `services/supabase.ts`, `styles/` y `types/`.

## Atomic Design

Los componentes se clasifican en `atoms/`, `molecules/`, `organisms/` y `templates/`.
Cada componente vive en su propia carpeta con el `.tsx` y, si aplica, un `.scss` del mismo
nombre. Ejemplo: `components/organisms/Sidebar/Sidebar.tsx` + `Sidebar.scss`. Ubicá los
componentes nuevos en el nivel que corresponda y respetá el patrón carpeta-por-componente.

## Estado (Redux Toolkit)

- El store se arma en `modules/shared/store/index.ts` combinando los reducers de cada
  dominio: `auth`, `catalogs`, `properties`, `appointments` y `ui`.
- Cada dominio expone un slice creado con `createSlice`. Las operaciones asíncronas usan
  `createAsyncThunk`, y el slice maneja sus estados en `extraReducers` con el trío
  `pending` / `fulfilled` / `rejected`.
- Convención de estado por slice: `isLoading: boolean`, `error: string | null`, más los
  datos del dominio (`items`, `selectedX`, etc.). En `rejected` se guarda
  `action.error.message` con un mensaje de respaldo en español.
- Usá SIEMPRE los hooks tipados `useAppDispatch` y `useAppSelector` de
  `modules/shared/hooks/useAppDispatch.ts`, nunca los de react-redux directamente.

## Capa de servicios (acceso a datos)

- Cada dominio expone un objeto service (ej. `propertiesService`, `authService`) con
  métodos `async`. Ahí vive TODO el acceso a Supabase; los componentes y slices no llaman a
  `supabase` directamente.
- Los servicios usan el cliente único de `modules/shared/services/supabase.ts`.
- Patrón de consulta: `supabase.from('<tabla>').select(...).eq(...)`, desestructurando
  `{ data, error }` y haciendo `throw error` ante fallo. Las relaciones se traen con la
  sintaxis de embedding de Supabase (ver `PROPERTY_SELECT` en `propertiesService.ts`).
- El storage de archivos usa el bucket `property-media`.

## Modelo de datos

Todas las tablas llevan el prefijo `house_` (`house_users`, `house_properties`,
`house_property_media`, `house_appointments`, `house_favorites`, y las lookup:
`house_roles`, `house_property_types`, `house_transaction_types`, `house_localities`,
`house_strata`, `house_property_states`, `house_appointment_states`). Los tipos TypeScript
espejan estas tablas en los `types/index.ts` de cada dominio (ej. `HouseProperty`,
`PropertyWithRelations`, `HouseUser`).

## Enrutamiento y arranque

- `App.tsx` monta `Provider` (Redux) → `BrowserRouter` → `ScrollToTop` + `GlobalLoader` +
  `AppInitializer` → `Routes`.
- `AppInitializer` despacha `checkSession()` al montar para restaurar la sesión antes de
  renderizar la app.
- Las rutas privadas se envuelven en `ProtectedRoute`; las de admin le pasan
  `requiredRole="admin"`.
- Casi todas las páginas cuelgan de `MainLayout` (header + sidebar). Login y registro usan
  su propio layout.

## Cómo agregar un dominio o página nueva

1. Creá `modules/<dominio>/` con `components/`, `pages/`, `services/`, `store/`, `types/`.
2. Definí el slice y registralo en `modules/shared/store/index.ts`.
3. Agregá la ruta en `modules/shared/constants/routes.ts` y la `<Route>` en `App.tsx`.
4. Todo acceso a datos va en el service del dominio, no en el componente.
