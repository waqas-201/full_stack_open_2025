/* eslint-disable react/prop-types */
import { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useParams,
  useNavigate,
} from "react-router-dom";
import useField from "./hooks/useField";

const Menu = () => {
  const padding = {
    paddingRight: 5,
  };
  return (
    <div>
      <a href="#" style={padding}>
        anecdotes
      </a>
      <a href="#" style={padding}>
        create new
      </a>
      <a href="#" style={padding}>
        about
      </a>
    </div>
  );
};

const AnecdoteList = ({ anecdotes, notification }) => (
  <div>
    <h2>Anecdotes</h2>
    <Notification message={notification} />
    <ul>
      {anecdotes?.map((anecdote) => (
        <li key={anecdote.id}>
          <Link to={`/anecdote/${anecdote.id}`}>{anecdote.content}</Link>
        </li>
      ))}
    </ul>
  </div>
);

const About = () => (
  <div>
    <h2>About anecdote app</h2>
    <p>According to Wikipedia:</p>

    <em>
      An anecdote is a brief, revealing account of an individual person or an
      incident. Occasionally humorous, anecdotes differ from jokes because their
      primary purpose is not simply to provoke laughter but to reveal a truth
      more general than the brief tale itself, such as to characterize a person
      by delineating a specific quirk or trait, to communicate an abstract idea
      about a person, place, or thing through the concrete details of a short
      narrative. An anecdote is &quot;a story with a point.&quot;
    </em>

    <p>
      Software engineering is full of excellent anecdotes, at this app you can
      find the best and add more.
    </p>
  </div>
);

const Footer = () => (
  <div>
    Anecdote app for <a href="https://fullstackopen.com/">Full Stack Open</a>.
    See{" "}
    <a href="https://github.com/fullstack-hy2020/routed-anecdotes/blob/master/src/App.js">
      https://github.com/fullstack-hy2020/routed-anecdotes/blob/master/src/App.js
    </a>{" "}
    for the source code.
  </div>
);

const Notification = ({ message }) => {
  if (!message) return null;
  return <>{message}</>;
};
const CreateNew = ({ addNew }) => {
  const author = useField();
  const info = useField();
  const navigate = useNavigate();
  const content = useField();

  const handleSubmit = (e) => {
    e.preventDefault();
    addNew({
      content: content.value,
      author: author.value,
      info: info.value,
      votes: 0,
    });

    navigate("/");
  };

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          content
          <input
            name="content"
            value={content.value}
            onChange={content.onChange}
          />
        </div>
        <div>
          author
          <input
            name="author"
            value={author.value}
            onChange={author.onChange}
          />
        </div>
        <div>
          url for more info
          <input name="info" value={info.value} onChange={info.onChange} />
        </div>
        <button>create</button>
      </form>
    </div>
  );
};

const SingleAnecdote = ({ allAnecdotes }) => {
  const { id } = useParams();
  const anecdote = allAnecdotes?.find((anc) => anc.id === Number(id));

  return (
    <>
      <h4>
        {anecdote.content} by{anecdote.author}
      </h4>
      <p>has {anecdote.votes} votes</p>
      <p>
        for more info see<a href={`${anecdote.info}`}> {anecdote.info}</a>
      </p>
    </>
  );
};

const App = () => {
  const [anecdotes, setAnecdotes] = useState([
    {
      content: "If it hurts, do it more often",
      author: "Jez Humble",
      info: "https://martinfowler.com/bliki/FrequencyReducesDifficulty.html",
      votes: 0,
      id: 1,
    },
    {
      content: "Premature optimization is the root of all evil",
      author: "Donald Knuth",
      info: "http://wiki.c2.com/?PrematureOptimization",
      votes: 0,
      id: 2,
    },
  ]);

  const [notification, setNotification] = useState("");

  const addNew = (anecdote) => {
    anecdote.id = Math.round(Math.random() * 10000);
    setAnecdotes(anecdotes.concat(anecdote));
    setNotification(`A new anecdote "${anecdote.content}" created!`);
    setTimeout(() => {
      setNotification("");
    }, 5000);
  };

  const anecdoteById = (id) => anecdotes.find((a) => a.id === id);

  const vote = (id) => {
    const anecdote = anecdoteById(id);

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1,
    };

    setAnecdotes(anecdotes.map((a) => (a.id === id ? voted : a)));
  };
  const padding = {
    padding: 5,
  };
  return (
    <div>
      <h1>Software anecdotes</h1>
      <Router>
        <div>
          <Link style={padding} to="/">
            home
          </Link>
          <Link style={padding} to="/create">
            create
          </Link>
        </div>

        <Routes>
          <Route path="/create" element={<CreateNew addNew={addNew} />} />
          <Route
            path="/"
            element={
              <AnecdoteList anecdotes={anecdotes} notification={notification} />
            }
          />
          <Route
            path="/anecdote/:id"
            element={<SingleAnecdote allAnecdotes={anecdotes} />}
          />
        </Routes>

        <div>
          <i>Note app, Department of Computer Science 2024</i>
        </div>
      </Router>
    </div>
  );
};

export default App;
