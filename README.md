# Bitácora de Accesos — Frontend

Frontend en React + Vite + Tailwind para el sistema de control de entradas/salidas.
Responsive: pensado para usarse como kiosko en tablet, desde el celular del personal
de seguridad, o desde la computadora de recepción.

## Requisitos

- Node.js 18+
- La Web API (.NET) corriendo (ver sección "Nota sobre el backend" abajo).

## Cómo correrlo

```bash
npm install
cp .env.example .env   # ajusta VITE_API_URL si tu API no corre en localhost:5261
npm run dev
```

Abre http://localhost:5173

## Estructura

```
src/
  api/          Llamadas HTTP a la Web API (client.js, persons.js, visits.js)
  components/   Layout, formularios, tablas, modal, toasts
  pages/        Panel, Visitas, Personas, Historial por persona
  utils/        Formato de fechas y duración
```

## Páginas

- **Panel** (`/`): resumen de visitas activas y total de personas.
- **Visitas** (`/visitas`): registrar entrada/salida por código (pensado para
  escaneo rápido en el kiosko de la entrada), lista de visitas activas y de
  todo el historial.
- **Personas** (`/personas`): alta, edición, baja y búsqueda de personas.
- **Historial por persona** (`/personas/:id/historial`): todas las visitas de
  una persona específica.

## ⚠️ Nota sobre el backend

Al mapear los DTOs encontré un detalle en `PersonEndpoint.cs` que probablemente
quieras corregir: el grupo de rutas ya usa el prefijo `/api/persons`

```csharp
var group = app.MapGroup("/api/persons").WithTags("Persons");
...
group.MapPost("/api/persons", async (CreatePersonDTO request, ...) => { ... });
```

Esto hace que la ruta real para crear una persona quede en
`/api/persons/api/persons`, no en `/api/persons` como muestran tu `WebApi.http`
y como espera este frontend. Te recomiendo cambiar esa línea a:

```csharp
group.MapPost("/", async (CreatePersonDTO request, ...) => { ... });
```

(igual que ya hacen el resto de los endpoints del grupo). Mientras no se
corrija, el alta de personas desde este frontend devolverá 404.

También ten en cuenta que `CreatePersonDTO` y `UpdatePersonDTO` usan la
propiedad `firtsName` (con el typo tal cual está en tu código) — el frontend
ya envía ese nombre de campo para que coincida.

## Variables de entorno

| Variable        | Descripción                          | Default                  |
|-----------------|---------------------------------------|---------------------------|
| `VITE_API_URL`  | URL base de la Web API                | `http://localhost:5261`  |
