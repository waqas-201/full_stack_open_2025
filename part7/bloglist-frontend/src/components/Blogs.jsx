import { Link } from "react-router-dom";

const Blogs = ({ blog }) => {
  return (
    <div>
      <Link to={`/blog/${blog.id}`} className="title">
        {blog.title}
      </Link>
    </div>
  );
};

export default Blogs;
