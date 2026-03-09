import type { Dispatch, FormEvent, SetStateAction } from "react";

export type ReqResUserData = {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  avatar: string;
};

export type ReqResUserResponse = {
  data: ReqResUserData;
};

export type AuthContextType = {
  user: ReqResUserResponse | null;
  email: string;
  password: string;
  token: string;
  setEmail: Dispatch<SetStateAction<string>>;
  setPassword: Dispatch<SetStateAction<string>>;
  handleLogin: (e: FormEvent<HTMLFormElement>) => Promise<void>;
  logoutUser: () => void;
};
