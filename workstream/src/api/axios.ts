import instance from "./interceptor";

export function login(userData: string) {
  return instance.post("login", userData);
}

export function getUsersInfo() {
  return instance.get("users");
}

export function getDepartment() {
  console.log("1");
  return instance.get("dept");
}
