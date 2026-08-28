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
## Variables de entorno

| Variable        | Descripción                          | Default                  |
|-----------------|---------------------------------------|---------------------------|
| `VITE_API_URL`  | URL base de la Web API                | `http://localhost:5261`  |
