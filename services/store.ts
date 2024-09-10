import { create } from "zustand";

type AuthState = {
	accessToken: string;
	setAccessToken: (token: string) => void;
}

const useStore = create<AuthState>((set) => ({
	accessToken: "",
	setAccessToken: (token: string) => set({ accessToken: token }),
}))

export default useStore;
