
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BASE_URL } from '../url';
import styled from 'styled-components';
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import Typography from '@mui/material/Typography';

const StyledRating = styled(Rating)({
  '& .MuiRating-iconFilled': {
    color: '#ff6d75',
  },
  '& .MuiRating-iconHover': {
    color: '#ff3d47',
  },
});

const List = styled.ul`
  list-style-type: none;
  padding: 0;
  margin: 0;
`;

const ListItem = styled.li`
  border-bottom: 1px solid #ddd;
  padding: 10px 0;
`;

// const UserName = styled.p`
//   font-weight: bold;
//   margin: 0;
// `;

const ReviewComment = styled.p`
  margin: 5px 0;
`;

const ReviewDate = styled.p`
  font-size: 0.9em;
  color: #888;
  margin: 5px 0 0;
`;

const ReviewList = ({ bookId }) => {
  const [reviews, setReviews] = useState([]);
console.log(bookId);
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/products/${bookId}`);
        setReviews(response.data);
      } catch (error) {
        console.error('Error fetching reviews:', error);
      }
    };

    fetchReviews();
  }, [bookId]);

  return (
    <div>
      <h2>Ratings & Reviews</h2>
      {reviews.length === 0 ? (
        <p>No reviews yet.</p>
      ) : (
        <List>
          {reviews.map((review) => (
            <ListItem key={review._id}>
              {/* <UserName>{review.userId}</UserName> */}
              <Box sx={{ '& > legend': { mt: 2 } }}>
                <Typography component="legend">Ratings:</Typography>
                <StyledRating
                  value={review.rating}
                  name="read-only"
                  readOnly
                  precision={0.5}
                  icon={<FavoriteIcon fontSize="inherit" />}
                  emptyIcon={<FavoriteBorderIcon fontSize="inherit" />}
                />
              </Box>
              <ReviewComment>{review.comment}</ReviewComment>
              <ReviewDate>{new Date(review.createdAt).toLocaleString()}</ReviewDate>
            </ListItem>
          ))}
        </List>
      )}
    </div>
  );
};

export default ReviewList;
