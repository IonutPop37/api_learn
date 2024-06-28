import React, { useState, ChangeEvent } from 'react';
import {
  Container,
  Box,
  TextField,
  Button,
  Typography,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableContainer,
  Paper
} from '@mui/material';
import { SelectChangeEvent } from '@mui/material/Select';
import axios from 'axios';

interface FormData {
  page: number;
  limit: number;
  searchBySocial: string;
  searchBy: string;
  sortBy: string;
  isClosed: string;
  isSuspended: string;
  sunset_mode: string;
  isFeatured: string;
  isVerified: string;
  isVisible: string;
  isBookmarked: string;
  maturity: string;
  type: string;
  is_email_verified: string;
  search: string;
}

const SearchUsers: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    page: 1,
    limit: 10,
    searchBySocial: '',
    searchBy: '',
    sortBy: '',
    isClosed: '',
    isSuspended: '',
    sunset_mode: '',
    isFeatured: '',
    isVerified: '',
    isVisible: '',
    isBookmarked: '',
    maturity: '',
    type: '',
    is_email_verified: '',
    search: ''
  });

  const [results, setResults] = useState<any[]>([]);
  const [message, setMessage] = useState('');

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | { name?: string; value: unknown }> | SelectChangeEvent<string>
  ): void => {
    const { name, value } = e.target as { name: string; value: unknown };
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('access_token');
      console.log('Access Token:', token);
      if (!token) {
        setMessage('No access token found. Please log in.');
        return;
      }

      const url = process.env.NEXT_PUBLIC_API_SEARCH_USER;
      const headers = {
        'Authorization': `Bearer ${token}`
      };
      console.log('Request URL:', url);
      console.log('Request Headers:', headers);
      console.log('Request Params:', formData);

      const response = await axios.get(url, {
        params: formData,
        headers: headers
      });
      setResults(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
      setMessage('Error fetching users.');
    }
  };

  return (
    <Container>
      <Box mt={4} mb={2}>
        <Typography variant="h4">Căutare Utilizatori</Typography>
      </Box>
      <form onSubmit={handleSubmit}>
        <Box display="flex" flexDirection="column" gap={2}>
          <TextField
            label="Pagina"
            variant="outlined"
            name="page"
            type="number"
            value={formData.page}
            onChange={handleChange}
          />
          <TextField
            label="Limită"
            variant="outlined"
            name="limit"
            type="number"
            value={formData.limit}
            onChange={handleChange}
          />
          <FormControl variant="outlined">
            <InputLabel>Search By Social</InputLabel>
            <Select
              name="searchBySocial"
              value={formData.searchBySocial}
              onChange={handleChange as unknown as (event: SelectChangeEvent<string>, child: React.ReactNode) => void}
              label="Search By Social"
            >
              <MenuItem value=""><em>None</em></MenuItem>
              <MenuItem value="instagram">Instagram</MenuItem>
              <MenuItem value="twitter">Twitter</MenuItem>
              <MenuItem value="facebook">Facebook</MenuItem>
              <MenuItem value="tiktok">TikTok</MenuItem>
            </Select>
          </FormControl>
          <FormControl variant="outlined">
            <InputLabel>Sort By</InputLabel>
            <Select
              name="sortBy"
              value={formData.sortBy}
              onChange={handleChange as unknown as (event: SelectChangeEvent<string>, child: React.ReactNode) => void}
              label="Sort By"
            >
              <MenuItem value=""><em>None</em></MenuItem>
              <MenuItem value="user.registeredAt:ASC">user.registeredAt:ASC</MenuItem>
              <MenuItem value="user.registeredAt:DESC">user.registeredAt:DESC</MenuItem>
              <MenuItem value="user.lastActivity:ASC">user.lastActivity:ASC</MenuItem>
              <MenuItem value="user.lastActivity:DESC">user.lastActivity:DESC</MenuItem>
              <MenuItem value="userConnectionStat.countFollower:ASC">userConnectionStat.countFollower:ASC</MenuItem>
              <MenuItem value="userConnectionStat.countFollower:DESC">userConnectionStat.countFollower:DESC</MenuItem>
              <MenuItem value="userConnectionStat.countSubscriber:ASC">userConnectionStat.countSubscriber:ASC</MenuItem>
              <MenuItem value="userConnectionStat.countSubscriber:DESC">userConnectionStat.countSubscriber:DESC</MenuItem>
              <MenuItem value="userConnectionStat.countFollowing:ASC">userConnectionStat.countFollowing:ASC</MenuItem>
              <MenuItem value="userConnectionStat.countFollowing:DESC">userConnectionStat.countFollowing:DESC</MenuItem>
              <MenuItem value="userConnectionStat.countSubscription:ASC">userConnectionStat.countSubscription:ASC</MenuItem>
              <MenuItem value="userConnectionStat.countSubscription:DESC">userConnectionStat.countSubscription:DESC</MenuItem>
              <MenuItem value="mediaUploadStat.countTotalPost:ASC">mediaUploadStat.countTotalPost:ASC</MenuItem>
              <MenuItem value="mediaUploadStat.countTotalPost:DESC">mediaUploadStat.countTotalPost:DESC</MenuItem>
            </Select>
          </FormControl>
          <FormControl variant="outlined">
            <InputLabel>Maturity</InputLabel>
            <Select
              name="maturity"
              value={formData.maturity}
              onChange={handleChange as unknown as (event: SelectChangeEvent<string>, child: React.ReactNode) => void}
              label="Maturity"
            >
              <MenuItem value=""><em>None</em></MenuItem>
              <MenuItem value="sfw">SFW</MenuItem>
              <MenuItem value="nsfw">NSFW</MenuItem>
            </Select>
          </FormControl>
          <FormControl variant="outlined">
            <InputLabel>Type</InputLabel>
            <Select
              name="type"
              value={formData.type}
              onChange={handleChange as unknown as (event: SelectChangeEvent<string>, child: React.ReactNode) => void}
              label="Type"
            >
              <MenuItem value=""><em>None</em></MenuItem>
              <MenuItem value="admin">Admin</MenuItem>
              <MenuItem value="site_admin">Site Admin</MenuItem>
              <MenuItem value="moderator">Moderator</MenuItem>
              <MenuItem value="manager">Manager</MenuItem>
              <MenuItem value="creator">Creator</MenuItem>
              <MenuItem value="user">User</MenuItem>
              <MenuItem value="video_editor">Video Editor</MenuItem>
              <MenuItem value="user_agent">User Agent</MenuItem>
              <MenuItem value="studio_admin">Studio Admin</MenuItem>
            </Select>
          </FormControl>
          <TextField
            label="Caută"
            variant="outlined"
            name="search"
            value={formData.search}
            onChange={handleChange}
          />
          <Button variant="contained" color="primary" type="submit">
            Caută
          </Button>
        </Box>
      </form>
      {message && <Typography variant="h6" color="error">{message}</Typography>}
      <Box mt={4}>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Username</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Display Name</TableCell>
                <TableCell>First Name</TableCell>
                <TableCell>Last Name</TableCell>
                <TableCell>Type</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {results.map((user: any) => (
                <TableRow key={user.id}>
                  <TableCell>{user.id}</TableCell>
                  <TableCell>{user.username}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.profile.display_name}</TableCell>
                  <TableCell>{user.account.firstname}</TableCell>
                  <TableCell>{user.account.lastname}</TableCell>
                  <TableCell>{user.type}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Container>
  );
};

export default SearchUsers;
