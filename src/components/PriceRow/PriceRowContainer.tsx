import { memo, useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { selectLevelByPrice } from "../../redux/slices/levels";
import type { RootState } from "../../redux/store";
import type { PriceLevel } from "../../lib/types";
import PriceRowView from "./PriceRowView";
import type { Flash } from "../../lib/types";

type PriceRowContainerProps = {
  price: number;
};

const PriceRowContainer = memo(({ price }: PriceRowContainerProps) => {
  const level = useSelector<RootState, PriceLevel | null>((state) =>
    selectLevelByPrice(state, price)
  );

  // Track previous bid/ask sizes to determine if they changed
  const prevPriceRef = useRef<{ bid?: number; ask?: number }>({});
  const [flash, setFlash] = useState<Flash>({
    bid: null,
    ask: null,
  });
  const flashScheduleTimeout = useRef(0);
  const flashTimeout = useRef(0);

  // Handle quick order (buy/sell limit)
  const handleQuickOrder = ({ side }: { side: "BUY" | "SELL" }) => {
    if (!level) return;
    console.log({
      type: side === "BUY" ? "Buy Limit" : "Sell Limit",
      side,
      price,
    });
  };

  // Update flash state when bid/ask sizes change
  useEffect(() => {
    if (!level) return;

    const { bidSize, askSize } = level;
    const { bid: prevBid, ask: prevAsk } = prevPriceRef.current;

    const nextFlash: Flash = {
      bid: typeof prevBid === "number" && bidSize !== prevBid ? (bidSize > prevBid ? "up" : "down") : null,
      ask: typeof prevAsk === "number" && askSize !== prevAsk ? (askSize > prevAsk ? "up" : "down") : null,
    };

    if (nextFlash.bid || nextFlash.ask) {
      if (flashTimeout.current) window.clearTimeout(flashTimeout.current);
      if (flashScheduleTimeout.current)
        window.clearTimeout(flashScheduleTimeout.current);

      flashScheduleTimeout.current = window.setTimeout(() => {
        setFlash(nextFlash);
        flashTimeout.current = window.setTimeout(
          () => setFlash({ bid: null, ask: null }),
          500
        );
      }, 0);
    }

    prevPriceRef.current = { bid: level.bidSize, ask: level.askSize };

    return () => {
      if (flashScheduleTimeout.current)
        window.clearTimeout(flashScheduleTimeout.current);
      if (flashTimeout.current) window.clearTimeout(flashTimeout.current);
    };
  }, [level]);

  return (
    <PriceRowView
      price={price}
      bidSize={level?.bidSize ?? null}
      askSize={level?.askSize ?? null}
      flash={flash}
      onBidClick={level ? () => handleQuickOrder({ side: "BUY" }) : undefined}
      onAskClick={level ? () => handleQuickOrder({ side: "SELL" }) : undefined}
    />
  );
});

export default PriceRowContainer;
