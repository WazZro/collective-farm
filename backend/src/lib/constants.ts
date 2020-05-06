export const APPLICATION_PORT = 3000;
export const CONTAINER_HOSTNAME_IP = '0.0.0.0';

export const CORS_OPTION = {
  origin: true,
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  preflightContinue: false,
  optionsSuccessStatus: 204,
  credentials: true,
};

export const ARGON_HASHING_TIME = 128;
export const ARGON_HASHING_THREADS = 16;

export const SESSION_MEMORY_STORE_EXPIRE = 86400000; // 24h
export const SESSION_COOKIE_SECRET_KEY = process.env.COOKIE_SECRET || 'test_secret';
export const SESSION_COOKIE_NAME = process.env.COOKIE_NAME || 'ss';
export const ROLE_META = 'farm_role_key';

