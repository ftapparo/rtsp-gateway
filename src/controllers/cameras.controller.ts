import { Request, Response } from 'express';

export function healthCheck(req: Request, res: Response) {
    const env = process.env.NODE_ENV || 'UNKNOWN';
    res.status(200).json({ content: 'API Funcionando! - Ambiente: ' + env });
};

export function renderCameraPlayer(req: Request, res: Response) {

    const { cameraName } = req.params;

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
                        url: "ws://" + location.host + "/api/stream/${cameraName}",
                        canvas: document.getElementById("canvas")
                    });
                </script>
            </body>
        </html>`;

    res.type("text/html");
    res.send(html);
}