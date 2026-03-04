export class UserDto {
  id: string;
  email: string;
  password: string;
  roles: RoleDto[];
}

class RoleDto {
  id: string;
  name: string;
}