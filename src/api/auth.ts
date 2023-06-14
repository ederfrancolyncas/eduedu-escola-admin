import { useCallback } from "react";
import { API } from "./base";
import { useMutation } from "@tanstack/react-query";
import { MutationOptions } from "./api-types";

export type UserLogin = Pick<UserAuth, "email" | "password">;
export type UserRecoveryPass = Pick<UserAuth, "email">;
export type UserChangePassword = Pick<UserAuth, "token" | "password" | "passwordConfirmation">;

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
  static async authUser(params?: UserLogin) {
    const { data } = await this.api.post(URL.AUTH, {
      params,
    });
    return data;
  }

  static async recoveryPassword(input?: UserAuth) {
    const { data } = await this.api.post(URL.RESET_PASSWORD, {
      input,
    });
    return data;
  }

  static async changePassword(params?: UserAuth) {
    const { data } = await this.api.post(URL.CHANGE_PASSWORD, {
      params,
    });
    return data;
  }
}

export function useUserAuth(
  options?: MutationOptions<{ input: UserLogin }, UserAuth>
) {
  const handler = useCallback(function (data: {
    input: UserLogin;
  }) {

    return AuthAPI.authUser(data.input);
  },
    []);

  return useMutation(handler, options);
}

export function useUserPasswordRecovery(
  options?: MutationOptions<{ input: UserRecoveryPass }, UserAuth>
) {
  const handler = useCallback(function (data: {
    input: UserRecoveryPass;
  }) {

    return AuthAPI.recoveryPassword(data.input);
  },
    []);

  return useMutation(handler, options);
}

export function useUserChangePassword(
  options?: MutationOptions<{ input: UserChangePassword }, UserAuth>
) {
  const handler = useCallback(function (data: {
    input: UserChangePassword;
  }) {

    return AuthAPI.changePassword(data.input);
  },
    []);

  return useMutation(handler, options);
}