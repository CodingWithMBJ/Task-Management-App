import { useAuth0 } from "@auth0/auth0-react";
// import { useAuth } from "../context/auth-context";

const User: React.FC = () => {
  // const { user, isAuthenticated } = useAuth();

  // if (!isAuthenticated || !user) return null;

  const { user, isAuthenticated, isLoading } = useAuth0();

  if (isLoading) {
    return <div className="loading-text">Loading Profile...</div>;
  }

  return isAuthenticated && user ? (
    <div className="user">
      <div className="profile">
        {user.picture && (
          <img src={user.picture} alt={user.name} className="avatar" />
        )}
        <h3 className="user-name">{user.name}</h3>
        {user.email && (
          <p className="user-email">
            <a href={`mailto:${user.email}`}>{user.email}</a>
          </p>
        )}
      </div>
    </div>
  ) : null;
};

export default User;
