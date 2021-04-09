import React, { memo, PropsWithChildren, useCallback, useReducer } from "react";
import ReactDOM from "react-dom";
interface TeleportProps {
  to?: string;
}

type TeleportType = React.FC<PropsWithChildren<TeleportProps>>;

export const Teleport: TeleportType = memo((props) => {
  const [, forceUpdate] = useReducer((x) => x + 1, 0);
  const { to = "body" } = props;
  const renderPortal = useCallback(() => {
    const waitFindHost = () => {
      const host = document.querySelector(to);
      if (!host) {
        requestAnimationFrame(waitFindHost);
      } else {
        forceUpdate();
      }
    };
    const host = document.querySelector(to);
    if (!host) {
      waitFindHost();
      return null;
    }
    return ReactDOM.createPortal(props.children, host);
  }, [props.children]);
  return renderPortal();
});

Teleport.defaultProps = {
  to: "body",
};

Teleport.displayName = "Teleport";
