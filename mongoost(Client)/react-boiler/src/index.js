
import React from 'react';
import { render } from 'react-dom';
import UserForms from './containers/user-forms/userForms';

const App = () => {
  return (
    <div>
      <UserForms/>
    </div>
  );
};

render(<App />, document.getElementById('app'));