import React, { Component } from 'react';
import AudioAnalyzer from './AudioAnalyzer';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      audio: null
    };
    this.toggleMicrophone = this.toggleMicrophone.bind(this);
  }

  async getMicrophone() {
    const audio = await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: false
    });
    this.setState({audio});
  }

  stopMicrophone() {
    this.state.audio.getTracks().forEach(track => track.stop());
    this.setState({ audio: null });
  }

  toggleMicrophone() {
    this.state.audio ? this.stopMicrophone() : this.getMicrophone() ;
  }

  render() {
    return (
      <div className="App">
        <div className="controls">
          <button onClick={this.toggleMicrophone}>
          {this.state.audio ? 'Stop Microphone' : 'Get microphone input'}
          </button>
        </div>
        {this.state.audio ? <AudioAnalyzer audio={this.state.audio} /> : ''}
      </div>
    );
  }
}

export default App;
