import expressWs from "express-ws";
import rtspRelay from "rtsp-relay";
import fs from "fs";
import path from "path";

export default function registerCameraWebSocket(app: expressWs.Application) {
    expressWs(app);
    const { proxy } = rtspRelay(app);

    // Lê o arquivo cameras.json
    const camerasPath = path.resolve(__dirname, "../../config/cameras.json");
    const camerasData = fs.readFileSync(camerasPath, "utf-8");
    const cameras = JSON.parse(camerasData).cameras;

    // Cria uma rota WS para cada câmera
    cameras.forEach((camera: any) => {
        const url = `rtsp://${camera.user}:${camera.pass}@${camera.address}:554/cam/realmonitor?channel=${camera.channel || 1}&subtype=${camera.subtype || 0}`;
        app.ws(
            `/api/stream/${camera.name}`,
            proxy({
                url,
                verbose: false,
                transport: "tcp",
            })
        );
    });
}
