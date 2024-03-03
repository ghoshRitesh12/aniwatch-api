import axios, { AxiosError, type AxiosRequestConfig } from "axios";
import {
  SRC_BASE_URL,
  ACCEPT_HEADER,
  USER_AGENT_HEADER,
  ACCEPT_ENCODING_HEADER,
} from "../utils/constants.js";

const clientConfig: AxiosRequestConfig = {
  timeout: 10000,
  baseURL: SRC_BASE_URL,
  headers: {
    Accept: ACCEPT_HEADER,
    "User-Agent": USER_AGENT_HEADER,
    "Accept-Encoding": ACCEPT_ENCODING_HEADER,
  },
};

const client = axios.create(clientConfig);

export { client, AxiosError };
