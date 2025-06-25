import { useGetNotificationSummary } from '../../../services/notification/hooks/use-get-notification-summary';
import Typography from '@mui/material/Typography';
import { useAuthContext } from '../../../auth/hooks';
import { INotificationTask } from '../../../types/notification';

export function ApprovalCounter() {
  const { user } = useAuthContext();

  const { notification, isFetching, error } = useGetNotificationSummary();

  if (isFetching || !notification || error) {
    return (
      <Typography variant="caption" color="common.white">
        &nbsp;&nbsp;
      </Typography>
    );
  }

  return (
    <Typography variant="body2" color="common.white" fontWeight="bold">
      {countNotifications(user?.role, notification.task)}
    </Typography>
  );
}

function countNotifications(role: string, task: INotificationTask) {
  if (role === 'SAM') {
    return task.requested + task.reconfirm;
  }

  if (role === 'ADMIN_CENTRAL') {
    return task.verified;
  }

  return task.requested + task.reconfirm + task.verified;
}
