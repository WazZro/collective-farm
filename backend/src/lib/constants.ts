export const APPLICATION_PORT = 8080;
export const CONTAINER_HOSTNAME_IP = '0.0.0.0';

export const CORS_OPTION = {
  origin: true,
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  preflightContinue: false,
  optionsSuccessStatus: 204,
  credentials: true,
};

export const JWT_PRIVATE_KEY =
  process.env.ENVIRONMENT === 'development'
    ? JSON.parse(`"${process.env.PRIVATE_KEY}"`)
    : process.env.PRIVATE_KEY;
export const JWT_PUBLIC_KEY =
  process.env.ENVIRONMENT === 'development'
    ? JSON.parse(`"${process.env.PUBLIC_KEY}"`)
    : process.env.PUBLIC_KEY;

export const ARGON_HASHING_TIME = 128;
export const ARGON_HASHING_THREADS = 16;

export const REFRESH_TOKEN_EXPIRES = 7776000;
export const ACCESS_TOKEN_EXPIRES = 3600;
