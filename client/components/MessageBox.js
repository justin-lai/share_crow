import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import Message from './Message.js';
import { getMessage } from '../actions/messageActions.js';

class MessageBox extends Component {
  constructor(props) {
    super(props);

    this.messages = [];
    this.methods = this.props.methods;
  }

  componentDidMount() {
    console.log(this.props);
    this.methods.getMessage(`recipientId=${this.props.isAuth.userInfo.id}`);
  }

  componentWillReceiveProps(nextProps) {
    console.log(nextProps);
    this.messages = nextProps.message;
  }

  render() {
    return (
      <li id="messagebox" className="dropdown">
        <a
          className="dropdown-toggle"
          data-toggle="dropdown"
        >Notifications<span className="caret"></span>
        </a>
        <ul className="message-list dropdown-menu">
          {this.messages.length > 0 ? this.messages.map(message =>
            <Message messageItem={message} key={message.id} />
            )
          :
            <li className="no-message">You have no notifications</li>
          }
        </ul>
      </li>
    );
  }
}

MessageBox.propTypes = {
};

function mapStateToProps(state) {
  const { isAuth, message } = state;

  return {
    isAuth,
    message,
  };
}

const mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return {
    methods: {
      getMessage: (query) => {
        dispatch(getMessage(query));
      },
    },
  };
};

MessageBox.propTypes = {
  methods: PropTypes.object.isRequired,
  isAuth: PropTypes.object.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(MessageBox);
