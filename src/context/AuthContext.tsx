import axios from "axios";
import {
  createContext,
  useContext,
  useEffect,
  useState,
  type FormEvent,
  type ReactNode,
} from "react";
import type { AuthContextType, ReqResUserResponse } from "../types/auth";

type CollectionUserRecord = {
  id: string;
  data: {
    name: string;
    email: string;
    password: string;
    role?: string;
  };
  createdAt?: string;
  updatedAt?: string;
};

type CollectionListResponse = {
  data: CollectionUserRecord[];
};

type SingleCollectionResponse = {
  data: CollectionUserRecord;
};

const AuthContext = createContext<AuthContextType | null>(null);

type AuthProviderProps = {
  children: ReactNode;
};

const USERS_ENDPOINT = "https://reqres.in/api/collections/users/records";

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<ReqResUserResponse | null>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState(
    sessionStorage.getItem("jwtToken_key") || "",
  );

  const apiKey = import.meta.env.VITE_REQRES_API_KEY;

  const mapRecordToUser = (
    record: CollectionUserRecord,
  ): ReqResUserResponse => {
    const fullName = record.data.name?.trim() || "Unknown User";
    const nameParts = fullName.split(" ").filter(Boolean);
    const firstName = nameParts[0] || "Unknown";
    const lastName = nameParts.slice(1).join(" ") || "";

    return {
      data: {
        id: Number(record.id) || 1,
        email: record.data.email,
        first_name: firstName,
        last_name: lastName,
        avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(fullName)}`,
      },
    };
  };

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!email.trim() || !password.trim()) {
      console.error("Email and password are required");
      return;
    }

    if (!apiKey) {
      console.error("Missing VITE_REQRES_API_KEY");
      return;
    }

    try {
      const response = await axios.get<CollectionListResponse>(USERS_ENDPOINT, {
        headers: {
          "x-api-key": apiKey,
        },
      });

      const foundUser = response.data.data.find(
        (record) =>
          record.data.email === email.trim() &&
          record.data.password === password.trim(),
      );

      if (!foundUser) {
        console.error("Invalid email or password");
        return;
      }

      const sessionToken = crypto.randomUUID();

      sessionStorage.setItem("jwtToken_key", sessionToken);
      sessionStorage.setItem("current_user_id", foundUser.id);

      setToken(sessionToken);
      setUser(mapRecordToUser(foundUser));
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error(
          "Login failed:",
          error.response?.status,
          error.response?.data,
        );
      } else {
        console.error("Login failed:", error);
      }
    }
  };

  const logoutUser = () => {
    sessionStorage.removeItem("jwtToken_key");
    sessionStorage.removeItem("current_user_id");
    setToken("");
    setUser(null);
  };

  useEffect(() => {
    const restoreUser = async () => {
      if (!token || !apiKey) {
        setUser(null);
        return;
      }

      const currentUserId = sessionStorage.getItem("current_user_id");

      if (!currentUserId) {
        setUser(null);
        return;
      }

      try {
        const response = await axios.get<SingleCollectionResponse>(
          `${USERS_ENDPOINT}/${currentUserId}`,
          {
            headers: {
              "x-api-key": apiKey,
            },
          },
        );

        setUser(mapRecordToUser(response.data.data));
      } catch (error) {
        if (axios.isAxiosError(error)) {
          console.error(
            "Error restoring user:",
            error.response?.status,
            error.response?.data,
          );
        } else {
          console.error("Error restoring user:", error);
        }

        sessionStorage.removeItem("jwtToken_key");
        sessionStorage.removeItem("current_user_id");
        setToken("");
        setUser(null);
      }
    };

    restoreUser();
  }, [token, apiKey]);

  const value: AuthContextType = {
    user,
    email,
    password,
    token,
    setEmail,
    setPassword,
    handleLogin,
    logoutUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
};
