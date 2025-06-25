import { Helmet } from 'react-helmet-async';
import { NotificationView } from './view/notification-view';

export default function Notification() {
  return (
    <>
      <Helmet>
        <title>Notification</title>
      </Helmet>

      <NotificationView />
    </>
  );
}
