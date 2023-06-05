import { useCallback } from "react";
import { API } from "./base";
import { useMutation, useQuery } from "@tanstack/react-query";
import { MutationOptions, Paginated, QueryOptions } from "./api-types";
import { UserProfile, UserStatus } from "~/constants";

export type UserRole = "MASTER" | "ADMIN" | "USER";

type School = {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
};

export type User = {
  id: string;
  status: UserStatus;
  name: string;
  email: string;
  document: string;
  profile: UserProfile;
  role: UserRole;
  school: School;
  createdAt: string;
  updatedAt: string;
};

export type UserInput = Pick<User, "name" | "email" | "document" | "profile">;

type UserSearch = {
  "page-number"?: number;
  "page-size"?: number;
  name?: string;
  email?: string;
  document?: string;
  profile?: string;
};

const KEY = {
  ALL: "USER_ALL",
};

const URL = {
  ALL: "/user/all",
  CREATE: "/user",
  UPDATE: (id: string) => "/user/" + id,
};

class UserAPI extends API {
  static async getAll(params?: UserSearch) {
    const { data } = await this.api.get<Paginated<User>>(URL.ALL, {
      params,
    });
    return data;
  }

  static async create(input?: UserInput) {
    const { data } = await this.api.post<User>(URL.CREATE, input);
    return data;
  }

  static async update(userId: string, input?: Partial<UserInput>) {
    const { data } = await this.api.patch<User>(URL.UPDATE(userId), input);
    return data;
  }
}

export function useUserGetAll(
  options?: QueryOptions<Paginated<User>, [string]> & { search?: UserSearch }
) {
  const handler = useCallback(
    function () {
      return UserAPI.getAll(options?.search);
    },
    [options?.search]
  );

  return useQuery([KEY.ALL], handler, options);
}

export function useUserCreate(options?: MutationOptions<UserInput, User>) {
  const handler = useCallback(function (input: UserInput) {
    return UserAPI.create(input);
  }, []);

  return useMutation(handler, options);
}

export function useUserUpdate(
  options?: MutationOptions<{ input: UserInput; userId: string }, User>
) {
  const handler = useCallback(function (data: {
    userId: string;
    input: UserInput;
  }) {
    return UserAPI.update(data.userId, data.input);
  },
  []);

  return useMutation(handler, options);
}
