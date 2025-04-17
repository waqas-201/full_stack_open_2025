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
      <h1>Blogs </h1>
      <>
        {user ? (
          <>
            <p>{user?.name} is logged in </p>
            <button onClick={handleLogout}>logout</button>
            <UsersList />
          </>
        ) : null}
      </>
    </>
  );
};

export default Users;
