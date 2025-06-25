import type { CardProps } from '@mui/material/Card';
import type { TimelineItemProps } from '@mui/lab/TimelineItem';

import Timeline from '@mui/lab/Timeline';
import TimelineDot from '@mui/lab/TimelineDot';
import Typography from '@mui/material/Typography';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineItem, { timelineItemClasses } from '@mui/lab/TimelineItem';

import { fDateISOString } from 'src/utils/format-time';
import { IApprovalHistory } from '../../../../types/approval';
import Label from '../../../../components/label';
import capitalize from '@mui/utils/capitalize';

type Props = CardProps & {
  title?: string;
  subheader?: string;
  list: IApprovalHistory[];
};

export function ApprovalHistory({ title, subheader, list, ...other }: Props) {
  if (!list.length) {
    return (
      <Typography variant="body2" color="text.disabled">
        Data approval history tidak tersedia.
      </Typography>
    );
  }

  return (
    <Timeline
      sx={{
        m: 0,
        [`& .${timelineItemClasses.root}:before`]: {
          flex: 0,
          padding: 0,
        },
      }}
    >
      {list.map((item, index) => (
        <Item key={item.id} item={item} lastItem={index === list.length - 1} index={index} />
      ))}
    </Timeline>
  );
}

type ItemProps = TimelineItemProps & {
  lastItem: boolean;
  item: Props['list'][number];
  index: number;
};

function Item({ item, lastItem, index, ...other }: ItemProps) {
  return (
    <TimelineItem {...other}>
      <TimelineSeparator>
        <TimelineDot color="primary" sx={{ width: 25, height: 25, position: 'relative' }}>
          <Typography
            variant="caption"
            color="background.default"
            fontWeight="bold"
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
            }}
          >
            {index + 1}
          </Typography>
        </TimelineDot>
        {lastItem ? null : <TimelineConnector sx={{ height: 50 }} />}
      </TimelineSeparator>

      <TimelineContent sx={{ mt: 0.65 }}>
        <Typography variant="subtitle2" color="primary.main">
          {fDateISOString(item.createdAt)}
        </Typography>

        <Typography variant="body2" color="text.primary">
          {item.ActivityLog.userName.toUpperCase()} has changed the approval status from
          <Label
            variant="soft"
            color={
              (item.prevStatus === 'requested' && 'warning') ||
              (item.prevStatus === 'approved' && 'success') ||
              (item.prevStatus === 'verified' && 'info') ||
              (item.prevStatus === 'reconfirm' && 'secondary') ||
              'error'
            }
            sx={{ cursor: 'pointer', mr: 0.5, ml: 0.5 }}
          >
            {capitalize(item.prevStatus)}
          </Label>
          to
          <Label
            variant="soft"
            color={
              (item.currentStatus === 'requested' && 'warning') ||
              (item.currentStatus === 'approved' && 'success') ||
              (item.currentStatus === 'verified' && 'info') ||
              (item.currentStatus === 'reconfirm' && 'secondary') ||
              'error'
            }
            sx={{ cursor: 'pointer', ml: 0.5 }}
          >
            {capitalize(item.currentStatus)}
          </Label>
        </Typography>

        {item.reason && (
          <Typography variant="body2" color="text.disabled">
            Alasan: {item.reason}
          </Typography>
        )}
      </TimelineContent>
    </TimelineItem>
  );
}
