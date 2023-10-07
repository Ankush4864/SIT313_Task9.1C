import { Outlet, Link } from "react-router-dom"
import './Navigation.css';

function Navigation() {
  return (<div>

    <div className="search-bar">
      <Link to='/'>
        <p>DEV@Deakin</p>
      </Link>
      <input
        text="test"
        placeholder="Search..."
      />

      <p>Post</p>
      <Link to='/login'>
        <p>Login</p>
      </Link>

    </div>


    <Outlet />
  </div>)

}
export default Navigation