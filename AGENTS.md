# remote-opencode (Discord bot)

Bot Discord para manejar OpenCode CLI remoto.

## Stack
- Node >=22 (corre con nvm v24), TypeScript ESM, discord.js v14.
- Entry: `src/cli.ts` → `npm run build` (tsc) → `dist/src/cli.js`.
- El servicio corre SIEMPRE desde `dist`, no desde `src`. Cambiar src y ademas dist (o `npm run build`) y reiniciar.

## Comandos
- `npm run build` — compila TS a dist.
- `npm test` (vitest).
- `npm start` — `node --no-deprecation dist/src/cli.js start`.
- Servicio: `systemctl restart remote-opencode` (systemd, /etc/systemd/system/, sin sudo funciona via polkit). Logs: `journalctl -u remote-opencode -f`.

## Convenciones
- Rama de trabajo: `felipe`. Nunca push a main.
- Sin comentarios de codigo.

## Arquitectura
- Estado en `~/.remote-opencode/data.json` (bindings por canal, hub, sesiones). Respaldar antes de editar.
- `src/commands/hub.ts`: `DEFAULT_MODEL` (default del hub).
- `src/commands/model.ts`: lista de modelos es DINAMICA via `opencode models` (cache 30s). No hay lista hardcodeada de modelos.
- Selector de modelo del hub: boton `model-hub` en `src/handlers/buttonHandler.ts`.

## Aprendizajes
- El default del hub es solo fallback: si data.json ya tiene `hub.model` y `bindings[].model`, esos mandan. Cambiar `DEFAULT_MODEL` no corrige canales existentes; hay que actualizar data.json.
- IDs de modelo deepseek: `deepseek/deepseek-flash` = display "DeepSeek V4.1 Flash"; `deepseek/deepseek-v4-pro`. `deepseek/deepseek-v4-flash` NO existe (nombre viejo, rompia sesiones). Verificar siempre con `opencode models`.
