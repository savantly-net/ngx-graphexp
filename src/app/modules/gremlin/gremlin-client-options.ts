
// Breaking change in TinkerPop v3.2.2, connect to /gremlin rather than /
// See: https://groups.google.com/d/topic/gremlin-users/x4hiHsmTsHM/discussion

export class GremlinClientOptions {
  port = 8182;
  host = 'localhost';
  path = '/gremlin';
  language = 'gremlin-groovy';
  useSession = true;
  ssl = false;
  rejectUnauthorized = true;
  op = 'eval';
  accept = 'application/json';

  user: string;
  password: string;
  processor: string;
  aliases: string;

  setPath(path) {
    this.path = path && path.length && !path.startsWith('/') ? `/${path}` : path;
  }
}
