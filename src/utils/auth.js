// import { logout } from "@/api/auth";
import store from "@/store";

export function doLogout() {
  // logout();
  store.commit("updateData", { key: "user", value: {} });
  store.commit("updateData", { key: "loginMode", value: null });
}

export function isLoggedIn() {
  return Cookies.get("MUSIC_U") !== undefined ? true : false;
}

// 账号登录
export function isAccountLoggedIn() {
  return (
    Cookies.get("MUSIC_U") !== undefined &&
    store.state.data.loginMode === "account"
  );
}

// 用户名搜索（用户数据为只读）
export function isUsernameLoggedIn() {
  return store.state.data.loginMode === "username";
}

// 账户登录或者用户名搜索都判断为登录，宽松检查
export function isLooseLoggedIn() {
  return isAccountLoggedIn() || isUsernameLoggedIn();
}

export function getMusicU(string) {
  const temp = string.split(";");
  if (!temp.length) {
    return undefined;
  }
  const MUSIC_U = temp.find((item) => item.includes("MUSIC_U"));
  if (MUSIC_U) {
    return MUSIC_U.split("=")[1];
  }
  return "";
}

export function setMusicU(key, value) {
  return Cookies.set(key, value);
}
