import { useMemo } from 'react';
import { UseQueryReturn } from '../../shared/use-query-return-type';
import { BaseMeta } from '../../shared/base.response';
import { RoleResponse } from '../role.response';
import { useGetUserRoles } from '../../user/hooks/use-get-user-roles';
import { IRoleStatus } from '../../../types/role';

interface UseGetAllRoleReturn extends UseQueryReturn {
  roles: RoleResponse[];
  meta?: BaseMeta;
}

interface Params {
  status: string;
  name: string;
}

const meta: BaseMeta = {
  record: {
    current: 1,
    total: 1,
  },
  page: {
    current: 1,
    total: 1,
  },
};

export function useGetAllRole(params: Params): UseGetAllRoleReturn {
  const { roles, isFetching, error } = useGetUserRoles();

  const roleItems = roles
    .map((role, index) => ({
      id: `${index + 1}`,
      name: role,
      status: 'active' as IRoleStatus,
    }))
    .filter((role) => {
      if (params.name && !role.name.toLowerCase().includes(params.name.trim().toLowerCase())) {
        return false;
      }

      if (params.status && role.status !== params.status) {
        return false;
      }

      return true;
    });

  return useMemo(
    () => ({
      roles: roleItems || [],
      meta,
      error,
      isFetching,
    }),
    [roles, roleItems, error, isFetching]
  );
}
