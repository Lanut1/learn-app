import {
  Box,
  Typography,
  Card,
  CardMedia,
  CardContent,
  Chip,
} from "@mui/material";

interface BlogCardProps {
  image: string;
  category: string;
  title: string;
  date: string;
  duration: number;
}

const BlogCard: React.FC<BlogCardProps> = ({
  image,
  category,
  title,
  date,
  duration,
}) => {
  return (
    <Card
      sx={{
        borderRadius: 2,
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
        overflow: "hidden",
        transition: "transform 0.3s, box-shadow 0.3s",
        "&:hover": {
          transform: "translateY(-5px)",
          boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2)",
        },
        width: "30%",
      }}
    >
      <CardMedia
        component="img"
        height="250"
        image={image}
        alt={title}
        sx={{ objectFit: "cover" }}
      />
      <CardContent sx={{ padding: 2 }}>
        <Typography variant="body2" sx={{ color: "primary.main" }}>
          {category}
        </Typography>

        <Typography variant="h4" gutterBottom>
          {title}
        </Typography>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mt: 2,
          }}
        >
          <Typography variant="body2" color="textSecondary">
            {date}
          </Typography>
          <Chip
            label={`${duration} mins read`}
            size="small"
            sx={{ backgroundColor: "grey.100", fontSize: "0.8rem" }}
          />
        </Box>
      </CardContent>
    </Card>
  );
};

export default BlogCard;
