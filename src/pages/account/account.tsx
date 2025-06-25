import { Helmet } from 'react-helmet-async';
import { AccountView } from './view/account-view';

export default function Account() {
  return (
    <>
      <Helmet>
        <title>Account</title>
      </Helmet>

      <AccountView />
    </>
  );
}
