import { Helmet } from 'react-helmet-async';
import { ApprovalListView } from './view/approval-list-view';

export default function ApprovalList() {
  return (
    <>
      <Helmet>
        <title>Approval List</title>
      </Helmet>

      <ApprovalListView />
    </>
  );
}
