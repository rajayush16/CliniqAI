import { apiRequest } from "./api";
import type { AuthResponse, LoginPayload, SignupPayload, User } from "../types/auth";

export function login(payload: LoginPayload) {
  return apiRequest<AuthResponse>("/api/auth/login", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export function signup(payload: SignupPayload) {
  return apiRequest<AuthResponse>("/api/auth/register", {
    method: "POST",
    body: JSON.stringify({ ...payload, role: payload.role ?? "doctor" }),
  });
}

export function getMe() {
  return apiRequest<User>("/api/auth/me");
}

