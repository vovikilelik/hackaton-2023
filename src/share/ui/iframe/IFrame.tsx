import cn from "classnames";
import React, { useCallback, useLayoutEffect, useState } from "react";

import styles from './IFrame.module.less';

export const defaultInnerStyle = 'html, body { margin: 0; }'

export interface StandartIFrameProps extends React.DetailedHTMLProps<React.IframeHTMLAttributes<HTMLIFrameElement>, HTMLIFrameElement> {
}

export interface IFrameProps extends StandartIFrameProps{
  innerStyle?: string;
}

export const IFrame: React.FC<IFrameProps> = ({ children, innerStyle, className, onLoad, ...rest }) => {
  const [wrap, setWrap] = useState<any>();
  const [refs, setRefs] = useState<any>();

  const [loaded, setLoaded] = useState<boolean>(false);

  const onLoadHandler = useCallback(e => {
    setLoaded(true);
    onLoad?.(e);
  }, []);

  useLayoutEffect(() => {
    if (loaded && refs && wrap && wrap.contentDocument) {
      wrap.contentDocument.head.innerHTML = `<style>${innerStyle || defaultInnerStyle}</style>`;
      wrap.contentDocument.body.append(refs);
    }
  }, [wrap, refs, loaded]);

  return (
    <iframe onLoad={onLoadHandler} ref={setWrap} className={cn(styles.layout, className)} { ...rest }>
      <div ref={setRefs}>
        {children}
      </div>
    </iframe>
  );
}