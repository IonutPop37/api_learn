import React, { useState, useEffect } from 'react';
import {
  Container,
  Box,
  Typography,
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
import axios from 'axios';

const CreatorSearch: React.FC = () => {
  const [results, setResults] = useState<any[]>([]);
  const [totalResults, setTotalResults] = useState<number>(0);
  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(10);
  const [sortBy, setSortBy] = useState<string>('id:DESC');
  const [message, setMessage] = useState<string>('');

  useEffect(() => {
    fetchCreators();
  }, [page, rowsPerPage, sortBy]);

  const fetchCreators = async () => {
    try {
      const token = localStorage.getItem('access_token');
      if (!token) {
        setMessage('No access token found. Please log in.');
        return;
      }

      const url = process.env.NEXT_PUBLIC_API_ALL_CREATOR_SEARCH;
      const headers = {
        'Authorization': `Bearer ${token}`
      };

      const response = await axios.get(url, {
        headers: headers
      });

      setResults(response.data.data);
      setTotalResults(response.data.meta.totalItems);

    } catch (error) {
      setMessage('Error fetching creators.');
    }
  };

  const handlePageChange = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleRowsPerPageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleSortChange = (property: string) => (event: React.MouseEvent<unknown>) => {
    const isAsc = sortBy === `${property}:ASC`;
    setSortBy(`${property}:${isAsc ? 'DESC' : 'ASC'}`);
  };

  return (
    <Container>
      <Box mt={4} mb={2}>
        <Typography variant="h4">Creator Search</Typography>
      </Box>
      {message && <Typography variant="h6" color="error">{message}</Typography>}
      <Box mt={4}>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  <TableSortLabel
                    active={sortBy.includes('id')}
                    direction={sortBy.endsWith('ASC') ? 'asc' : 'desc'}
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
          page={page}
          onPageChange={handlePageChange}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleRowsPerPageChange}
        />
      </Box>
    </Container>
  );
};

export default CreatorSearch;
