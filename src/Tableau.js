import { SheetType, TableauEventType } from 'https://10ax.online.tableau.com/javascripts/api/tableau.embedding.3.latest.js';

// Get the viz object from the HTML web component
const viz = document.querySelector('tableau-viz, tableau-authoring-viz');

// window.token is the JWT generated using a Connected App configured with Direct Trust.
// The value is generated and is only available when this code executes within the Embedding Playground.
// See the Connected Apps documentation (https://sfdc.co/ca-direct) for more information.
// See this repository (https://sfdc.co/ca-jwt) for samples in various languages.
viz.token = window.token;

// Wait for the viz to become interactive
await new Promise((resolve, reject) => {
  // Add an event listener to verify the viz becomes interactive
  viz.addEventListener(TableauEventType.FirstInteractive, () => {
    console.log('Viz is interactive!');
    resolve();
  });

  viz.addEventListener(TableauEventType.VizLoadError, (error) => {
    const message = JSON.parse(error.detail.message);
    const errorMessage = JSON.parse(message.errorMessage);

    const displayMessage = `ca-error-${errorMessage.result.errors[0].code}`;
    reject(displayMessage);
  });
});

let dashboard;
let worksheet;
if (viz.workbook.activeSheet.sheetType === SheetType.Dashboard) {
  dashboard = viz.workbook.activeSheet;

  // Provide the name of the worksheet you want to use from the dashboard
  worksheet = dashboard.worksheets.find((ws) => ws.name === 'Replace-Name-of-Worksheet');
} else {
  // Active sheet is already a worksheet
  worksheet = viz.workbook.activeSheet;
}

// *** Insert your code below! ***



