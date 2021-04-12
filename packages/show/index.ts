import React from "react";
import invariant from "tiny-warning";

const FRAGMENT_TYPE = "Symbol(react.fragment)";

export const Show: React.FC<{ show: boolean }> = (props) => {
  if (props.children === undefined) return null;
  const { show } = props;
  function factory(_props: typeof props): any {
    if (_props.children === undefined) return null;
    if (!React.isValidElement(_props.children)) {
      invariant(React.isValidElement(_props.children), "isValidElement");
      return _props.children;
    }
    if (!_props.children.type) {
      return _props.children;
    }
    if (_props.children.type.toString() === FRAGMENT_TYPE) {
      return factory(_props.children.props);
    }
    const style = {
      ..._props.children.props.style,
      display: show ? undefined : "none",
    };
    return React.cloneElement(_props.children, { style });
  }
  return factory(props);
};
