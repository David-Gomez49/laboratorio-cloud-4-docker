const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Endpoint principal (HTML UI limpia)
app.get('/', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html lang="es">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Laboratorio 4 - Docker & Express</title>
      <style>
        body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background: #0f172a; color: #f8fafc; display: flex; justify-content: center; align-items: center; min-height: 100vh; margin: 0; }
        .card { background: #1e293b; padding: 2.5rem; border-radius: 1rem; box-shadow: 0 10px 25px rgba(0,0,0,0.5); text-align: center; max-width: 500px; width: 90%; border: 1px solid #334155; }
        h1 { color: #38bdf8; margin-top: 0; }
        p { color: #94a3b8; line-height: 1.6; }
        .badge { background: #0284c7; color: white; padding: 0.4rem 0.8rem; border-radius: 20px; font-weight: bold; font-size: 0.9rem; display: inline-block; margin-bottom: 1rem; }
        .endpoints { text-align: left; background: #0f172a; padding: 1rem; border-radius: 0.5rem; margin-top: 1.5rem; font-family: monospace; font-size: 0.9rem; }
        .endpoints a { color: #38bdf8; text-decoration: none; }
        .endpoints a:hover { text-decoration: underline; }
      </style>
    </head>
    <body>
      <div class="card">
        <span class="badge">Dockerizado en Node.js</span>
        <h1>Hola desde Docker!</h1>
        <p>Laboratorio 4: Contenedores y Despliegue con Docker (UDEA 2026)</p>
        <div class="endpoints">
          <strong>Endpoints disponibles:</strong>
          <ul>
            <li><a href="/api/info">/api/info</a> - Información del sistema</li>
            <li><a href="/api/sum?a=15&b=27">/api/sum?a=15&b=27</a> - Operación matemática</li>
            <li><a href="/api/health">/api/health</a> - Estado del servicio</li>
          </ul>
        </div>
      </div>
    </body>
    </html>
  `);
});

// Endpoint de información
app.get('/api/info', (req, res) => {
  res.json({
    status: 'ok',
    message: 'Servicio corriendo exitosamente dentro del contenedor Docker',
    timestamp: new Date().toISOString(),
    uptime: `${process.uptime().toFixed(2)} segundos`,
    nodeVersion: process.version,
    platform: process.platform
  });
});

// Endpoint de operación matemática básica (suma)
app.get('/api/sum', (req, res) => {
  const a = parseFloat(req.query.a) || 0;
  const b = parseFloat(req.query.b) || 0;
  const result = a + b;

  res.json({
    operacion: 'suma',
    a: a,
    b: b,
    resultado: result,
    mensaje: `La suma de ${a} y ${b} es ${result}`
  });
});

// Endpoint de verificación de salud (healthcheck)
app.get('/api/health', (req, res) => {
  res.json({ status: 'HEALTHY', timestamp: new Date().toISOString() });
});

app.listen(PORT, () => {
  console.log(`Servidor ejecutándose en el puerto ${PORT}`);
  console.log(`Accede a http://localhost:${PORT}`);
});
