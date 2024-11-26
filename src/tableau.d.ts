declare global {
  interface TableauVizElement extends HTMLElement {
      token: string;
      workbook: {
          activeSheet: {
              sheetType: string;
              worksheets: Array<{ name: string }>;
          };
      };
  }

  interface Window {
      tableau: {
          SheetType: {
              Dashboard: string;
              Worksheet: string;
          };
          TableauEventType: {
              FirstInteractive: string;
              VizLoadError: string;
          };
      };
      token: string;
  }
}

export {};
