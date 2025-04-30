import React, { useState } from "react";
import { Box, Typography, Button, Container } from "@mui/material";
import BlogCard from "../components/BlogCard/BlogCard";
import BLOGS from "../components/BlogCard/utils";

const BlogPage: React.FC = () => {
  const [visibleBlogs, setVisibleBlogs] = useState(6);

  const handleLoadMore = () => {
    setVisibleBlogs((prev) => Math.min(prev + 6, BLOGS.length));
  };

  return (
    <Container
      maxWidth={false}
      sx={{
        maxWidth: '90%',
        margin: 'auto',
        display: "flex",
        flexDirection: "column",
        gap: 9
      }}
    >
      <Typography variant="h1" align="center">
        Blog
      </Typography>

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
};

export default BlogPage;
