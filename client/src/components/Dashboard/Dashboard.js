import React from 'react';
import { Link } from 'react-router-dom';
import SurveyList from '../SurveyList/SurveyList';
import useFetchSurveys from '../../hooks/useFetchSurveys';
import './Dashboard.css';

const Dashboard = () => {
  const [surveys, dispatchFetchSurveys] = useFetchSurveys([]);

  return (
    <div>
      <SurveyList surveys={surveys} />
      <div className="survey-btn__container">
        <Link to="/surveys/new" className="create-survey-btn">
          <svg xmlns="http://www.w3.org/2000/svg" height="30px" viewBox="0 0 448 448" width="30px">
            <g>
              <path
                d="m408 184h-136c-4.417969 0-8-3.582031-8-8v-136c0-22.089844-17.910156-40-40-40s-40 17.910156-40 40v136c0 4.417969-3.582031 8-8 8h-136c-22.089844 0-40 17.910156-40 40s17.910156 40 40 40h136c4.417969 0 8 3.582031 8 8v136c0 22.089844 17.910156 40 40 40s40-17.910156 40-40v-136c0-4.417969 3.582031-8 8-8h136c22.089844 0 40-17.910156 40-40s-17.910156-40-40-40zm0 0"
                data-original="#000000"
                data-old_color="#000000"
                fill="#FFFFFF"
              />
            </g>{' '}
          </svg>
        </Link>
      </div>
    </div>
  );
};

export default Dashboard;
