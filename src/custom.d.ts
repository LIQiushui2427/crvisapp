
declare namespace JSX {
    interface IntrinsicElements {
      'tableau-viz': React.DetailedHTMLProps<React.HTMLAttributes<TableauVizElement>, TableauVizElement> & { src: string };
    }
  }