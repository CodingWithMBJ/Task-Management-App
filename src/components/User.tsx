import { useAuth } from "../context/AuthContext";

const User: React.FC = () => {
  const { user } = useAuth();

  if (!user) return null;

  return (
    <div className="user">
      <div className="profile">
        <img
          src={user.data.avatar}
          alt={user.data.first_name}
          className="avatar"
        />
        <h3 className="user-name">
          {user.data.first_name} {user.data.last_name}
        </h3>
      </div>
    </div>
  );
};

export default User;
