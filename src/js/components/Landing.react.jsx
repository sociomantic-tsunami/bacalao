/**
 * Landing Page Component
 * Stateless Component
 */
var React = require('react/addons');
var Button = require('react-bootstrap').Button;

var LandingComponent = React.createClass({

    render : function() {

        return <div className="container">
            <div className="jumbotron">
                <h1>Bacalao</h1>
                <p className="lead">
                    Schedule lunch with your colleagues quickly, meet people from different
                    departments and discover good places to eat.
                </p>
                <p className="lead">
                  <Button href="/auth/facebook" className="user--login-button" bsSize="medium" bsStyle="info" onClick={this._onLogin}>
                    Login with Facebook
                  </Button>
                </p>
            </div>
        </div>;
    }
});

module.exports = LandingComponent;
