import React from 'react'
import {connect} from 'react-redux'
import '../../styles/core.scss'
import Appbar from 'components/appbar'
import { actions as authActions } from '../../redux/modules/auth'

// Note: Stateless/function components *will not* hot reload!
// react-transform *only* works on component classes.
//
// Since layouts rarely change, they are a good place to
// leverage React's new Statelesss Functions:
// https://facebook.github.io/react/docs/reusable-components.html#stateless-functions

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated
})

export class CoreLayout extends React.Component {
  static propTypes = {
    isAuthenticated: React.PropTypes.bool,
    logoutAndRedirect: React.PropTypes.func,
    children: React.PropTypes.element
  };

  render () {
    const {isAuthenticated} = this.props
    return (
      <article>
        <Appbar isAuthenticated={isAuthenticated} logoutAndRedirect={this.props.logoutAndRedirect} />
        {this.props.children}
      </article>
    )
  }
}

export default connect(mapStateToProps, authActions)(CoreLayout)
