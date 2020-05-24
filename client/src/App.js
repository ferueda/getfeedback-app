import React from 'react';

const App = () => {
  return (
    <React.Fragment>
      <div>
        <a href="/auth/google">Sign in With Google</a>
      </div>
      <div>
        <a href="/auth/facebook">Sign in With Facebook</a>
      </div>
    </React.Fragment>
  );
};

export default App;
