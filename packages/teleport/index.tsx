import React, { memo, PropsWithChildren, useCallback, useReducer } from "react";
import ReactDOM from "react-dom";
interface TeleportProps {
  to: string;
}

type TeleportType = React.FC<PropsWithChildren<TeleportProps>>;

export const Teleport: TeleportType = memo((props) => {
  const [, forceUpdate] = useReducer((x) => x + 1, 0);

  const renderPortal = useCallback(() => {
    const waitForDom = () => {
      const dom = document.querySelector(props.to);
      if (!dom) {
        requestAnimationFrame(waitForDom);
      } else {
        forceUpdate();
      }
    };
    const dom = document.querySelector(props.to);
    if (!dom) {
      waitForDom();
      return null;
    }
    return ReactDOM.createPortal(props.children, dom);
  }, []);
  return renderPortal();
});

Teleport.defaultProps = {
  to: "body",
};

Teleport.displayName = "Teleport";
