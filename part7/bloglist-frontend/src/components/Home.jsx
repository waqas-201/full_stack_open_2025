import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAndSetBlog } from "../features/notification/blogSlice";
import { removeUser, setUser } from "../features/notification/userSlice";
import fetchService from "../services/fetchSrevice";
import {
  removeNotification,
  setNotification,
} from "../features/notification/notification.slice";
import Notification from "./Notification";
import CreateBlog from "./CreateBlog";

const Home = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  // blog state

  const [type, setType] = useState("");
  const blogs = useSelector((state) => state.blog.blog);
  const { user } = useSelector((state) => state);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAndSetBlog());
  }, [dispatch]);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedNoteappUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      dispatch(setUser(user));
      fetchService.setToken(user.token);
    }
  }, [dispatch]);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const user = await fetchService.loginUser({ username, password });
      window.localStorage.setItem("loggedNoteappUser", JSON.stringify(user));
      fetchService.setToken(user.token);

      dispatch(setUser(user));

      dispatch(setNotification("user logged in succcessfully"));
      setTimeout(() => {
        dispatch(removeNotification());
      }, 3000);
      setType("success");

      setUsername("");
      setPassword("");
    } catch (error) {
      dispatch(setNotification(error?.response?.data?.error || error?.message));
      setType("failed");
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };
  return (
    <div>
      {errorMessage ? <p style={{ color: "red" }}>{errorMessage}</p> : null}
      {<Notification type={type} />}

      {user.user ? (
        <>
          <p> username {user.user?.username}</p>
          <button
            onClick={() => {
              localStorage.setItem("loggedNoteappUser", "");

              dispatch(removeUser());
            }}
          >
            logout
          </button>
        </>
      ) : null}

      {!user.user ? (
        <form onSubmit={(e) => handleLogin(e)}>
          <div>
            username
            <input
              type="text"
              value={username}
              name="Username"
              onChange={({ target }) => setUsername(target.value)}
            />
          </div>
          <div>
            password
            <input
              type="password"
              value={password}
              name="Password"
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>
          <button type="submit">login</button>
        </form>
      ) : (
        <CreateBlog blogs={blogs} setType={setType} />
      )}
    </div>
  );
};

export default Home;
