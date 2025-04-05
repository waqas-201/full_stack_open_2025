import { useState, useEffect } from "react";
import blogService from "./services/blogs";
import Notification from "./components/Notification";
import CreateBlog from "./components/CreateBlog";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  const [user, setUser] = useState(null);
  // blog state

  const [showNotification, setShowNotification] = useState(false);
  const [message, setMessage] = useState("");
  const [type, setType] = useState("");

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, [user]);

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

      setShowNotification(true);
      setMessage("user logged in succcessfully");
      setType("success");
      // Hide notification after 3 seconds
      setTimeout(() => {
        setShowNotification(false);
      }, 3000);
      setUsername("");
      setPassword("");
    } catch (error) {
      setShowNotification(true);
      setTimeout(() => {
        setShowNotification(false);
      }, 3000);
      setMessage(error.response.data.error || error.message);
      setType("failed");
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };

  return (
    <div>
      {errorMessage ? <p style={{ color: "red" }}>{errorMessage}</p> : null}
      {showNotification && <Notification message={message} type={type} />}

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
          blogs={blogs}
          setBlogs={setBlogs}
          setShowNotification={setShowNotification}
          setMessage={setMessage}
          setType={setType}
        />
      )}
    </div>
  );
};

export default App;
