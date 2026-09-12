# Solaya Estudio — sitio web

Sitio de la marca premium (Next.js 16 + Tailwind v4). 4 páginas públicas
(Home, Portafolio, Estudio, Contacto) más un panel `/admin` para subir y
borrar fotos sin tocar código.

## Cómo funciona el almacenamiento de fotos

Todo vive en **Vercel Blob**: las imágenes que subes desde `/admin` y un
único archivo `data/manifest.json` (también en Blob) que guarda a qué
categoría pertenece cada foto, su orden, y las solicitudes que llegan del
formulario de contacto. No hay base de datos aparte — un solo servicio
cubre fotos + los pocos datos que necesita el admin.

Categorías: `hero` y `studio` son "singleton" (se muestra la de menor
número de orden); las 4 de portafolio (`portfolio-ceremonia`,
`portfolio-sesion`, `portfolio-detalles`, `portfolio-fiesta`) — organizadas
por momento del día de la boda, no por tipo de evento — aceptan varias
fotos. Mientras una categoría no tenga fotos, el sitio muestra un
placeholder con el mismo estilo de marca (no se ve roto).

## Desarrollo local

```bash
npm install
npm run dev
```

Ya incluye un `.env.local` (no se sube a git) con una contraseña de
prueba para `/admin` (`solaya-dev`) para que puedas correr el sitio de
inmediato. **Sin `BLOB_READ_WRITE_TOKEN` configurado, subir fotos o enviar
el formulario de contacto falla con un mensaje claro** (no un crash) — es
el comportamiento esperado hasta que conectes Blob (siguiente sección).

## Desplegar a Vercel (primera vez)

1. Crea una cuenta en [vercel.com](https://vercel.com) (gratis, con
   GitHub o Google).
2. Sube este repo a GitHub (o usa `npx vercel` directo desde esta carpeta
   sin GitHub, si prefieres).
3. En [vercel.com/new](https://vercel.com/new), importa el repo (o corre
   `npx vercel` aquí y sigue las instrucciones).
4. En el proyecto ya creado en Vercel: **Storage → Create Database →
   Blob**. Esto genera automáticamente la variable `BLOB_READ_WRITE_TOKEN`
   — no hay que copiarla a mano si el store queda conectado al proyecto.
5. En **Settings → Environment Variables**, agrega el resto de las
   variables de `.env.example` (`ADMIN_PASSWORD`, `ADMIN_SESSION_SECRET`,
   `NEXT_PUBLIC_WHATSAPP_NUMBER`, etc.) con los valores reales.
6. Vuelve a desplegar (o el primer deploy ya las toma si las agregaste
   antes de importar el repo).

Desde ahí, cada `git push` a la rama principal actualiza el sitio solo.

### Trabajar en local contra el Blob real (opcional)

Si quieres que `npm run dev` en tu máquina también use el Blob store real
(para probar subidas de verdad antes de deployar):

```bash
npx vercel link      # conecta esta carpeta a tu proyecto de Vercel
npx vercel env pull  # trae las variables reales a .env.local
```

## Estructura

- `app/(site)/` — páginas públicas (comparten nav + footer + botón de
  WhatsApp vía `app/(site)/layout.tsx`).
- `app/admin/` — panel de administración, protegido por `proxy.ts`
  (redirige a `/admin/login` si no hay sesión válida).
- `lib/blob.ts` — toda la lectura/escritura de fotos y leads.
- `lib/auth.ts` — sesión de admin (contraseña compartida + cookie
  firmada, sin base de datos de usuarios).
- `app/globals.css` — tokens de marca (`--color-ivory`, `--color-bronze`,
  etc.) y las dos fuentes (Italiana para títulos, Jost para el resto).

## Cambiar la contraseña del admin

Cambia `ADMIN_PASSWORD` en las variables de entorno de Vercel (o en
`.env.local` para desarrollo) y vuelve a desplegar. No hay que tocar
código.
