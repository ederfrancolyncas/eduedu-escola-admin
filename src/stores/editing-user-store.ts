import { create } from "zustand";
import { User } from "../api/user";

export const useEditingUser = create<User | null>(() => null);
