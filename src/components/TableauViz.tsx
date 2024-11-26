import React, { useEffect, useState } from 'react';
import '../pages/TableauViz.css';
const TableauViz: React.FC = () => {
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const fetchToken = async () => {
      try {
        // console.log('Fetching JWT token...');
        console.log('Fetching JWT token... from:', process.env.REACT_APP_JWT_API_URL);
        const response = await fetch(process.env.REACT_APP_JWT_API_URL as string);
        console.log('Response:', response);
        const data = await response.json();
        console.log('JWT token:', data.token);
        setToken(data.token);  // Store the token in state
      } catch (error) {
        console.error('Error fetching JWT token:', error);
      }
    };

    fetchToken();
  }, []);
  return (
    <div className='tableau-viz-container'>
      <tableau-viz id = "tableau-viz"
      src="https://10ax.online.tableau.com/#/site/tbc82/views/TestTableau/Chart" 
      token="https://jwt.io/#debugger-io?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IjFmMjI2MGQzLWY1ZWQtNGE1Mi04MjU3LTI3ODdlMGExY2Y2YiIsImlzcyI6IjRiNDM0YmI2LWMzZGMtNDYwNC1iNjlkLTY2ZDZmZDRiMzU0MCJ9.eyJzdWIiOiJzMjQwMDc5QGUubnR1LmVkdS5zZyIsImlzcyI6IjRiNDM0YmI2LWMzZGMtNDYwNC1iNjlkLTY2ZDZmZDRiMzU0MCIsImF1ZCI6InRhYmxlYXUiLCJleHAiOjE3MzI1MzgzMjgsImp0aSI6IjE3MzI1MzQ3MjgiLCJzY3AiOlsidGFibGVhdTp2aWV3czplbWJlZCJdfQ.67UETwUyc6W0vlGOif1Gm54Ky7M77i5cPex1Bj628ag"
      width="1200px" height="600px" />
    </div>
  );
};

export default TableauViz;
