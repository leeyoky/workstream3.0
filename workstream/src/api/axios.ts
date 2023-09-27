import instance from "./interceptor";

export function login(userData: string) {
  return instance.post("login", userData);
}

export function getUsersInfo() {
  return instance.get("users");
}
