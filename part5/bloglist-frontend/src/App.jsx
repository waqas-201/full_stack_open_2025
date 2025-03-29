import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import Notification from "./components/Notification";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  const [user, setUser] = useState(null);
  // blog state
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [likes, setLikes] = useState(0);
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
       setErrorMessage(error.response.data.error);
       setShowNotification(true);

       setTimeout(() => {
         setShowNotification(false);
       }, 3000);
       setMessage(error.response.data.error);
       setType("failed");
       setTimeout(() => {
         setErrorMessage(null);
       }, 5000);
     }
   };

   const handleCreateBlog = async (e) => {
     e.preventDefault();
     try {
       const responce = await blogService.create({ title, author, likes });
       console.log(responce);
       setBlogs(blogs.concat(responce));
       setShowNotification(true);
       setTimeout(() => {
         setShowNotification(false);
       }, 3000);

       setMessage(`blog post with title ${responce.title} just  added`);
       setType("success");
     } catch (error) {
       setShowNotification(true);
       setTimeout(() => {
         setShowNotification(false);
       }, 3000);

       setMessage(error.response.data.error);
       setType("failed");
       console.log(error);
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
         <>
           <h2>Blogs</h2>
           {blogs.map((blog) => (
             <Blog key={blog.id} blog={blog} />
           ))}

           <h1>create New </h1>
           <form onSubmit={(e) => handleCreateBlog(e)}>
             <div>
               title
               <input
                 type="text"
                 value={title}
                 name="title"
                 onChange={(e) => setTitle(e.target.value)}
               />
             </div>
             <div>
               author
               <input
                 type="text"
                 value={author}
                 name="author"
                 onChange={(e) => setAuthor(e.target.value)}
               />
             </div>
             <div>
               likes
               <input
                 type="number"
                 value={likes}
                 name="likes"
                 onChange={(e) => setLikes(e.target.value)}
               />
             </div>
             <button type="submit">create</button>
           </form>
         </>
       )}
     </div>
   );
};

export default App;
