import express from 'express';
import { renderCameraPlayer } from '../controllers/cameras.controller';

const router = express.Router();

// HTML PLAYER dinâmico
router.get("/player/:cameraName", renderCameraPlayer);

export default router;

