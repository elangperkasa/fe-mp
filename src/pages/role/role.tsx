import { Helmet } from 'react-helmet-async';
import { RoleView } from './view/role-view';

export default function Role() {
  return (
    <>
      <Helmet>
        <title>Role</title>
      </Helmet>

      <RoleView />
    </>
  );
}
