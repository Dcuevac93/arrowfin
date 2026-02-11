# Arrowfin

Small order book (DOM) UI built with React + TypeScript (Vite) and a simple websocket feed.

## Run

### Client

```bash
npm i
```

```bash
npm run dev
```

### Websocket server

```bash
node server/websocket/
```

## Notes

### State Strategy

The UI updates very frequently (every ~100ms - 250ms), so the goal is to avoid unnecesary re-renders on the Ladder (VerticalPriceGrid component).

- **Redux**: I used redux to manage the price levels. Everytime we receive a price level from the server via websocket, it is upserted by `price` into the store. This avoids using `useState` for handling the levels, which would cause unnecessary re-renders.

### Scaling the UI

If the same Trading Ladder is needed to be shown in 10 workspaces simultaneously I would:

- **1. Virtualize rows**: use list virtualization (for example: `react-window`) so each workspace only renders what is visible.

- **2. Memoize + stable props**: keep `PriceRowView` purely presentational and `memo`-friendly; ensure callbacks are stable where it matters.

### Error Handling (Data Lag / Desync)

To detect and recover when the server websocket is lagging or having delays and falls behind the actual market prices:

**1. Add sequence/timestamp data**: I'd include `sequenceId` or server timestamps with each level update. Or if we don't have that, we could use the timestamp of the message.

**2. Heartbeat monitoring**: I'd track the timestamp of the last received message. If no updates are received within a defined threshold (e.g. 500–1000ms), mark the feed/levels as "stale".

**3. Resync strategy**: if there is a desync with this specific server features (only the price levels, not the entire feed), I'd clear the levels, show a loading indicator while reconnecting, and start filling the levels again.

**4. Reinitialize the websocket connection**: if heartbeat timeout persists or multiple desyncs occur, close and reinitialize the websocket connection.

**5. UI Indicator**: show a small "Data Lag" alert/indicator with a fancy animation.

### Mentorship (Code Review Best Practices)

Two specific best practices I’d enforce in code review:

- **1. Separation of concerns (design)**: keep container logic (store selection, timers, side effects) separate from view components. Views should be deterministic, receive data via props, and avoid hidden dependencies.

- **2. Performance (renders)**: Treat unnecessary re-renders as critical issues. Use memoization intentionally (enforce the use of `memo`, `useMemo`, `useCallback`, and selector memoization), keep props stable and well-defined.
