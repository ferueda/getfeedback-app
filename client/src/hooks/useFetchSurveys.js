import { useEffect, useReducer } from 'react';
import axios from 'axios';
import reducers from '../context/reducers';

const fetchSurvey = async () => {
  const res = await axios.get('/api/surveys');
  return res.data;
};

const useFetchSurveys = (initialState) => {
  const [surveys, dispatchFetchSurveys] = useReducer(reducers.surveys, initialState);

  useEffect(() => {
    fetchSurvey().then((data) => {
      dispatchFetchSurveys({
        type: 'FETCH_SURVEYS',
        payload: data,
      });
    });
  }, []);

  return [surveys, dispatchFetchSurveys];
};

export default useFetchSurveys;
