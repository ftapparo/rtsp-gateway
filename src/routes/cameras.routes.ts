import express from 'express';
import { renderCameraPlayer, listCameras, getCameraByName } from '../controllers/cameras.controller';

const router = express.Router();

// Listagem de câmeras
router.get("/camera/list", listCameras);

// Consulta individual de câmera por nome
router.get("/camera/:name", getCameraByName);

// HTML PLAYER dinâmico
router.get("/player/:cameraName/:subtype", renderCameraPlayer);

export default router;

