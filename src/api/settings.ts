import { useCallback } from "react";
import { API } from "./base";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { MutationOptions, QueryOptions } from "./api-types";

type Settings = {
  id: string;
  schoolName?: string;
  synchronizationPlanets: boolean;
  smtpHostName: string;
  smtpUserName: string;
  smtpPassword: string;
  sslIsActive: boolean;
  schoolId: string;
  createdAt: string;
  updatedAt: string;
};

export type SettingsUpdateInput = Omit<
  Settings,
  "id" | "createdAt" | "updatedAt" | "schoolId"
>;

const URL = {
  BASE: "system-configuration",
};

const KEY = {
  BASE: "SYSTEM_CONFIGURATION",
};

class SettingsAPI extends API {
  static async get() {
    const { data } = await this.api.get<Settings>(URL.BASE);
    return data;
  }

  static async update(input: SettingsUpdateInput) {
    const { data } = await this.api.put<Settings>(URL.BASE, input);

    return data;
  }
}

export function useSettingsGet(
  options?: QueryOptions<Settings, [typeof KEY.BASE]>
) {
  const handler = useCallback(function () {
    return SettingsAPI.get();
  }, []);

  return useQuery([KEY.BASE], handler, options);
}

export function useSettingsUpdate(
  options?: MutationOptions<SettingsUpdateInput, Settings>
) {
  const queryClient = useQueryClient();

  const handler = useCallback(function (input: SettingsUpdateInput) {
    return SettingsAPI.update(input);
  }, []);

  return useMutation(handler, {
    ...options,
    onSuccess: (data, vars, ctx) => {
      queryClient.setQueryData([KEY.BASE], data);
      options?.onSuccess?.(data, vars, ctx);
    },
  });
}
