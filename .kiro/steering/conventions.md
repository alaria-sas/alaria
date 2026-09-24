---
inclusion: always
---

# Alaria — Convenciones y notas de seguridad

## Convenciones de código

- **Imports por alias**: usá `modules/...`, no rutas relativas largas.
- **Componentes**: función flecha + `export default` al final. Una carpeta por componente
  con `<Nombre>.tsx` y su `<Nombre>.scss` opcional.
- **Estilos**: Sass por componente. Los tokens compartidos (colores, breakpoints) viven en
  `modules/shared/styles/_variables.scss`; usalos en vez de hardcodear valores.
- **Estado**: hooks tipados `useAppDispatch` / `useAppSelector`. Slices con
  `createAsyncThunk` + `extraReducers`. No dupliques acceso a datos fuera de los services.
- **Tipos**: definí interfaces en el `types/index.ts` del dominio. Las entidades reflejan
  las tablas `house_*`. Reutilizá `BaseEntity`, `CatalogEntity`, `StratumEntity` de
  `modules/shared/types` cuando apliquen.
- **Idioma**: textos de UI y mensajes de error en español.
- **Confirmaciones**: para acciones destructivas usá el hook `useConfirm` + `ConfirmModal`
  (variantes `danger` / `warning` / `info`), no `window.confirm`.
- **Loader global**: usá `useLoader` / `GlobalLoader` para estados de carga a pantalla
  completa.

## Linter y verificación

El linter es **Oxlint** (`npm run lint`), no ESLint. La config está en `.oxlintrc.json`.
El `build` valida tipos con `tsc -b` antes de empaquetar: corré `npm run build` tras cambios
de tipos. **No hay suite de tests** en el proyecto; no asumas que existe un runner.

## Notas de seguridad — LEER antes de tocar auth o datos

Este proyecto nació como demo, y hay decisiones que son deuda técnica conocida, NO patrones
a imitar ni a propagar. Si trabajás cerca de estas áreas, tenelas presentes y, si el cambio
lo permite, proponé endurecerlas en vez de copiarlas.

- **Autenticación custom, no Supabase Auth.** `authService` valida credenciales con un
  `SELECT` sobre `house_users` comparando `email` y `password`. La sesión se guarda en
  `localStorage` (`house_user_session`) como el objeto usuario crudo.
- **Contraseñas en texto plano.** La columna `house_users.password` guarda la clave sin
  hashear y el login la compara directo. Si tocás auth, lo correcto es introducir hashing
  (bcrypt/argon2) del lado servidor; no agregues más lógica que dependa del texto plano.
- **RLS permisivo.** Todas las tablas tienen RLS activado pero con políticas `Allow all`
  (`USING (true) WITH CHECK (true)`), pensadas para desarrollo. No son seguras para
  producción: cualquier cliente con la anon key puede leer y escribir todo.
- **El control de rol es de cliente.** `ProtectedRoute` decide acceso leyendo el rol del
  estado; no hay autorización real en la base. No trates esa comprobación como una barrera
  de seguridad del backend.

Al generar código nuevo, seguí los patrones estructurales del repo (módulos, services,
slices, Atomic Design), pero no repliques estas cuatro debilidades: si el trabajo toca esas
zonas, señalá el riesgo y ofrecé la alternativa segura.
