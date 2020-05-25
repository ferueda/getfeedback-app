import { useEffect, useReducer } from 'react';
import axios from 'axios';
import reducers from '../context/reducers';

const fetchUser = async () => {
  const res = await axios.get('/api/current_user');
  return res.data;
};

const useFetchUser = (initialState) => {
  const [user, dispatchUserFetch] = useReducer(reducers.auth, initialState);

  useEffect(() => {
    fetchUser().then((data) => {
      dispatchUserFetch({
        type: 'FETCH_USER',
        payload: data,
      });
    });
  }, []);

  return [user, dispatchUserFetch];
};

export default useFetchUser;
