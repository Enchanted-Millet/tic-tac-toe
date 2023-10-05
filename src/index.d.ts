type Board = number[][];
type BoardRow = number[];
type BoardColumn = number[];

type Position = [number, number];

declare module '*.svg' {
  const content: any;
  export default content;
}

declare module '*.css' {
  const content: any;
  export default content;
}
