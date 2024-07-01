import dotenv from 'dotenv';
import { PHASE_DEVELOPMENT_SERVER } from 'next/dist/shared/lib/constants.js'

dotenv.config();

export default {
  env: {
    NEXT_PUBLIC_API_IP_URL: process.env.API_IP_URL,
    NEXT_PUBLIC_API_GEO_URL: process.env.API_GEO_URL,
    NEXT_PUBLIC_API_SEARCH_USER: process.env.API_SEARCH_USER,
    NEXT_PUBLIC_API_REGISTER: process.env.API_REGISTER,
    NEXT_PUBLIC_API_LOGIN: process.env.API_LOGIN,
    NEXT_PUBLIC_API_GET_EXT_IP: process.env.API_GET_EXT_IP,
    NEXT_PUBLIC_API_CREATOR_LISTING: process.env.API_CREATOR_LISTING,
    NEXT_PUBLIC_API_CREATOR_SEARCH: process.env.API_CREATOR_SEARCH,
    NEXT_PUBLIC_API_ALL_CREATOR_SEARCH: process.env.API_ALL_CREATOR_SEARCH,
  },
  webpack: (config, { isServer }) => {
    return config;
  },
};
