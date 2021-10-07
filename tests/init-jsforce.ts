import * as jsforce from 'jsforce';
import * as path from 'path';
import * as dotenv from 'dotenv';

dotenv.config({ path: path.join(__dirname, '../.env') });

let conn: jsforce.Connection;

/**
 * Get JSForce connection object, only needed if using the conn object.
 * NOTE: ensure that your .env file has updated credentials before attempting to use this
 */
export async function getConn() {
  if (conn) {
    return conn;
  }
  let { loginUrl, username, password, apiToken } = process.env;
  apiToken = apiToken || '';

  conn = new jsforce.Connection({ loginUrl: loginUrl });

  const userInfo = await conn.login(username, password + apiToken);
  return conn;
}
