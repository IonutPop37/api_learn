// src/pages/api/createAccount.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

const createAccount = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    try {
      const { displayName, email, password, birthDate, mobileCallCode, mobileNumber } = req.body;

      const response = await axios.post('https://api-staging.just4myfans.com/v2/registration/register', {
        displayName,
        email,
        password,
        birthDate,
        mobileCallCode,
        mobileNumber
      }, {
        headers: {
          'accept': 'application/json',
          'content-type': 'application/json'
        }
      });

      res.status(200).json(response.data);
    } catch (error) {
      res.status(500).json({ error: 'Error creating account', details: error.message });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
};

export default createAccount;
