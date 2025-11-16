
import expressWs from "express-ws";
import rtspRelay from "rtsp-relay";

export default function registerCameraWebSocket(app: expressWs.Application) {

    // garante que express-ws foi aplicado ao app
    expressWs(app);
    const { proxy } = rtspRelay(app);

    // WEBSOCKET (registrado diretamente no app)
    app.ws(
        "/api/stream/camera1",
        proxy({
            url: 'rtsp://admin:123Vegas!@@192.168.0.103:554/cam/realmonitor?channel=1&subtype=1',
            verbose: false,
            transport: "tcp",
        })
    );
}
