export default function Profile({ user }) {
    return (
      <div className="profile">
        <h2>Profile</h2>
        <p><strong>Username:</strong> {user.username}</p>
        <p><strong>Email:</strong> {user.email}</p>
      </div>
    );
  }
  