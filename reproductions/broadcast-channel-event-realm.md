# BroadcastChannel event-realm reproduction

This reproduction demonstrates an incompatibility between Histoire's collector
DOM environment and Node's native `BroadcastChannel`.

`createDomEnv()` replaces the global `Event`, `EventTarget`, and `MessageEvent`
constructors with JSDOM constructors while leaving Node's native
`BroadcastChannel` installed. When a message is delivered, the native event
target rejects the JSDOM `MessageEvent`.

## Run the reproduction

From the repository root:

```shell
pnpm install --frozen-lockfile
node packages/histoire/reproductions/broadcast-channel-event-realm.mjs
```

## Current result

The process exits with this error:

```text
TypeError [ERR_INVALID_ARG_TYPE]: The "event" argument must be an instance of Event. Received an instance of MessageEvent
    at BroadcastChannel.dispatchEvent (node:internal/event_target:771:13)
    at BroadcastChannel.onMessageEvent (node:internal/worker/io:349:8)
```

The failure has been reproduced on:

- Node 22.23.1
- Node 24.18.0
- Node 25.8.0

Node 20 has not been tested.
