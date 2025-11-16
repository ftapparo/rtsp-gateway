import dotenv from "dotenv";
dotenv.config();

import express from "express";
import expressWs from "express-ws";
import rtspRelay from "rtsp-relay";

const PORT = process.env.PORT || 2000;

const { app } = expressWs(express());
const { proxy } = rtspRelay(app);

// 📌 SERVE O PLAYER DO rtsp-relay
app.use(
  "/rtsp-relay",
  express.static("./node_modules/rtsp-relay/browser")
);
    
// === WEBSOCKET ===
app.ws(
  "/api/stream/camera1",
  proxy({
    url:  'rtsp://admin:123Vegas!@@192.168.0.103:554/cam/realmonitor?channel=1&subtype=1',
    verbose: false,
    transport: "tcp",
  })
);

// === HTML PLAYER ===
app.get("/player/camera1", (req, res) => {
  res.type("text/html");
  res.send(`
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8"/>
    <title>Camera Test</title>
    <style>
      body { background: #000; margin: 0; display:flex; align-items:center; justify-content:center; height:100vh; }
      canvas { background:#000; }
    </style>
  </head>
  <body>
    <canvas id="canvas" width="640" height="360"></canvas>

    <script src="/rtsp-relay/index.js"></script>

    <script>
      window.loadPlayer({
        url: "ws://" + location.host + "/api/stream/camera1",
        canvas: document.getElementById("canvas")
      });
    </script>
  </body>
</html>
  `);
});

// === HOME ===
app.get("/", (req, res) => {
  res.send(`
RTSP gateway OK.<br>
Testar câmera: <a href="/player/camera1">/player/camera1</a>
`);
});

app.listen(PORT, () =>
  console.log(`RTSP Gateway rodando em http://localhost:${PORT}`)
);
