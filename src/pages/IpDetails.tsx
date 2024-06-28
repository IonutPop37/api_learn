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
  Paper
} from '@mui/material';
import axios from 'axios';

const IpDetails: React.FC = () => {
  const [ipDetails, setIpDetails] = useState({ realIp: '', user_agent: '' });
  const [geoDetails, setGeoDetails] = useState<any>(null);
  const [message, setMessage] = useState('');

  useEffect(() => {
    console.log('API_IP_URL:', process.env.API_IP_URL);
    console.log('API_GEO_URL:', process.env.API_GEO_URL);

    const fetchIpDetails = async () => {
      try {
        const ipUrl = process.env.API_IP_URL;
        const geoUrl = process.env.API_GEO_URL;
        
        if (!ipUrl || !geoUrl) {
          throw new Error("API URLs are not defined in the environment variables.");
        }

        const response = await axios.get(ipUrl, {
          headers: {
            'accept': '*/*'
          }
        });
        const ipData = response.data;
        setIpDetails(ipData);

        const geoResponse = await axios.get(`${geoUrl}${ipData.realIp}`, {
          headers: {
            'accept': 'application/json'
          }
        });
        setGeoDetails(geoResponse.data);
      } catch (error) {
        console.error('Error fetching IP details:', error);
        setMessage('Error fetching IP details.');
      }
    };

    fetchIpDetails();
  }, []);

  return (
    <Container>
      <Box mt={4} mb={2}>
        <Typography variant="h4">IP Details</Typography>
      </Box>
      {message && <Typography variant="h6" color="error">{message}</Typography>}
      <Box mt={4}>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Real IP</TableCell>
                <TableCell>User Agent</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell>{ipDetails.realIp}</TableCell>
                <TableCell>{ipDetails.user_agent}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
      {geoDetails && (
        <Box mt={4}>
          <Typography variant="h4">Geo Location Details</Typography>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>IP</TableCell>
                  <TableCell>Continent</TableCell>
                  <TableCell>Country</TableCell>
                  <TableCell>Region</TableCell>
                  <TableCell>City</TableCell>
                  <TableCell>Latitude</TableCell>
                  <TableCell>Longitude</TableCell>
                  <TableCell>Postal Code</TableCell>
                  <TableCell>Phone Code</TableCell>
                  <TableCell>Capital</TableCell>
                  <TableCell>EU Member</TableCell>
                  <TableCell>Borders</TableCell>
                  <TableCell>Top Level Domains</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell>{geoDetails.ip}</TableCell>
                  <TableCell>{geoDetails.continentName}</TableCell>
                  <TableCell>{geoDetails.countryName}</TableCell>
                  <TableCell>{geoDetails.regionName}</TableCell>
                  <TableCell>{geoDetails.city}</TableCell>
                  <TableCell>{geoDetails.latitude}</TableCell>
                  <TableCell>{geoDetails.longitude}</TableCell>
                  <TableCell>{geoDetails.postalCode}</TableCell>
                  <TableCell>{geoDetails.phoneCode}</TableCell>
                  <TableCell>{geoDetails.capital}</TableCell>
                  <TableCell>{geoDetails.isEu ? 'Yes' : 'No'}</TableCell>
                  <TableCell>{geoDetails.borders?.join(', ')}</TableCell>
                  <TableCell>{geoDetails.topLevelDomains?.join(', ')}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      )}
    </Container>
  );
};

export default IpDetails;
