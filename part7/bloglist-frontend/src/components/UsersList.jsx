import { useQuery } from "@tanstack/react-query";
import fetchSrevice from "../services/fetchSrevice";
import Notification from "./Notification";
import { useDispatch } from "react-redux";
import { setNotification } from "../features/notification/notification.slice";
import H2 from "./ui/H2";
import H3 from "./ui/H3";
import StyledLink from "./ui/Link";

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
        <H2>Users</H2>
        <H3>blogs created</H3>
      </div>
      {users?.map((user) => {
        return (
          <>
            <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
              <StyledLink href={`/user/${user.id}`}>{user.username}</StyledLink>

              {user ? <span>{Object.keys(user?.blogs).length}</span> : null}
            </div>
          </>
        );
      })}
    </>
  );
};

export default UsersList;
