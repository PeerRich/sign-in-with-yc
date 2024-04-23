import cheerio from 'cheerio';
import { CookieJar } from 'request';
import * as rp from 'request-promise';

const getSessionCookiesAndLogin = async (
  cookieJar: CookieJar,
  username: string,
  password: string
) => {
  console.log('getSessionCookiesAndLogin starting **');
  let res1 = await rp.get({
    uri: 'https://account.ycombinator.com/?continue=https%3A%2F%2Fbookface.ycombinator.com%2F',
    headers: {
      accept:
        'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
    },
    method: 'GET',
    resolveWithFullResponse: true,
    jar: cookieJar,
  });

  const $ = cheerio.load(res1.body);
  const csrfToken = $("meta[name='csrf-token']").attr('content');

  console.log(`csrfToken = ${csrfToken}`);

  const response = await rp.post({
    uri: 'https://account.ycombinator.com/sign_in',
    headers: {
      accept: 'application/json',
      'accept-language': 'en-US,en;q=0.9',
      'content-type': 'application/json',
      'x-csrf-token': csrfToken,
      'x-requested-with': 'XMLHttpRequest',
      Referer:
        'https://account.ycombinator.com/?continue=https%3A%2F%ycombinator.com%2F',
      'Referrer-Policy': 'strict-origin-when-cross-origin',
    },
    body: `{"ycid":"${username}","password":"${password}", "captcha":null,"totp":"","continue":"https://bookface.ycombinator.com/"}`,
    resolveWithFullResponse: true,
    jar: cookieJar,
  });
};

const getProfileData = async (cookieJar: CookieJar) => {
  // example that works:
  const response = await rp.get({
    uri: 'https://bookface.ycombinator.com/dashboard',
    headers: {
      accept:
        'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
      'accept-language': 'en-US,en;q=0.9',
    },
    body: null,
    method: 'GET',
    resolveWithFullResponse: true,
    jar: cookieJar,
  });

  const bodyText = await response.body;
  const $ = cheerio.load(bodyText);
  var obj = $(
    `script[data-component-name="DashboardPage"]`
    // @ts-ignore
  ).get()[0].children[0].data;

  if (!obj) throw new Error();
  const parsed = JSON.parse(obj);
  console.log(parsed.currentUser);
  return parsed.currentUser;
};

export const signInWithYC = async (username: string, password: string) => {
  //   const Cookie = tough.Cookie;
  const cookieJar = rp.jar();
  await getSessionCookiesAndLogin(cookieJar, username, password);
  return await await getProfileData(cookieJar);
};
