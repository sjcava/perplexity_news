# Portal de Noticias - Perplexity AI

Web app que busca y resume noticias usando Perplexity AI y n8n.

## Caracteristicas

- 6 categorias predefinidas (Venezuela, Economia, Politica, Tecnologia, Deportes, Internacional)
- Busqueda personalizada de cualquier tema
- Historial de busquedas (localStorage)
- Diseno responsive con soporte para dark mode
- Fuentes/citas de Perplexity AI

## Stack

- **Frontend**: Next.js 16 + TypeScript + Tailwind CSS
- **Backend**: n8n workflow con webhook
- **AI**: Perplexity API (modelo sonar)

## Configuracion

### 1. Variables de entorno

Crea un archivo `.env.local`:

```env
N8N_WEBHOOK_URL=https://tu-instancia.app.n8n.cloud/webhook/perplexity-news
```

### 2. Instalar dependencias

```bash
npm install
```

### 3. Ejecutar en desarrollo

```bash
npm run dev
```

### 4. Build para produccion

```bash
npm run build
```

## Flujo n8n

El flujo `Perplexity_news_API` debe estar activo en tu instancia de n8n. Recibe:

```json
{
  "topic": "string"
}
```

Y retorna:

```json
{
  "success": true,
  "data": {
    "topic": "...",
    "content": "...",
    "sources": [...],
    "date": "..."
  },
  "error": null
}
```

## Deploy

Deploy automatico en Vercel conectando este repositorio.

No olvides configurar la variable de entorno `N8N_WEBHOOK_URL` en Vercel.
