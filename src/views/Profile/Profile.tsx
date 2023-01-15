import { Avatar, Box, Card, CardContent, Typography } from '@mui/material';
import React from 'react';
import { useSelector } from 'react-redux';
import { selectUser } from '../../redux/auth/authSelectors';
import { getColorFromName } from '../../utils/getColorFromName';
import { getFirstTwoLetters } from '../../utils/getFirstTwoLetters';

const Profile: React.FC = () => {
  const { name, email } = useSelector(selectUser);
  return (
    <Card elevation={4} sx={{ borderRadius: 2, m: { sm: 1, m: 5 } }}>
      <CardContent sx={{ display: 'flex', alignItems: 'center' }}>
        <Avatar
          sx={{
            display: {
              xs: 'none',
              sm: 'flex',
            },
            mr: 2,
            bgcolor: getColorFromName(getFirstTwoLetters(name).toUpperCase()),
            height: 60,
            width: 60,
          }}
        >
          {getFirstTwoLetters(name).toUpperCase()}
        </Avatar>
        <Box>
          <Typography variant="h6" color="#424242">
            Name:{' '}
            <Typography variant="h6" color="primary">
              {name}
            </Typography>
          </Typography>
          <Typography variant="h6" color="#424242">
            Email:{' '}
            <Typography variant="h6" color="primary">
              {email}
            </Typography>
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default Profile;
