import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';

export default function NotVerified() {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      height="50vh"
    >
      <Typography variant="h4" align="center">
        عفوا .. هذا المحتوى غير مصرح به
      </Typography>
      <Box py={4}>
        <Link style={{ color: 'lightgrey' }} to={`/`}>
          الرجوع الي الصفحه الرئيسيه
        </Link>
      </Box>
    </Box>
  );
}
