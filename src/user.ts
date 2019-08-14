import { AppConfig, UserSession } from "blockstack";

export const appConfig = new AppConfig();
export const userSession = new UserSession({ appConfig });