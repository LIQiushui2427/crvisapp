import React, { useEffect, useState } from 'react';
const TableauViz: React.FC = () => {
  const [token, setToken] = useState<string | null>(null);
  

  
  useEffect(() => {
    const fetchToken = async () => {
      try {
        console.log('Fetching JWT token...');
        const response = await fetch(process.env.REACT_APP_JWT_API_URL as string);
        const data = await response.json();
        // console.log('JWT token:', data.token);
        setToken(data.token);  // Store the token in state
      } catch (error) {
        console.error('Error fetching JWT token:', error);
      }
    };

    fetchToken();
  }, []);
  console.log('token:', token);
  return (
    <div>
      <tableau-viz 
      src="https://10ax.online.tableau.com/#/site/tbc82/views/TestTableau/Chart" 
      token={token as string}
      />
    </div>
  );
};

export default TableauViz;
