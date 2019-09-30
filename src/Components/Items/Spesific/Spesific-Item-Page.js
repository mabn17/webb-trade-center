import React from 'react';
import { Link } from 'react-router-dom';

const CurrentItem = (props) => {
  const [product, setProduct] = React.useState('Loading ..');
  console.log(props);
  React.useEffect(() => {
    handleGetCurrentItem();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.match]);


  const handleGetCurrentItem = () => {
    setProduct('hej' + props.match.params.name);
  }

  return (
    <>
      <h1>{ product }</h1>
      <Link to="/stocks/hej" >
        Hej
      </Link>
    </>
  );
}

export default CurrentItem;
