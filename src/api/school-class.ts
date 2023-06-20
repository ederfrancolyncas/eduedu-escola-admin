import { useCallback } from "react";
import { API } from "./base";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { MutationOptions, Paginated, QueryOptions } from "./api-types";

type SchoolClass = {
  id: string;
  schoolGrade: string;
  schoolPeriod: string;
  schoolYearId: string;
  teacherIds: any;
};

export type SchoolClassInput = Pick<SchoolClass, "schoolGrade" | "schoolPeriod" | "schoolYearId" | "teacherIds">;

type SchoolClassSearch = {
  "page-number"?: number;
  "page-size"?: number;
  schoolGrade?: string;
  schoolPeriod?: string;
  schoolYearId?: string;
  teacherIds?: any;
};

const KEY = {
  ALL: "SCHOOL_CLASS_ALL",
};

const URL = {
  ALL: "/schoolClass/all",
  CREATE: "/schoolClass",
  DELETE: "/schoolClass",
  GET: (id: string) => `/schoolClass/${id}`,
  UPDATE: (id: string) => `/schoolClass/${id}`,
};

class SchoolClassAPI extends API {
  static async getAll(params?: SchoolClassSearch) {
    const { data } = await this.api.get<Paginated<SchoolClass>>(URL.ALL, {
      params,
    });
    return data;
  }

  static async create(input?: SchoolClassInput) {
    const { data } = await this.api.post<SchoolClass>(URL.CREATE, input);
    return data;
  }

  static async delete(schoolClassId: string[]) {
    const { data } = await this.api.delete<{ success: boolean }>(URL.DELETE, {
      data: { ids: schoolClassId },
    });

    return data;
  }

  static async get(schoolClassId: string) {
    const { data } = await this.api.patch<SchoolClass>(URL.GET(schoolClassId));
    return data;
  }

  static async update(schoolClassId: string, input?: Partial<SchoolClassInput>) {
    const { data } = await this.api.patch<SchoolClass>(URL.UPDATE(schoolClassId), input);
    return data;
  }
}

export function useSchoolClassGetAll(
  options?: QueryOptions<Paginated<SchoolClass>, [string, SchoolClassSearch | undefined]> & { search?: SchoolClassSearch }
) {
  const handler = useCallback(
    function () {
      return SchoolClassAPI.getAll(options?.search);
    },
    [options?.search]
  );

  return useQuery([KEY.ALL, options?.search], handler, options);
}

export function useSchoolClassCreate(options?: MutationOptions<SchoolClassInput, SchoolClass>) {
  const handler = useCallback(function (input: SchoolClassInput) {
    return SchoolClassAPI.create(input);
  }, []);

  return useMutation(handler, options);
}

export function useSchoolClassDelete(
  options?: MutationOptions<string[], { success: boolean }>
) {
  const queryClient = useQueryClient();

  const handler = useCallback(function (ids: string[]) {
    return SchoolClassAPI.delete(ids);
  }, []);

  return useMutation(handler, {
    ...options,
    onSuccess: async (data, vars, ctx) => {
      await queryClient.invalidateQueries([KEY.ALL]);
      options?.onSuccess?.(data, vars, ctx);
    },
  });
}

export function useGetSchoolClass(
  options?: MutationOptions<string, { id: string }>
) {
  const queryClient = useQueryClient();

  const handler = useCallback(function (id: string) {
    return SchoolClassAPI.get(id);
  }, []);

  return useMutation(handler, options)
}

export function useSchoolClassUpdate(
  options?: MutationOptions<{ input: SchoolClassInput; schoolClassId: string }, SchoolClass>
) {
  const handler = useCallback(function (data: {
    schoolClassId: string;
    input: SchoolClassInput;
  }) {
    return SchoolClassAPI.update(data.schoolClassId, data.input);
  },
    []);

  return useMutation(handler, options);
}