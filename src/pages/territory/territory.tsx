import { Helmet } from 'react-helmet-async';
import { TerritoryView } from './view/territory-view';

export default function Territory() {
  return (
    <>
      <Helmet>
        <title>Territory</title>
      </Helmet>

      <TerritoryView />
    </>
  );
}
