import { Helmet } from 'react-helmet-async';
import { ActivityView } from './view/activity-view';

export default function Activity() {
  return (
    <>
      <Helmet>
        <title>Activity</title>
      </Helmet>

      <ActivityView />
    </>
  );
}
