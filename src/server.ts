import dotenv from 'dotenv';
dotenv.config();


/**
 * Importa a função principal de inicialização do servidor.
 */

import { startServer } from './api/camera.api';


/**
 * Exibe informações de debug e status de inicialização no console.
 */
const DEBUG = process.env.DEBUG === 'true';

console.log(`[Api] Modo de depuração: ${DEBUG ? 'Ativado' : 'Desativado'}`);
console.log(`[Api] Iniciando a aplicação...`);

/**
 * Inicializa o servidor da aplicação.
 */
startServer();