import { useDispatch, useSelector } from "react-redux";
import { removeUser } from "../features/notification/userSlice";
import UsersList from "./UsersList";

const Users = () => {
  const { user } = useSelector((state) => state.user);

  const dispatch = useDispatch();

  const handleLogout = () => {
    localStorage.setItem("loggedNoteappUser", "");
    dispatch(removeUser());
  };

  return (
    <>
      {user ? (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "2px",
          }}
        >
          <p>{user?.name} is logged in </p>
          <button onClick={handleLogout}>logout</button>
        </div>
      ) : null}
    </>
  );
};

export default Users;
