import { checkToken } from '../../utilities/users-service';

export default function OrderHistoryPage() {
  async function handleCheckToken() {
    checkToken().then(alert);
  }
  return (
    <>
      <h2>Order History Page</h2>
      <button onClick={handleCheckToken}> Check when my Login Expires</button>
    </>
  );
}
