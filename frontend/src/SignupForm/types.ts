export type User = {
  id?: number; // ed 323372,
  full_name?: string; // ex: 'Helena Merk',
  avatar_thumb?: string; // ex  'https://bookface-images.s3.amazonaws.com/avatars/7d3632a1765c1773763e23a2adcbb6c048590f04.jpg',
  companies?: any[]; // array of companies
  email?: string; // ex: 'helena@joinglimpse.com',
  cell?: string; //
  url?: string; // ex: '/user/323372',
  badges?: any[]; // ex: [],
  trusted_answerer?: false;
  admin?: false;
  avatar_medium?: string;
};
export type UnauthedUser = {
  username?: string;
  password?: string;
};
