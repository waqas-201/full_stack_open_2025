import StyledLink from "./ui/Link";

const Blogs = ({ blog }) => {
  return (
    <div>
      <StyledLink href={`/blog/${blog.id}`} className="title">
        {blog.title}
      </StyledLink>
    </div>
  );
};

export default Blogs;
