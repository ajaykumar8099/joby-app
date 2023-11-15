import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'

import './index.css'

const Header = props => {
  const onDelete = () => {
    Cookies.remove('jwt_token')
    const {history} = props
    history.replace('/login')
  }
  return (
    <nav className="nav-bar">
      <Link to="/">
        <img
          src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
          alt="website logo"
          className="nav-image"
        />
      </Link>
      <div>
        <Link to="/" className="link-item">
          Home
        </Link>
        <Link to="/jobs" className="link-item">
          Jobs
        </Link>
      </div>
      <div>
        <button type="button" className="button-element" onClick={onDelete}>
          Logout
        </button>
      </div>
    </nav>
  )
}
export default withRouter(Header)
