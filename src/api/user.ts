import { useCallback } from "react";
import { API } from "./base";
import { useQuery } from "@tanstack/react-query";
import { Paginated, QueryOptions } from "./api-types";

export type UserStatus = "ACTIVE" | "INACTIVE";
export type UserRole = "MASTER" | "ADMIN" | "USER";

export type User = {
  accessToken: string | null;
  id: string;
  status: UserStatus;
  password: string;
  name: string;
  email: string;
  document: string;
  profile: string;
  role: UserRole;
  schoolId: string;
  created_at: Date;
  updated_at: Date;
};

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

class UserAPI extends API {
  static async getAll(params?: UserSearch) {
    const { data } = await this.api.get<Paginated<User>>("/users", {
      params,
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
