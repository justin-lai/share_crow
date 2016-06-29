import React, { Component } from 'react';
import config from '../../config.js';

class Payments extends Component {

  componentDidMount() {
    return {
      stripeLoading: true,
      stripeLoadingError: false,
      submitDisabled: false,
      paymentError: null,
      paymentComplete: false,
      token: null,
    };
  }

  onScriptLoaded() {
    if (!Payments.getStripeToken) {
      // Put your publishable key here
      window.Stripe.setPublishableKey(config.STRIPE_PUB_KEY);

      this.setState({ stripeLoading: false, stripeLoadingError: false });
    }
  }
  onScriptError() {
    this.setState({ stripeLoading: false, stripeLoadingError: true });
  }
  onSubmit(event) {
    const self = this;
    event.preventDefault();
    this.setState({ submitDisabled: true, paymentError: null });
    window.Stripe.createToken(event.target, (status, response) => {
      if (response.error) {
        self.setState({ paymentError: response.error.message, submitDisabled: false });
      } else {
        self.setState({ paymentComplete: true, submitDisabled: false, token: response.id });
      }
    });
  }
  getScriptURL() {
    return 'https://js.stripe.com/v2/';
  }
  render() {
    if (this.state.stripeLoading) {
      return <div>Loading</div>;
    } else if (this.state.stripeLoadingError) {
      return <div>Error</div>;
    } else if (this.state.paymentComplete) {
      return <div>Payment Complete!</div>;
    }
    return (
      <form onSubmit={this.onSubmit} >
        <span>{this.state.paymentError}</span><br />
        <input type="text" data-stripe="number" placeholder="credit card number" /><br />
        <input type="text" data-stripe="exp-month" placeholder="expiration month" /><br />
        <input type="text" data-stripe="exp-year" placeholder="expiration year" /><br />
        <input type="text" data-stripe="cvc" placeholder="cvc" /><br />
        <input disabled={this.state.submitDisabled} type="submit" value="Purchase" />
      </form>
    );
  }
}

export default Payments;
