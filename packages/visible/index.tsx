import React, { memo, Fragment } from "react";

export const Visible = memo<{ visible: boolean }>((props) => {
  const { visible } = props;
  return visible ? <Fragment>{props.children}</Fragment> : null;
});
