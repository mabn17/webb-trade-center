import React from 'react';
import { updateAllStocks } from '../../Helpers/Requests/stocks/stocks';
import {
  emitStockChange
} from '../../Helpers/Sockets/Sockets';


const UpdatePage = () => {
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    if (isLoading) {
      emitStockChange('.');
      updateAllStocks()
        .then()
        .catch();
    }
    setIsLoading(false);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <h1> Updated stocks </h1>
  );
};

export default UpdatePage;
