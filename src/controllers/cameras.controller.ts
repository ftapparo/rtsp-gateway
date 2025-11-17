import { Request, Response } from 'express';

export function renderCameraPlayer(req: Request, res: Response) {
    const { cameraName, subtype } = req.params;

    // Detecta protocolo do solicitante
    const wsProtocol = req.protocol === 'https' ? 'wss' : 'ws';

    const html = `<!DOCTYPE html>
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
                        url: "${wsProtocol}://" + location.host + "/api/stream/${cameraName}/${subtype}",
                        canvas: document.getElementById("canvas")
                    });
                </script>
            </body>
        </html>`;

    res.type("text/html");
    res.send(html);
}