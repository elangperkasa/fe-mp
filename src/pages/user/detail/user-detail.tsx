import { Helmet } from 'react-helmet-async';
import { useParams } from '../../../hooks/use-params';
import { UserDetailView } from './view/user-detail-view';

export default function UserDetail() {
  const params = useParams();

  const { id } = params;

  return (
    <>
      <Helmet>
        <title>User Detail</title>
      </Helmet>

      <UserDetailView id={`${id}`} />
    </>
  );
}
