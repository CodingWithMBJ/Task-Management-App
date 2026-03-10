import { useAuth0 } from "@auth0/auth0-react";
// import { useAuth } from "../context/auth-context";

const Login: React.FC = () => {
  const { loginWithRedirect } = useAuth0();

  // if (isLoading) return <p>Loading...</p>;

  return (
    <section className="login-form">
      <h2>Please Log In</h2>

      <div className="login-container">
        <button
          type="button"
          className="login-btn"
          onClick={() => loginWithRedirect()}
        >
          Login
        </button>

        <button
          type="button"
          className="login-btn"
          onClick={() =>
            loginWithRedirect({
              screen_hint: "signup",
            })
          }
        >
          Sign Up
        </button>

        {/* <button type="button" className="login-btn" onClick={signup}>
          Create Account
        </button> */}
      </div>
    </section>
  );
};

export default Login;
