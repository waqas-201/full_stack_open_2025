import Home from "./components/Home";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Users from "./components/Users";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import UsersList from "./components/UsersList";
import SingleUser from "./components/SingleUser";
import BlogPost from "./components/BlogPost";
import { Button } from "./components/ui/Button";

const queryClient = new QueryClient();

const App = () => {
  const padding = {
    padding: 5,
  };
  return (
    <BrowserRouter>
      <div className="bg-cyan-500 flex justify-between items-center p-4">
        <div className="pl-10">
          <Link style={padding} to="/">
            <Button>home</Button>
          </Link>

          <Link style={padding} to="/users">
            <Button>users</Button>
          </Link>
        </div>
        <div className="pr-10">
          <Users />
        </div>
      </div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/users"
          element={
            <QueryClientProvider client={queryClient}>
              <UsersList />
            </QueryClientProvider>
          }
        />

        <Route
          path="user/:id"
          element={
            <QueryClientProvider client={queryClient}>
              <SingleUser />
            </QueryClientProvider>
          }
        />

        <Route
          path="/blog/:id"
          element={
            <QueryClientProvider client={queryClient}>
              <BlogPost />
            </QueryClientProvider>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
