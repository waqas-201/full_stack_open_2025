import { useQuery } from "@tanstack/react-query";
import fetchSrevice from "../services/fetchSrevice";
import Notification from "./Notification";
import { useDispatch } from "react-redux";
import { setNotification } from "../features/notification/notification.slice";
import { Link } from "react-router-dom";

const UsersList = () => {
  const dispatch = useDispatch();
  const {
    data: users,
    isPending,
    error,
  } = useQuery({
    queryKey: ["all-users"],
    queryFn: fetchSrevice.getUsers,
  });
  console.log(users);

  if (isPending) {
    return <p> loading .....</p>;
  }

  if (error) {
    console.log(error);
    dispatch(setNotification(error.message));
    return <Notification type="failed" />;
  }

  return (
    <>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "15px",
          justifyItems: "center",
        }}
      >
        <h2>Users</h2>
        <h3>blogs created</h3>
      </div>
      {users.map((user) => {
        return (
          <>
            <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
              <Link to={`/user/${user.id}`}>{user.username}</Link>
              <span>{Object.keys(user.blogs).length}</span>
            </div>
          </>
        );
      })}
    </>
  );
};

export default UsersList;
