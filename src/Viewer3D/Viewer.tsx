import React, { ReactElement } from 'react';
import './Viewer.scss';
import Experience from '../Experience/Experience';
// type ViewerState = {
//   isSceneReady: boolean,
//   isStarted: boolean,
// };

export class Viewer extends React.Component {
  // state: ViewerState = { isSceneReady: false, isStarted: false };

  async componentDidMount(): Promise<void> {
    const experience = new Experience();
    experience.update();
  }

  // onStartClick(): void {
  //   this.setState({ isStarted: true });
  // }

  render(): ReactElement {
    return (
      <div>
        <div className="viewer-container">
          <canvas id="viewer3d" />
        </div>
      </div>
    );
  }
}
