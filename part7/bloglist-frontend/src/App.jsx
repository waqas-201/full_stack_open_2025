import Home from "./components/Home";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Users from "./components/Users";
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";

const queryClient = new QueryClient();

const App = () => {
  const padding = {
    padding: 5,
  };
  return (
    <BrowserRouter>
      <div>
        <Link style={padding} to="/">
          home
        </Link>

        <Link style={padding} to="/users">
          users
        </Link>
      </div>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/users"
          element={
            <QueryClientProvider client={queryClient}>
              <Users />
            </QueryClientProvider>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
