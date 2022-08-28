import { App } from '@/app';
import { AuthRoute } from './routes/auth.route';
import { IndexRoute } from './routes/index.route';
import { PermissionGroupsRoute } from './routes/permission-groups.route';
import { PermissionsRoute } from './routes/permissions.route';
import { RolesRoute } from './routes/roles.route';
import { UsersRoute } from './routes/users.route';
import { validateEnv } from './utils/validateEnv';

validateEnv();

const app = new App([new IndexRoute(), new UsersRoute(), new AuthRoute(), new PermissionsRoute(), new PermissionGroupsRoute(), new RolesRoute()]);

app.listen();
