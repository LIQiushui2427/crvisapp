import React, { useEffect, useRef, useState } from 'react';

const TableauViz: React.FC = () => {
  const vizRef = useRef<HTMLDivElement>(null);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const fetchToken = async () => {
      try {
        const response = await fetch(process.env.REACT_APP_JWT_API_URL as string);
        const data = await response.json();
        setToken(data.token);  // Store the token in state
      } catch (error) {
        console.error('Error fetching JWT token:', error);
      }
    };

    fetchToken();
  }, []);

  useEffect(() => {
    if (!vizRef.current || !token) return;

    const loadViz = async () => {
      const waitForTableau = (retries: number = 5, interval: number = 200): Promise<void> => {
        return new Promise((resolve, reject) => {
          const checkTableau = (attempts: number) => {
            if (window.tableau) {
              resolve();
            } else if (attempts > 0) {
              setTimeout(() => checkTableau(attempts - 1), interval);
            } else {
              reject(new Error('Tableau API is not available'));
            }
          };
          checkTableau(retries);
        });
      };

      try {
        await waitForTableau();

        // Ensure vizRef.current is non-null
        if (!vizRef.current) {
          console.error('vizRef.current is null');
          return;
        }

        // Get the tableau-viz element
        const viz = vizRef.current.querySelector('tableau-viz') as HTMLElement & { token: string; workbook: any };
        if (!viz) {
          console.error('Tableau Viz component not found');
          return;
        }

        // Set the JWT token for authentication
        viz.token = token;

        // Wait for the viz to become interactive
        await new Promise<void>((resolve, reject) => {
          viz.addEventListener(window.tableau.TableauEventType.FirstInteractive, () => {
            console.log('Viz is interactive!');
            resolve();
          });

          viz.addEventListener(window.tableau.TableauEventType.VizLoadError, (error: any) => {
            const message = JSON.parse(error.detail.message);
            const errorMessage = JSON.parse(message.errorMessage);
            const displayMessage = `ca-error-${errorMessage.result.errors[0].code}`;
            reject(displayMessage);
          });
        });

        let dashboard;
        let worksheet;

        if (viz.workbook.activeSheet.sheetType === window.tableau.SheetType.Dashboard) {
          dashboard = viz.workbook.activeSheet;
          worksheet = dashboard.worksheets.find((ws: any) => ws.name === 'Replace-Name-of-Worksheet');
        } else {
          worksheet = viz.workbook.activeSheet;
        }
      } catch (error) {
        console.error('Error loading Tableau Viz:', error);
      }
    };

    loadViz();
  }, [token]);

  return (
    <div ref={vizRef}>
      <tableau-viz src="https://10ax.online.tableau.com/#/site/tbc82/views/TestTableau/Chart"></tableau-viz>
    </div>
  );
};

export default TableauViz;
