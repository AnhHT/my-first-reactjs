import React, {Component} from 'react'
import { connect } from 'react-redux'
import { actions as authActions } from '../../redux/modules/auth'
import { reduxForm } from 'redux-form'
import classes from './LoginView.scss'

const mapStateToProps = (state) => ({
  isAuthenticating: state.auth.isAuthenticating,
  statusText: state.auth.statusText
})

class LoginViewRF extends Component {
	static propTypes = {
     error: React.PropTypes.string,
     login: React.PropTypes.func.isRequired,
     isAuthenticating: React.PropTypes.bool,
     statusText: React.PropTypes.string,
     location: React.PropTypes.object
   };

   constructor (props) {
     super(props)
     const redirectRoute = this.props.location.query.next || '/login'
     this.state = {
       email: '',
       password: '',
       redirectTo: redirectRoute
     }
   }

    handleSubmit (evt) {
    	evt.preventDefault()
    	this.props.login({email: this.state.email, password: this.state.password, redirectTo: this.state.redirectTo})
  	}

	handleChange (e) {
		this.setState({ [e.target.name]: e.target.value })
	}	

	render() {
		const {fields: {email, password}, handleSubmit} = this.props;
		return (
				<div className={classes.container}>
					<h1>Login RF</h1>
					<section>
						<form onSubmit={::this.handleSubmit} onChange={::this.handleChange}>
							<div>
								<label>Email</label>
								<input type="email" placeholder="Email..." {...email}/>
							</div>
							<div>
								<label>Password</label>
								<input type="password" {...password}/>
							</div>
							<button onClick={::this.handleSubmit}}>Login</button>
						</form>
					</section>
				</div>
			);
	}
}

LoginViewRF = reduxForm({
	form: 'login',
	fields: ['email', 'password']
})(LoginViewRF);

export default connect(mapStateToProps, authActions)(LoginViewRF);