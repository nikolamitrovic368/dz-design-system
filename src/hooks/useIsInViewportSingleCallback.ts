import useIsInViewport from 'use-is-in-viewport';
import { useEffect, useState } from 'react';

export const useIsInViewportSingleCallback = (callback?: Function) => {
  const [isInViewport, targetRef] = useIsInViewport();
  const [didFireCallback, setDidFireCallback] = useState(false);

  useEffect(() => {
    if (isInViewport && !didFireCallback) {
      callback?.();
      setDidFireCallback(true);
    }
  }, [didFireCallback, isInViewport, callback]);

  return targetRef;
};
