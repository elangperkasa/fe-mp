import { Helmet } from 'react-helmet-async';
import { UserListView } from './view/user-list-view';

export default function User() {
  return (
    <>
      <Helmet>
        <title>User</title>
      </Helmet>

      <UserListView />
    </>
  );
}
