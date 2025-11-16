# RTSP Gateway

Projeto simples que expõe streams RTSP via WebSocket usando `rtsp-relay` e um player em browser.

Principais características:
- Recebe RTSP e retransmite via WebSocket (endpoint: `/api/stream/camera1`).
- Serves assets do player do `rtsp-relay` em `/rtsp-relay`.
- Página de teste/player em `/player/camera1` (HTML + canvas).
- Healthcheck em `/`.

## Requisitos
- Node.js (recomendo v18+)
- npm

## Instalação
Clone o repositório e instale dependências:

```powershell
npm install
```

## Variáveis de ambiente
O servidor carrega variáveis via `dotenv` (arquivo `.env`). As variáveis usadas por este projeto são (exemplos):

- `PORT` - (opcional) porta onde o servidor vai escutar. Default: `2000`.

Observação: o arquivo `src/server.ts` do exemplo contém uma URL RTSP embutida (apenas para teste). Em produção evite credenciais embutidas — prefira armazenar `CAMERA_ADDR`, `CAMERA_USER`, `CAMERA_PASS`, etc. em `.env`.

Você pode copiar o arquivo `.env.example` (se existir) e ajustá-lo:

```powershell
copy .env.example .env
# edite .env com as credenciais/endereços reais
```

## Scripts úteis
- `npm run dev` — roda em modo desenvolvimento com `ts-node-dev` (hot reload):

```powershell
npm run dev
```

- `npm run build` — transpila TypeScript para `dist/` (usa `tsc`):

```powershell
npm run build
```

- `npm start` — roda o build compilado (após `npm run build`):

```powershell
npm run build; npm start
```

## Como executar (exemplo mínimo)
Se quiser iniciar rapidamente sem editar `.env`, você pode exportar as variáveis na linha de comando (PowerShell):

```powershell
$env:PORT='2000'; $env:CAMERA1_ADDR='127.0.0.1'; $env:CAMERA1_USER='user'; npm run build; node dist/server.js
```

> Nota: o repositório inclui `dotenv/config` no `server.ts` — se você criar um arquivo `.env` ele será carregado automaticamente.

## Endpoints
- GET / — healthcheck e instruções básicas.
- GET /player/camera1 — página HTML de teste com player que consome o WebSocket.
- GET /rtsp-relay/* — assets do player do `rtsp-relay` servidos estaticamente.
- WS  ws://HOST:PORT/api/stream/camera1 — WebSocket do stream (usado pelo player).

## Segurança e credenciais
- Não deixe credenciais RTSP embutidas no código. Use um arquivo `.env` com permissões restritas.
- Se executar em produção, proteja o acesso ao WebSocket (auth, TLS) e considere proxys/regras de firewall.

## Troubleshooting
- Erro ao iniciar: "Variáveis de ambiente para CAMERA1 incompletas" — significa que o código espera variáveis de ambiente com informações da câmera. Crie/edite `.env` com `CAMERA1_ADDR` e `CAMERA1_USER` (e `CAMERA1_PASS` se necessário).
- Se o player não carrega, abra o DevTools e verifique erros de CORS/mixed content (HTTP vs HTTPS) e se o WebSocket está sendo estabelecido.

## Melhorias recomendadas
- Mover configuração de câmeras para variáveis de ambiente (ex.: `CAMERA1_ADDR`, `CAMERA1_USER`, `CAMERA1_PASS`) em vez da URL embutida.
- Adicionar um pequeno script `check-env` que valida variáveis obrigatórias antes de iniciar.
- Criar tipos TypeScript para `rtsp-relay` (ou adicionar declaração em `@types`), se necessário.

## Licença
MIT
