import { useRef, useState } from 'react';

export function useStore<T>(initValue: T): [T, (val: T) => void] {
  const ref = useRef<T>();
  const [value, _setValue] = useState(ref.current ?? initValue);

  function setValue(val: T) {
    ref.current = val;
    _setValue(val);
  }
  return [value, setValue];
}
