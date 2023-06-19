import { useCallback } from "react";
import { API } from "./base";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
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
  UPDATE: (id: string) => `/user/${id}`,
  UPDATE_ACCESS_KEY: (id: string) => `/user/${id}/access-key`,
  GET_ACCESS_KEY: (id: string) => `/user/${id}/access-key`,
  DELETE: "/user",
  INACTIVATE: "/user/inactivate",
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

  static async updateAccessKey(id: string) {
    const { data } = await this.api.put<{ success: boolean }>(URL.UPDATE_ACCESS_KEY(id))
    return data
  }

  static async getAccessKey(id: string) {
    const { data } = await this.api.get<{ accessKey: string }>(URL.GET_ACCESS_KEY(id))
    return data
  }

  static async inactivate(userIds: string[]) {
    const { data } = await this.api.post<{ success: boolean }>(URL.INACTIVATE, {
      ids: userIds,
    });
    return data;
  }

  static async delete(userIds: string[]) {
    const { data } = await this.api.delete<{ success: boolean }>(URL.DELETE, {
      data: { ids: userIds },
    });

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

export function useGetAccessKey(
  options?: MutationOptions<string, { accessKey: string }>
) {
  const queryClient = useQueryClient();

  const handler = useCallback(function (id: string) {
    return UserAPI.getAccessKey(id);
  }, []);

  return useMutation(handler, options)
}

export function useUpdateAccessKey(
  options?: MutationOptions<string, { accessKey: string }>
) {
  const queryClient = useQueryClient();

  const handler = useCallback(function (id: string) {
    return UserAPI.updateAccessKey(id);
  }, []);

  return useMutation(handler, options)
}

export function useUserDelete(
  options?: MutationOptions<string[], { success: boolean }>
) {
  const queryClient = useQueryClient();

  const handler = useCallback(function (ids: string[]) {
    return UserAPI.delete(ids);
  }, []);

  return useMutation(handler, {
    ...options,
    onSuccess: async (data, vars, ctx) => {
      await queryClient.invalidateQueries([KEY.ALL]);
      options?.onSuccess?.(data, vars, ctx);
    },
  });
}

export function useUserInactivate(
  options?: MutationOptions<string[], { success: boolean }>
) {
  const queryClient = useQueryClient();

  const handler = useCallback(function (ids: string[]) {
    return UserAPI.inactivate(ids);
  }, []);

  return useMutation(handler, {
    ...options,
    onSuccess: async (data, vars, ctx) => {
      await queryClient.invalidateQueries([KEY.ALL]);
      options?.onSuccess?.(data, vars, ctx);
    },
  });
}
