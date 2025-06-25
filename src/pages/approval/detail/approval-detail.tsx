import { Helmet } from 'react-helmet-async';
import { ApprovalDetailView } from './view/approval-detail-view';
import { useParams } from '../../../hooks/use-params';

export default function ApprovalDetail() {
  const params = useParams();

  const { id } = params;

  return (
    <>
      <Helmet>
        <title>Approval Detail</title>
      </Helmet>

      <ApprovalDetailView id={`${id}`} />
    </>
  );
}
