"use client";

import Draggable from "react-draggable";
import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

export default function DraggableVentana({ children }: Props) {
  return (
    <Draggable handle=".barra-superior">
      <div>{children}</div>
    </Draggable>
  );
}
