import { paths } from 'src/pages/paths';

export function pathAfterLogin(role?: string) {
  switch (role) {
    // case 'VENDOR':
    //   return paths.dashboard.root;

    // case rolePTPL.includes(role):
    //   return paths.dashboard.root;

    default:
      return paths.approval.root;
      // return paths.user.root;
  }
}
