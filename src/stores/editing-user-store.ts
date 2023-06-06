import { create } from "zustand";
import { User } from "../api/user";
// import { useEffect } from "react";

export const useEditingUser = create<User | null>(() => null);
// export const useEditingUser = create<User | null>((set) => ({
//     editingUser: null,
//     clearEditingUser: () => set(() => ({ editingUser: null }))
// }));
