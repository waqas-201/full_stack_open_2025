import { useState, useEffect } from "react";
import blogService from "./services/blogs";
import Notification from "./components/Notification";
import CreateBlog from "./components/CreateBlog";
import { useDispatch, useSelector } from "react-redux";
import {
  removeNotification,
  setNotification,
} from "./features/notification/notification.slice";
import { fetchAndSetBlog } from "./features/notification/blogSlice";
import { removeUser, setUser } from "./features/notification/userSlice";

const App = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  // blog state

  const [type, setType] = useState("");
  const blogs = useSelector((state) => state.blog.blog);
  const { user } = useSelector((state) => state);
  console.log(user);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAndSetBlog());
  }, [dispatch]);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedNoteappUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      dispatch(setUser(user));
      blogService.setToken(user.token);
    }
  }, [dispatch]);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const user = await blogService.login({ username, password });
      window.localStorage.setItem("loggedNoteappUser", JSON.stringify(user));
      blogService.setToken(user.token);

      dispatch(setUser(user));

      dispatch(setNotification("user logged in succcessfully"));
      setTimeout(() => {
        dispatch(removeNotification());
      }, 3000);
      setType("success");

      setUsername("");
      setPassword("");
    } catch (error) {
      dispatch(setNotification(error.response.data.error || error.message));
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
          <p> username {user?.username}</p>
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

export default App;
