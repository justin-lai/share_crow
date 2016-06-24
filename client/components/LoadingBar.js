import React, { Component } from 'react';

class LoadingBar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      text: 'LOADING',
    };
  }

  componentDidMount() {
    const context = this;

    setInterval(() => {
      let newText;
      if (this.state.text === 'LOADING') {
        newText = 'LOADING.';
      } else if (this.state.text === 'LOADING.') {
        newText = 'LOADING..';
      } else if (this.state.text === 'LOADING..') {
        newText = 'LOADING...';
      } else {
        newText = 'LOADING';
      }

      context.setState({
        text: newText,
      });
    }, 500);
  }

  componentWillUnmount() {
    // clear interval
  }

  render() {
    return (
      <div>
        <img
          id="loading-crow"
          src="craaw.gif"
          alt="awesome crow"
        />
        <h1 id="loading-message">{this.state.text}</h1>
      </div>
    );
    // return (
    //   <div>
    //     <div id="loadingText">
    //       {this.state.text}
    //     </div>
    //     <div id="loadingContainer">
    //       <div id="statusBar" style={{ width: `${this.state.width}%` }}>
    //       </div>
    //     </div>
    //     <img
    //       id="loading-crow"
    //       src="craaw.gif"
    //       alt="awesome crow"
    //     />
    //   </div>
    // );
  }
}

export default LoadingBar;
