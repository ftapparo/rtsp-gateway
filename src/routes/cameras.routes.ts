import express from 'express';

const router = express.Router();

// HTML PLAYER
router.get("/player/camera1", (req, res) => {
  res.type("text/html");
  res.send(`<!DOCTYPE html>
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
</html>`);
});

export default router;

