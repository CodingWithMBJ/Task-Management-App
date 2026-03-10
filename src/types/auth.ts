export type AuthUser = {
  name: string;
  email: string;
  picture: string;
  sub: string;
};

export type AuthContextType = {
  user: AuthUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: () => Promise<void> | void;
  signup: () => Promise<void> | void;
  logoutUser: () => void;
};
