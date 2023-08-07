import { cleanEnv, port, str } from "envalid";
import { config } from "dotenv";

config();

const env = cleanEnv(process.env, {
  PORT: port(),
  APP_SRC_USER_AGENT: str(),
  APP_SRC_ACCEPT_HEADER: str(),
  APP_SRC_ACCEPT_ENCODING_HEADER: str(),

  APP_SRC_BASE_URL: str(),
  APP_SRC_AJAX_URL: str(),
  APP_SRC_HOME_URL: str(),
  APP_SRC_SEARCH_URL: str(),
});

export default env;
