import { useAuth } from "../context/AuthContext";

const Login: React.FC = () => {
  const { handleLogin, email, setEmail, password, setPassword } = useAuth();

  return (
    <form onSubmit={handleLogin} className="login-form">
      <h2>Log In</h2>
      <div className="login-container">
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="password">Password: </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
      </div>
      <button type="submit" className="login-btn">
        Login
      </button>
    </form>
  );
};

export default Login;
