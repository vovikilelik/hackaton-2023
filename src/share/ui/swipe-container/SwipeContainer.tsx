import React, { useCallback, useEffect, useRef, useState } from "react";
import cn from "classnames";
import { Component } from '../../react';

import styles from './SwipeContainer.module.less';
import { NativeCallback, useNative } from '../../hooks';

export interface SwipeContainerProps extends Component<React.ReactElement[]> {
  activeIndex: number;
}

const SWIPE_SENS = 100;

const createSwipeEffect = (toRight, toLeft): NativeCallback<HTMLDivElement> => element => {
  const state = { pressed: false, x: 0, dx: 0, value: 0 };

  const onMouseDown = (e: TouchEvent) => {
    state.pressed = true;
    state.x = e.touches[0].clientX;

    (element.children[0] as any).style.transition = 'none';
  }

  const onMouseMove = (e: TouchEvent) => {
    if (state.pressed) {
      state.value = e.touches[0].clientX - state.x;
      (element.children[0] as any).style.transform = `translateX(${state.value}px)`;
    }
  }

  const onMouseUp = () => {
    state.pressed = false;

    (element.children[0] as any).style.transition = null;
    (element.children[0] as any).style.transform = `translateX(0px)`;

    if (Math.abs(state.value) < SWIPE_SENS) {
      return;
    }

    if (state.value < 0) {
      toRight();
    } else {
      toLeft();
    }
  }

  element.addEventListener('touchstart', onMouseDown, true);
  element.addEventListener('touchmove', onMouseMove, true);
  element.addEventListener('touchend', onMouseUp, true);

  return () => {
    element.removeEventListener('touchstart', onMouseDown, true);
    element.removeEventListener('touchmove', onMouseMove, true);
    element.removeEventListener('touchend', onMouseUp, true);
  };
}

export const SwipeContainer: React.FC<SwipeContainerProps> = ({ activeIndex, className, children }) => {
  const count = React.Children.count(children);
  const [index, setIndex] = useState(activeIndex);

  const toRight = useCallback(() => {
    index + 1 < count && setIndex(index + 1);
  }, [index]);

  const toLeft = useCallback(() => {
    index > 0 && setIndex(index - 1);
  }, [index]);

  const ref = useNative(createSwipeEffect(toRight, toLeft), [toRight, toLeft]);

  return (
    <div ref={ref} className={cn(styles.layout, className)}>
      <div
        className={styles.wrapper}
        style={{ width: `${count * 100}%`, left: `${index * -100}%` }}
      >
        { children }
      </div>
    </div>
  );
}