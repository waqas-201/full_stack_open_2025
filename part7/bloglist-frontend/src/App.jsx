import { useState, useEffect } from "react";
import blogService from "./services/blogs";
import Notification from "./components/Notification";
import CreateBlog from "./components/CreateBlog";
import { useDispatch } from "react-redux";
import {
  removeNotification,
  setNotification,
} from "./features/notification/notification.slice";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  const [user, setUser] = useState(null);
  // blog state

  const [type, setType] = useState("");
  const [isLikeAdded, setIsLikeAdded] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, [user, isLikeAdded]);
  // when our app components mounts first time it'll add toke to local storage and also with request headers
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedNoteappUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const user = await blogService.login({ username, password });
      window.localStorage.setItem("loggedNoteappUser", JSON.stringify(user));
      blogService.setToken(user.token);

      setUser(user);

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

      {user ? (
        <>
          <p> username {user?.username}</p>
          <button
            onClick={() => {
              localStorage.setItem("loggedNoteappUser", "");
              setUser(null);
            }}
          >
            logout
          </button>
        </>
      ) : null}

      {!user ? (
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
        <CreateBlog
          setIsLikeAdded={setIsLikeAdded}
          blogs={blogs}
          setBlogs={setBlogs}
          setType={setType}
        />
      )}
    </div>
  );
};

export default App;
