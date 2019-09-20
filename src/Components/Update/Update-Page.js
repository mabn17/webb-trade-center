import React from 'react';
import { updateAllStocks } from '../../Helpers/Requests/stocks/stocks';
import {
  emitStockChange
} from '../../Helpers/Sockets/Sockets';


const AboutPage = () => {
  const [message, setMessage] = React.useState('...');
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    if (isLoading) {
      emitStockChange('Nu har jag fått min About.md');
      updateAllStocks()
        .then(() => setMessage('Stocks Updated'))
        .catch(() => setMessage('Something went wrong, try again'));
      console.log('Updated');
    }
    setIsLoading(false);
  }, [isLoading]);

  return (
    <h1>{ message }</h1>
  );
};

export default AboutPage;
