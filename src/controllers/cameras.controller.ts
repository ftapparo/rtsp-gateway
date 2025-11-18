import { Request, Response } from 'express';
import fs from 'fs';
import path from 'path';

export function renderCameraPlayer(req: Request, res: Response) {
    const { cameraName, subtype } = req.params;

    // Detecta protocolo do solicitante
    const wsProtocol = req.headers['x-forwarded-proto'] === 'https' ? 'wss' : 'ws';

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

export function listCameras(req: Request, res: Response) {
    try {
        const camerasPath = path.join(__dirname, '../../config/cameras.json');
        const camerasData = JSON.parse(fs.readFileSync(camerasPath, 'utf-8'));

        const camerasList = camerasData.cameras.map((camera: any) => ({
            id: camera.id,
            description: camera.description,
            extension: camera.extension
        }));

        res.json({
            total: camerasData.cameras.length,
            cameras: camerasList
        });
    } catch (error) {
        res.status(500).json({
            error: 'Erro ao carregar lista de câmeras',
            message: error instanceof Error ? error.message : 'Erro desconhecido'
        });
    }
}

export function getCameraByName(req: Request, res: Response) {
    try {
        const { name } = req.params;
        const camerasPath = path.join(__dirname, '../../config/cameras.json');
        const camerasData = JSON.parse(fs.readFileSync(camerasPath, 'utf-8'));

        const camera = camerasData.cameras.find((cam: any) => cam.name === name);

        if (!camera) {
            return res.status(404).json({
                error: 'Câmera não encontrada',
                message: `Nenhuma câmera com o nome "${name}" foi encontrada`
            });
        }

        res.json(camera);
    } catch (error) {
        res.status(500).json({
            error: 'Erro ao buscar câmera',
            message: error instanceof Error ? error.message : 'Erro desconhecido'
        });
    }
}