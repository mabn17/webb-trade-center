import React from 'react';

const CurrentItem = (props) => {
  const [product, setProduct] = React.useState('Loading ..');
  React.useEffect(() => {
    setProduct(props.match.params.name);
  }, [props.match]);


  return (
    <>
      <h1>{ product }</h1>
    </>
  );
}

export default CurrentItem;
