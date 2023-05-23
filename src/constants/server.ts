export const SERVER = {
  푸우: {
    url: 'http://43.201.10.4:8080',
    id: 'a@a.com',
    password: '1234',
  },
  도치: {
    url: 'http://13.209.67.114:8080',
    id: 'a@a.com',
    password: '1234',
  },
  엔초: {
    url: 'http://13.124.236.192:8080',
    id: 'a@a.com',
    password: '1234',
  },
} as const;

export const SERVER_KEYS = Object.keys(SERVER);

export type ServerKey = keyof typeof SERVER;

export const isServerKey = (value: unknown): value is ServerKey => {
  const serverKey = value as ServerKey;

  return serverKey in SERVER;
};