import { PropsWithChildren } from "react";
import style from './css/Stack.module.css';

export default function Stack(props: PropsWithChildren) {
  return (
    <div className={style.stack}>
      {props.children}
    </div>
  );
}
