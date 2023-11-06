import { PropsWithChildren, RefObject, createContext, useContext, useRef, useState } from "react";
import { getTextWidth } from "../utils/getTextWidth";
import { ColorScheme, defaultScheme } from "./types/ColorScheme";

type Setter<T> = (newVal: T) => void;

interface TerminalContext {
  columns: number;
  setColumns: Setter<number>;
  rows: number;
  setRows: Setter<number>;
  fontSize: number;
  setFontSize: Setter<number>;
  fontFamily: string;
  setFontFamily: Setter<string>;

  colorScheme: ColorScheme;
  setColorScheme: Setter<ColorScheme>;

  // computed
  columnWidth: number;
  rowHeight: number;

  elementRef: RefObject<HTMLDivElement>;
}

const TerminalContext = createContext<TerminalContext | null>(null);

export const useTerminal = () => useContext(TerminalContext)!;

export function TerminalProvider(props: PropsWithChildren) {
  const [columns, setColumns] = useState(80);
  const [rows, setRows] = useState(24);
  const [fontSize, setFontSize] = useState(12);
  const [fontFamily, setFontFamily] = useState("monospace");
  const [colorScheme, setColorScheme] = useState(defaultScheme);
  const elementRef = useRef<HTMLDivElement>(null);

  const value: TerminalContext = {
    elementRef,
    columns,
    setColumns,
    rows,
    setRows,
    fontSize,
    setFontSize,
    fontFamily,
    setFontFamily,
    columnWidth: -1,
    rowHeight: -1,
    colorScheme,
    setColorScheme
  };

  value.columnWidth = getTextWidth("0", `${value.fontSize}px ${value.fontFamily}`);
  value.rowHeight = value.fontSize;

  return <TerminalContext.Provider value={value}>{props.children}</TerminalContext.Provider>;
}
