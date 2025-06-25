export function generateNotificationText(status: string) {
  if (status === 'rejected') {
    return 'was rejected.';
  }

  if (status === 'approved') {
    return 'was approved.';
  }

  return 'needs approval.';
}
