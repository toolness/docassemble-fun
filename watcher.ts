import * as fs from 'fs';
import chokidar from 'chokidar';
import request from 'request-promise-native';

import { CookieJar } from 'request';

const ROOT_URL = 'http://localhost';
const FILENAME = 'test.yml';
const EMAIL = process.env['EMAIL'] || 'admin@admin.com';
const PASSWORD = process.env['PASSWORD'];

interface SignInResponse {
  action: 'login',
  csrf_token: string
}

interface SessionState {
  jar: CookieJar,
  csrf_token: string
}

async function login(email: string, password: string): Promise<SessionState> {
  console.log(`Logging in as ${email}...`);

  const jar = request.jar();
  const csrfReq: SignInResponse = await request.get(`${ROOT_URL}/user/sign-in?json=1`, {
    json: true,
    jar,
  });
  const csrf_token = csrfReq.csrf_token;

  const loginReq = await request.post(`${ROOT_URL}/user/sign-in`, {
    formData: {
      'next': `${ROOT_URL}/interviews?json=1`,
      csrf_token,
      email,
      password,
    },
    followAllRedirects: true,
    jar,
    json: true,
  });

  console.log(`Logged in as ${email}.`);

  return { jar, csrf_token };
}

async function updatePlayground(session: SessionState, filename: string) {
  console.log(`Syncing ${filename} with docassemble...`);

  const { jar, csrf_token } = session;

  const contents = fs.readFileSync(filename, { encoding: 'utf-8' });

  const req = await request.post(`${ROOT_URL}/playground`, {
    headers: {
      'X-Requested-With': 'XMLHttpRequest'
    },
    formData: {
      csrf_token,
      original_playground_name: filename,
      playground_name: filename,
      playground_content: contents,
      submit: 'Save',
      ajax: '1',
    },
    jar,
    json: true,
  });

  console.log(`Done syncing ${filename} with docassemble.`);
}

async function main() {
  if (!PASSWORD) {
    throw new Error(`Please set the PASSWORD environment variable to the password for ${EMAIL}.`);
  }

  const session = await login(EMAIL, PASSWORD);

  await updatePlayground(session, FILENAME);

  const watcher = chokidar.watch(FILENAME);

  watcher.on('change', () => {
    updatePlayground(session, FILENAME).catch(e => {
      console.log(e);
      process.exit(1);
    });
  });
}

if (module.parent === null) {
  main().catch(e => {
    console.log(e);
    process.exit(1);
  });
}
