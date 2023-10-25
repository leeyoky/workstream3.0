import instance from "./interceptor";

export function login(userData: string) {
  return instance.post("login", userData);
}

export function getUsersInfo() {
  return instance.get("users");
}

export function getDepartment() {
  return instance.get("dept");
}

export function getEmployeeInfo() {
  return instance.get("emp?size=300")
}
