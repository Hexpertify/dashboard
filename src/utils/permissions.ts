export type Permission =
  | 'users:read'
  | 'users:create'
  | 'users:update'
  | 'users:delete'
  | 'dashboard:read'
  | 'analytics:read'
  | 'reports:read'
  | 'reports:create'
  | 'settings:read'
  | 'settings:update'
  | 'seo:read'
  | 'seo:update';

export type Role = 'admin' | 'manager' | 'editor' | 'viewer';

export const ROLE_PERMISSIONS: Record<Role, Permission[]> = {
  admin: [
    'users:read',
    'users:create',
    'users:update',
    'users:delete',
    'dashboard:read',
    'analytics:read',
    'reports:read',
    'reports:create',
    'settings:read',
    'settings:update',
    'seo:read',
    'seo:update',
  ],
  manager: [
    'users:read',
    'users:create',
    'users:update',
    'dashboard:read',
    'analytics:read',
    'reports:read',
    'reports:create',
    'settings:read',
    'settings:update',
    'seo:read',
    'seo:update',
  ],
  editor: [
    'users:read',
    'dashboard:read',
    'analytics:read',
    'reports:read',
    'settings:read',
    'seo:read',
    'seo:update',
  ],
  viewer: [
    'users:read',
    'dashboard:read',
    'analytics:read',
    'reports:read',
    'settings:read',
  ],
};

export function hasPermission(userPermissions: Permission[], required: Permission | Permission[]): boolean {
  const requiredArray = Array.isArray(required) ? required : [required];
  return requiredArray.every((p) => userPermissions.includes(p));
}

export function hasRole(userRole: Role, allowedRoles: Role[]): boolean {
  return allowedRoles.includes(userRole);
}

export function getPermissionsForRole(role: Role): Permission[] {
  return ROLE_PERMISSIONS[role] || [];
}

export function canAccessRoute(userRole: Role, routePermissions: Permission[]): boolean {
  const userPermissions = getPermissionsForRole(userRole);
  return hasPermission(userPermissions, routePermissions);
}

export const ROUTE_PERMISSIONS: Record<string, Permission[]> = {
  '/dashboard': ['dashboard:read'],
  '/dashboard/analytics': ['analytics:read'],
  '/dashboard/users': ['users:read'],
  '/dashboard/users/create': ['users:create'],
  '/dashboard/users/:id/edit': ['users:update'],
  '/dashboard/reports': ['reports:read'],
  '/dashboard/reports/create': ['reports:create'],
  '/dashboard/settings': ['settings:read'],
  '/dashboard/settings/seo': ['seo:read'],
};