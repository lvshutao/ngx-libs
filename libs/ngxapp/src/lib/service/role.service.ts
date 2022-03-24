export const RoleAdmin = 'admin';
export const RoleSuperAdmin = 'super-admin';

const cacheKey = '_roles';

/**
 * 角色检测
 */
export class RoleService {
  static saveRoles(roles: string[]) {
    if (roles && roles.length > 0) {
      localStorage.setItem(cacheKey, JSON.stringify(roles));
    } else {
      console.warn('skip save empty roles!')
    }
  }

  static inRoles(role: string): boolean {
    const rs = localStorage.getItem(cacheKey);
    if (rs) {
      const roles = JSON.parse(rs) as string[];
      if (roles && roles.length > 0) {
        if (roles.includes(RoleSuperAdmin)) {
          return true;
        }
        const isAdmin = roles.includes(RoleAdmin);
        switch (role) {
          case RoleAdmin:
            return isAdmin;
          default:
            return isAdmin || roles.includes(role);
        }
      } else {
        console.warn('roles in cache seem error format:', roles)
      }
    }
    return false;
  }

  static clear() {
    localStorage.removeItem(cacheKey)
  }
}
