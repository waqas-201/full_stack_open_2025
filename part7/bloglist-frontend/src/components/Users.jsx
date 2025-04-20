import { useDispatch, useSelector } from "react-redux";
import { removeUser } from "../features/notification/userSlice";
import { Button } from "./ui/Button";

const Users = () => {
  const { user } = useSelector((state) => state.user);

  const dispatch = useDispatch();

  const handleLogout = () => {
    console.log("handle click triggerd ");

    localStorage.setItem("loggedNoteappUser", "");
    dispatch(removeUser());
  };

  return (
    <div>
      {user ? (
        <div className="flex items-center justify-between gap-4">
          <p>{user?.name} is logged in </p>
          <Button onClick={handleLogout}>logout</Button>
        </div>
      ) : null}
    </div>
  );
};

export default Users;
