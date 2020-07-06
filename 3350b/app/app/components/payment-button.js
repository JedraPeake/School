import Component from '@ember/component';
export default Component.extend({
    didRender : function() {
    this._super(...arguments);
    paypal.Button.render({
    env: 'sandbox', // sandbox | production
    // PayPal Client IDs - replace with your own
    client: {
    sandbox: 'AaNPGX0JrZd-wH0zFfr2ZEEO94v3pmrk9x5necWTdbgmwYsCXiohkVyC642MsiVWqy6AWDJJZgzXN32Q',
    production: ''
    },
    // Show the buyer a 'Pay Now' button in the checkout flow
    commit: true,
    // payment() is called when the button is clicked
    payment: function(data, actions) {
    // Make a call to the REST api to create the payment
    return actions.payment.create({
        payment: {
            transactions: [{ amount: { total: '0.01', currency: 'USD' }}]
        }
    });
    },
    // onAuthorize() is called when the buyer approves the payment
    onAuthorize: function(data, actions) {
        // Make a call to the REST api to execute the payment
        return actions.payment.execute().then(function(transaction) {
            window.alert(JSON.stringify(transaction));
            });
        }
    }, '#paypal-button-container');
    }
});