import { SchoolGrade, SchoolPeriod } from "~/api/school-class";

export const USER_PROFILE = {
  DIRECTOR: "Direção/Coordenação",
  TEACHER: "Professor",
} as const;

export type UserProfile = keyof typeof USER_PROFILE;

export const PROFILE_SELECT: {
  value: UserProfile;
  label: string;
}[] = [
  { value: "DIRECTOR", label: "Direção/Coordenação" },
  { value: "TEACHER", label: "Professor" },
];

export const USER_STATUS = {
  ACTIVE: "Ativo",
  INACTIVE: "Inativo",
};

export type UserStatus = keyof typeof USER_STATUS;

export const STATUS_SELECT: {
  value: UserStatus;
  label: string;
}[] = [
  { value: "ACTIVE", label: "Ativo" },
  { value: "INACTIVE", label: "Inativo" },
];

export const paginationOptions = [
  { value: "10", label: "10" },
  { value: "15", label: "15" },
  { value: "20", label: "20" },
];

export const monthsAbbreviation = [
  "Jan",
  "Fev",
  "Mar",
  "Abr",
  "Mai",
  "Jun",
  "Jul",
  "Ago",
  "Set",
  "Out",
  "Nov",
  "Dez",
];

export const schoolPeriod: {
  value: SchoolPeriod;
  label: string;
}[] = [
  {
    value: "MORNING",
    label: "Manhã",
  },
  {
    value: "AFTERNOON",
    label: "Tarde",
  },
  {
    value: "FULL",
    label: "Integral",
  },
];

export const SCHOOL_PERIOD: Record<SchoolPeriod, string> = {
  MORNING: "Manhã",
  AFTERNOON: "Tarde",
  FULL: "Integral",
};

export const schoolGrade: { value: SchoolGrade; label: string }[] = [
  {
    value: "CHILDREN",
    label: "Infantil",
  },
  {
    value: "FIRST_GRADE",
    label: "1º Ano Fundamental",
  },
  {
    value: "SECOND_GRADE",
    label: "2º Ano Fundamental",
  },
  {
    value: "THIRD_GRADE",
    label: "3º Ano Fundamental",
  },
];

export const SCHOOL_GRADE: Record<SchoolGrade, string> = {
  CHILDREN: "Infantil",
  FIRST_GRADE: "1º Ano Fundamental",
  SECOND_GRADE: "2º Ano Fundamental",
  THIRD_GRADE: "3º Ano Fundamental",
} as const;
