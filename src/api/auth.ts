import { useCallback } from "react";
import { API } from "./base";
import { useMutation } from "@tanstack/react-query";
import { MutationOptions } from "./api-types";

export type UserLogin = Pick<UserAuth, "email" | "password">;
export type RequestPasswordResetInput = Pick<UserAuth, "email">;
export type UserChangePassword = Pick<
  UserAuth,
  "token" | "password" | "passwordConfirmation"
>;

type UserAuth = {
  email?: string;
  password?: string;
  passwordConfirmation?: string;
  token?: string;
};

const URL = {
  AUTH: "/auth",
  RESET_PASSWORD: "/auth/reset-password",
  CHANGE_PASSWORD: "/auth/change-password",
};

class AuthAPI extends API {
  static async login(input?: UserLogin) {
    const { data } = await this.api.post(URL.AUTH, input);
    return data;
  }

  static async requestPasswordReset(input?: RequestPasswordResetInput) {
    const { data } = await this.api.post(URL.RESET_PASSWORD, input);
    return data;
  }

  static async changePassword(params?: UserAuth) {
    const { data } = await this.api.post(URL.CHANGE_PASSWORD, params);
    return data;
  }
}

export function useAuthLogin(options?: MutationOptions<UserLogin, UserAuth>) {
  const handler = useCallback(function (data: UserLogin) {
    return AuthAPI.login(data);
  }, []);

  return useMutation(handler, options);
}

export function useRequestPasswordReset(
  options?: MutationOptions<RequestPasswordResetInput, UserAuth>
) {
  const handler = useCallback(function (data: RequestPasswordResetInput) {
    return AuthAPI.requestPasswordReset(data);
  }, []);

  return useMutation(handler, options);
}

export function useUserChangePassword(
  options?: MutationOptions<UserChangePassword, UserAuth>
) {
  const handler = useCallback(function (data: UserChangePassword) {
    return AuthAPI.changePassword(data);
  }, []);

  return useMutation(handler, options);
}
