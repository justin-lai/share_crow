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
    this.methods.getMessage('recipientId=10');
  }

  componentWillReceiveProps(nextProps) {
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
          {this.messages.map(message =>
            <Message message={message} key={message.id} />
          )}
        </ul>
      </li>
    );
  }
}

MessageBox.propTypes = {
};

function mapStateToProps(state) {
  const { session, message } = state;

  return {
    session,
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
};

export default connect(mapStateToProps, mapDispatchToProps)(MessageBox);
