import { Helmet } from 'react-helmet-async';
import { PositionView } from './view/position-view';

export default function Position() {
  return (
    <>
      <Helmet>
        <title>Position</title>
      </Helmet>

      <PositionView />
    </>
  );
}
