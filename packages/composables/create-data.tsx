import React from "react";
import { useForceUpdate } from ".";
export function createData<T>(initialValue: T) {
  let data: T = initialValue;
  const lister = new Set<React.DispatchWithoutAction>();
  function setData(value: T) {
    data = value;
    lister.forEach((k, v) => v());
  }

  const useData = () => {
    const forceUpdate = useForceUpdate();
    React.useEffect(() => {
      lister.add(forceUpdate);
      return () => {
        lister.delete(forceUpdate);
      };
    }, []);
    return [data, setData] as [T, (value: T)=> void];
  };
  return useData;
}
