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
  Paper,
  TablePagination,
  TableSortLabel
} from '@mui/material';
import { SelectChangeEvent } from '@mui/material/Select';
import axios from 'axios';

interface FormData {
  page: number;
  limit: number;
  sortBy: string;
  filterBy: string;
  isFeatured?: number;
  piercings?: number;
  ethnicity?: string;
  height?: string;
  shoeSize?: string;
  hairColor?: string;
  eyeColor?: string;
  age?: string;
  sexualOrientation?: string;
  rating?: string;
  username?: string;
  by?: string;
}

const CreatorSearch: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    page: 1,
    limit: 10,
    sortBy: 'id:DESC',
    filterBy: ''
  });

  const [results, setResults] = useState<any[]>([]);
  const [totalResults, setTotalResults] = useState<number>(0);
  const [message, setMessage] = useState('');

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | { name?: string; value: unknown }> | SelectChangeEvent<string>
  ): void => {
    const { name, value } = e.target as { name: string; value: unknown };
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetchCreators();
  };

  const fetchCreators = async () => {
    try {
      const token = localStorage.getItem('access_token');
      console.log('Access Token:', token);
      if (!token) {
        setMessage('No access token found. Please log in.');
        return;
      }

      const url = process.env.NEXT_PUBLIC_API_CREATOR_SEARCH;
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
      setResults(response.data.data);
      setTotalResults(response.data.meta.totalItems);

      console.log(response.data.data);

    } catch (error) {
      console.error('Error fetching creators:', error);
      setMessage('Error fetching creators.');
    }
  };

  const handlePageChange = (event: unknown, newPage: number) => {
    setFormData((prevData) => ({ ...prevData, page: newPage + 1 }));
    fetchCreators();
  };

  const handleRowsPerPageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prevData) => ({ ...prevData, limit: parseInt(event.target.value, 10), page: 1 }));
    fetchCreators();
  };

  const handleSortChange = (property: string) => (event: React.MouseEvent<unknown>) => {
    const isAsc = formData.sortBy === `${property}:ASC`;
    setFormData((prevData) => ({ ...prevData, sortBy: `${property}:${isAsc ? 'DESC' : 'ASC'}` }));
    fetchCreators();
  };

  
  return (
    <Container>
      <Box mt={4} mb={2}>
        <Typography variant="h4">Creator Search</Typography>
      </Box>
      <form onSubmit={handleSubmit}>
        <Box display="flex" flexDirection="column" gap={2}>
          <TextField
            label="Page"
            variant="outlined"
            name="page"
            type="number"
            value={formData.page}
            onChange={handleChange}
          />
          <TextField
            label="Limit"
            variant="outlined"
            name="limit"
            type="number"
            value={formData.limit}
            onChange={handleChange}
          />
          <FormControl variant="outlined">
            <InputLabel>Sort By</InputLabel>
            <Select
              name="sortBy"
              value={formData.sortBy}
              onChange={handleChange as unknown as (event: SelectChangeEvent<string>, child: React.ReactNode) => void}
              label="Sort By"
            >
              <MenuItem value="id:DESC">ID: DESC</MenuItem>
              <MenuItem value="id:ASC">ID: ASC</MenuItem>
            </Select>
          </FormControl>
          <TextField
            label="Filter By"
            variant="outlined"
            name="filterBy"
            value={formData.filterBy}
            onChange={handleChange}
          />
          <TextField
            label="Username"
            variant="outlined"
            name="username"
            value={formData.username}
            onChange={handleChange}
          />
          <FormControl variant="outlined">
            <InputLabel>Is Featured</InputLabel>
            <Select
              name="isFeatured"
              value={formData.isFeatured?.toString() || ''}
              onChange={handleChange as unknown as (event: SelectChangeEvent<string>, child: React.ReactNode) => void}
              label="Is Featured"
            >
              <MenuItem value=""><em>None</em></MenuItem>
              <MenuItem value="1">Yes</MenuItem>
              <MenuItem value="0">No</MenuItem>
            </Select>
          </FormControl>
          <FormControl variant="outlined">
            <InputLabel>Piercings</InputLabel>
            <Select
              name="piercings"
              value={formData.piercings?.toString() || ''}
              onChange={handleChange as unknown as (event: SelectChangeEvent<string>, child: React.ReactNode) => void}
              label="Piercings"
            >
              <MenuItem value=""><em>None</em></MenuItem>
              <MenuItem value="1">Yes</MenuItem>
              <MenuItem value="0">No</MenuItem>
            </Select>
          </FormControl>
          <TextField
            label="Ethnicity"
            variant="outlined"
            name="ethnicity"
            value={formData.ethnicity}
            onChange={handleChange}
          />
          <TextField
            label="Height"
            variant="outlined"
            name="height"
            value={formData.height}
            onChange={handleChange}
          />
          <TextField
            label="Shoe Size"
            variant="outlined"
            name="shoeSize"
            value={formData.shoeSize}
            onChange={handleChange}
          />
          <TextField
            label="Hair Color"
            variant="outlined"
            name="hairColor"
            value={formData.hairColor}
            onChange={handleChange}
          />
          <TextField
            label="Eye Color"
            variant="outlined"
            name="eyeColor"
            value={formData.eyeColor}
            onChange={handleChange}
          />
          <TextField
            label="Age Range"
            variant="outlined"
            name="age"
            value={formData.age}
            onChange={handleChange}
          />
          <TextField
            label="Sexual Orientation"
            variant="outlined"
            name="sexualOrientation"
            value={formData.sexualOrientation}
            onChange={handleChange}
          />
          <TextField
            label="Rating"
            variant="outlined"
            name="rating"
            value={formData.rating}
            onChange={handleChange}
          />
          <FormControl variant="outlined">
            <InputLabel>Sort By Field</InputLabel>
            <Select
              name="by"
              value={formData.by || ''}
              onChange={handleChange as unknown as (event: SelectChangeEvent<string>, child: React.ReactNode) => void}
              label="Sort By Field"
            >
              <MenuItem value=""><em>None</em></MenuItem>
              <MenuItem value="createdAt">Created At</MenuItem>
              <MenuItem value="displayName">Display Name</MenuItem>
              <MenuItem value="countSubscriber">Count Subscriber</MenuItem>
              <MenuItem value="countTotalPost">Count Total Post</MenuItem>
            </Select>
          </FormControl>
          <Button variant="contained" color="primary" type="submit">
            Search
          </Button>
        </Box>
      </form>
      {message && <Typography variant="h6" color="error">{message}</Typography>}
      <Box mt={4}>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  <TableSortLabel
                    active={formData.sortBy.includes('id')}
                    direction={formData.sortBy.endsWith('ASC') ? 'asc' : 'desc'}
                    onClick={handleSortChange('id')}
                  >
                    ID
                  </TableSortLabel>
                </TableCell>
                <TableCell>Username</TableCell>
                <TableCell>Display Name</TableCell>
                <TableCell>Avatar</TableCell>
                <TableCell>Header</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {results.map((creator: any) => (
                <TableRow key={creator.id}>
                  <TableCell>{creator.id}</TableCell>
                  <TableCell>{creator.username}</TableCell>
                  <TableCell>{creator.displayName}</TableCell>
                  <TableCell>
                    {creator.avatarUrl && (
                      <img src={creator.avatarUrl} alt={`${creator.username} avatar`} width="50" />
                    )}
                  </TableCell>
                  <TableCell>
                    {creator.headerUrl && (
                      <img src={creator.headerUrl} alt={`${creator.username} header`} width="100" />
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          component="div"
          count={totalResults}
          page={formData.page - 1}
          onPageChange={handlePageChange}
          rowsPerPage={formData.limit}
          onRowsPerPageChange={handleRowsPerPageChange}
        />
      </Box>
    </Container>
  );
};

export default CreatorSearch;
