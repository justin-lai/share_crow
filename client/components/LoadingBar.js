import React, { Component } from 'react';
/* eslint-disable react/prop-types */
class LoadingBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: props.message || 'you must be logged in',
      dots: 0,
    };
    this.loading = this.loading.bind(this);
  }

  componentDidMount() {
    // this.interval = setInterval(this.loading, 500); // Call a method on the mixin
  }

  componentWillUnmount() {
    // clearInterval(this.interval);
  }

  loading() {
    // let i;
    // let newText = 'you must be logged in';
    // const numDots = 5;

    // for (i = 0; i < this.state.dots; i++) {
      // newText = `${newText}.`;
    // }

    // this.setState({
    //   dots: this.state.dots === numDots ? 0 : this.state.dots + 1,
    //   text: newText,
    // });
  }

  render() {
    return (
      <div>
        <img
          id="loading-crow"
          src="ripple.gif"
          alt="loading..."
        />
      </div>
    );
  }
}


// class LoadingBar extends Component {
//   constructor(props) {
//     super(props);
//     this.intervals = [];
//     this.mixins = [SetIntervalMixin];
//   }

//   getInitialState() {
//     return { text: 'LOADING' };
//   }

//   componentDidMount() {
//     const context = this;

//     setInterval(() => {
//       let newText;
//       if (this.state.text === 'LOADING') {
//         newText = 'LOADING.';
//       } else if (this.state.text === 'LOADING.') {
//         newText = 'LOADING..';
//       } else if (this.state.text === 'LOADING..') {
//         newText = 'LOADING...';
//       } else {
//         newText = 'LOADING';
//       }

//       context.setState({
//         text: newText,
//       });
//     }, 500);
//   }

//   render() {
//     return (
//       <div>
//         <img
//           id="loading-crow"
//           src="craaw.gif"
//           alt="awesome crow"
//         />
//         <h1 id="loading-message">{this.state.text}</h1>
//       </div>
//     );
//     // return (
//     //   <div>
//     //     <div id="loadingText">
//     //       {this.state.text}
//     //     </div>
//     //     <div id="loadingContainer">
//     //       <div id="statusBar" style={{ width: `${this.state.width}%` }}>
//     //       </div>
//     //     </div>
//     //     <img
//     //       id="loading-crow"
//     //       src="craaw.gif"
//     //       alt="awesome crow"
//     //     />
//     //   </div>
//     // );
//   }
// }

export default LoadingBar;
