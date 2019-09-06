import React from 'react';
import {
  getToken,
  decodeToken,
  hasAuth
} from '../../Helpers/Methods/TokenHandeler';

const MyAccount = (props) => {
  const encoded = getToken();
  const [token, setToken] = React.useState({});

  React.useEffect(() => {
    if (!encoded) props.history.push('/login');
    else setToken(decodeToken(encoded));

    hasAuth(encoded, props);
  }, [encoded, props]);

  return (
    <div className="">
      <h1>{`Hello ${token.email}`}</h1>
    </div>
  );
};

export default MyAccount;
