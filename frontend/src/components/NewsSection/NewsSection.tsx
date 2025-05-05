import { Box, Button, Container, Typography } from "@mui/material";
import { useState } from "react";
import BLOGS from "../BlogCard/utils";
import BlogCard from "../BlogCard/BlogCard";

const NewsSection = () => {
  const [visibleBlogs, setVisibleBlogs] = useState(3);

  const handleLoadMore = () => {
    setVisibleBlogs((prev) => Math.min(prev + 6, BLOGS.length));
  };

  return (
    <Container sx={{display: "flex", flexDirection: "column", gap: 10, my: 12}}>
      <Box sx={{display: "flex", flexDirection: "column", textAlign: "center"}}>
        <Typography variant="h2" gutterBottom>
          What's new?
        </Typography>
        <Typography variant="body1" mx={8}>
          Stay ahead with expert-led courses, interactive lessons, and personalized resources to support your learning journey today.
        </Typography>
      </Box>

      <Box sx={{display: "flex", flexWrap: "wrap", gap: 4, justifyContent: "center"}}>
        {BLOGS.slice(0, visibleBlogs).map((blog) => (
            <BlogCard
              image={blog.image}
              category={blog.category}
              title={blog.title}
              date={blog.date}
              duration={blog.duration}
              key={blog.id}
            />
        ))}
      </Box>

      {visibleBlogs < BLOGS.length && (
          <Button
            variant="contained"
            onClick={handleLoadMore}
            size="large"
            sx={{alignSelf: "center"}}
          >
            Load more articles
          </Button>
      )}
    </Container>
  );
}

export default NewsSection;
