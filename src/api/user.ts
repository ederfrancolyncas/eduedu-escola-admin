import { useCallback } from "react";
import { API } from "./base";
import { useQuery } from "@tanstack/react-query";

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

class UserAPI extends API {
  static async getAll() {
    const { data } = await this.api.get<User[]>("/users");
    return data;
  }
}

export function useUserGetAll() {
  const handler = useCallback(function () {
    return UserAPI.getAll();
  }, []);

  return useQuery(["USER_ALL"], handler, {});
}
