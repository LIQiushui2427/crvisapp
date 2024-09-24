import React from "react";

// Declare tableau-viz as a valid JSX element
declare global {
  namespace JSX {
    interface IntrinsicElements {
      'tableau-viz': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
        src: string;
      };
    }
  }
}

const App: React.FC = () => {
  return (
    <div className="App">
      {/* <h1>Stock Price Visualization</h1> */}
    </div>
  );
};

export default App;
