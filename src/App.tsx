import React, { ReactElement } from 'react';
import './App.css';
import { Viewer } from './Viewer3D/Viewer';

function App(): ReactElement {
  return (
    <div className="App">
      <Viewer />
    </div>
  );
}

export default App;
