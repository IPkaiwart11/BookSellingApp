
// ReviewForm.js
import * as React from 'react';
import styled from 'styled-components';
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import Typography from '@mui/material/Typography';
import { useState } from 'react';
import axios from 'axios';
import { BASE_URL } from '../url';
import { useSelector } from 'react-redux';

const StyledRating = styled(Rating)({
  '& .MuiRating-iconFilled': {
    color: '#ff6d75',
  },
  '& .MuiRating-iconHover': {
    color: '#ff3d47',
  },
});

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const Label = styled.label`
  display: block;
  font-weight: bold;
`;

const Textarea = styled.textarea`
  width: 100%;
  height: 100px;
  padding: 0.5rem;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const Button = styled.button`
  padding: 0.75rem 1.5rem;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;

const ReviewForm = ({ bookId }) => {
  const userId = useSelector((state) => state.user.currentUser._id);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${BASE_URL}/products/${bookId}`, { userId, rating, comment });
      console.log('Review submitted:', response.data);
    } catch (error) {
      console.error('Error submitting review:', error);
    }
  };

  return (
    <>
      <h2>Rate Product</h2>
      <Form onSubmit={handleSubmit}>
        <Box sx={{ '& > legend': { mt: 2 } }}>
          <Typography component="legend">Rate</Typography>
          <StyledRating
            value={rating}
            onChange={(e) => setRating(parseFloat(e.target.value))}
            name="customized-color"
            defaultValue={2}
            getLabelText={(value) => `${value} Heart${value !== 1 ? 's' : ''}`}
            precision={0.5}
            icon={<FavoriteIcon fontSize="inherit" />}
            emptyIcon={<FavoriteBorderIcon fontSize="inherit" />}
          />
        </Box>
        <Label>
          Comment:
          <Textarea value={comment} onChange={(e) => setComment(e.target.value)} required />
        </Label>
        <Button type="submit">Submit Review</Button>
      </Form>
    </>
  );
};

export default ReviewForm;
