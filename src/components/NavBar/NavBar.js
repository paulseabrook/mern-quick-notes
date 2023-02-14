// Don't forget the import
import { Link } from 'react-router-dom';
import * as userService from '../../utilities/users-service';

export default function NavBar({ user, setUser }) {
  function handleLogOut() {
    // delegate the loggin out to users-service
    userService.logOut();
    setUser(null);
  }
  return (
    <nav>
      {/* the Link component allows us to change the URL Client-Side only without triggering an HTTP Request */}
      {/* our "to" is the page we are linking to  */}
      <Link to='/orders'>Order History</Link>
      {/* We can do a "pipe" imbetween our two links */}
      &nbsp; | &nbsp;
      <Link to='/orders/new'>New Order</Link>
      &nbsp; | &nbsp;
      <span>welcome, {user.name} </span>
      &nbsp; | &nbsp;
      <Link to='' onClick={handleLogOut}>
        {' '}
        Log Out{' '}
      </Link>
    </nav>
  );
}
