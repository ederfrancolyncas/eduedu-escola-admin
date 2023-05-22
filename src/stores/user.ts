import { create } from "zustand";
import { persist } from "zustand/middleware";
import { User } from "../api/user";

type UserStore = User & {
    isUserAuthenticated: () => boolean;
};

export const useUserStore = create<UserStore>()(
    persist(
        (set, get) => ({
            accessToken: null,
            isUserAuthenticated: () => Boolean(get().accessToken),
        }),
        {
            name: "user_state",
        }
    )
);