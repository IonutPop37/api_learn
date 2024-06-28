import dotenv from 'dotenv';

dotenv.config();

export default {
  env: {
    NEXT_PUBLIC_API_IP_URL: process.env.API_IP_URL,
    NEXT_PUBLIC_API_GEO_URL: process.env.API_GEO_URL,
    NEXT_PUBLIC_API_SEARCH_USER: process.env.API_SEARCH_USER,
    NEXT_PUBLIC_API_REGISTER: process.env.API_REGISTER,
    NEXT_PUBLIC_API_LOGIN: process.env.API_LOGIN,
    NEXT_PUBLIC_API_GET_EXT_IP: process.env.API_GET_EXT_IP,
  },
  webpack: (config, { isServer }) => {
    return config;
  },
};
