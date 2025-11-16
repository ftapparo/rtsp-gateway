import express from 'express';
import expressWs from "express-ws";
import cors from 'cors';
import registerCameraWebSocket from '../websockets/cameras.websocket';
import healthRoutes from '../routes/health.routes';
import camerasRoutes from '../routes/cameras.routes';

/**
 * Inicializa o servidor backend.
 *
 * - Configura middlewares globais (CORS, JSON)
 * - Integra rotas de dispositivos, notificações e saúde
 * - Tratamento de rota não encontrada (404)
 * - Inicia o servidor na porta definida
 */
export async function startServer() {

    const { app } = expressWs(express());
    const port = process.env.PORT || 3000;
    const env = process.env.NODE_ENV || 'production';

    // Middleware de CORS para permitir requisições de qualquer origem e métodos principais.
    app.use(cors({
        origin: '*',
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
        credentials: false
    }));

    // Middleware para parsear JSON nas requisições.
    app.use(express.json());

    // Servir arquivos estáticos para o player do rtsp-relay
    app.use("/rtsp-relay", express.static("./node_modules/rtsp-relay/browser"));

    // Registro das rotas de câmeras
    registerCameraWebSocket(app);

    // Registro das rotas principais da API.
    app.use('/', healthRoutes);
    app.use('/api/v1', camerasRoutes);


    // Middleware para tratar rotas não encontradas (404).
    app.use((_req, res) => {
        res.status(404).send();
    });

    // Inicia o servidor na porta especificada.
    app.listen(port, () => { console.log(`[Api] Servidor rodando na porta ${port} - Ambiente: ${env}`); });
}