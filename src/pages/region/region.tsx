import { Helmet } from 'react-helmet-async';
import { RegionView } from './view/region-view';

export default function Region() {
  return (
    <>
      <Helmet>
        <title>Region</title>
      </Helmet>

      <RegionView />
    </>
  );
}
