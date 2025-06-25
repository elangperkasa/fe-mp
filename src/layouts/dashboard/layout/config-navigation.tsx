import { useMemo } from 'react';
import { NavListProps } from 'src/components/nav-section';
import SvgColor from 'src/components/svg-color';
import { paths } from 'src/pages/paths';
import { ApprovalCounter } from './approval-counter';

const icon = (name: string) => (
  <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />
);

const ICONS = {
  job: icon('ic_job'),
  blog: icon('ic_blog'),
  chat: icon('ic_chat'),
  mail: icon('ic_mail'),
  user: icon('ic_user'),
  file: icon('ic_file'),
  lock: icon('ic_lock'),
  tour: icon('ic_tour'),
  order: icon('ic_order'),
  label: icon('ic_label'),
  blank: icon('ic_blank'),
  kanban: icon('ic_kanban'),
  folder: icon('ic_folder'),
  banking: icon('ic_banking'),
  booking: icon('ic_booking'),
  invoice: icon('ic_invoice'),
  product: icon('ic_product'),
  calendar: icon('ic_calendar'),
  disabled: icon('ic_disabled'),
  external: icon('ic_external'),
  menuItem: icon('ic_menu_item'),
  ecommerce: icon('ic_ecommerce'),
  analytics: icon('ic_analytics'),
  dashboard: icon('ic_dashboard'),
};

const navItem: {
  subheader: string;
  items: NavListProps[];
}[] = [
  {
    subheader: 'Main Hub',
    items: [
      {
        info: <ApprovalCounter />,
        roles: ['SUPER_ADMIN', 'SAM', 'ADMIN_CENTRAL', 'VIEWER'],
        title: 'Approval',
        path: paths.approval.root,
        icon: ICONS.blank,
      },
    ],
  },
  {
    subheader: 'Master',
    items: [
      {
        roles: ['SUPER_ADMIN'],
        title: 'Region',
        path: paths.region.root,
        icon: ICONS.banking,
      },
      {
        roles: ['SUPER_ADMIN'],
        title: 'Territory',
        path: paths.territory.root,
        icon: ICONS.tour,
      },
    ],
  },
  {
    subheader: 'Authentication',
    items: [
      {
        roles: ['SUPER_ADMIN'],
        title: 'User',
        path: paths.user.root,
        icon: ICONS.user,
      },
      // {
      //   roles: ['SUPER_ADMIN'],
      //   title: 'Role',
      //   path: paths.role.root,
      //   icon: ICONS.lock,
      // },
      {
        roles: ['SUPER_ADMIN'],
        title: 'Position',
        path: paths.position.root,
        icon: ICONS.lock,
      },
    ],
  },
  {
    subheader: 'Log',
    items: [
      {
        roles: ['SUPER_ADMIN', 'ADMIN_CENTRAL'],
        title: 'Activity',
        path: paths.activity.root,
        icon: ICONS.blog,
      },
    ],
  },
];

export function useNavData() {
  return useMemo(() => navItem, []);
}
