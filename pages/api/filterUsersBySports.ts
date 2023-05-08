import { NextApiRequest, NextApiResponse } from 'next';
import { database } from '../../utils/firebase.js'; // Assuming you have Firebase configured

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { selectedSports, currentUserId } = req.body;
  try {
    const usersRef = database.collection('users');
    const snapshot = await usersRef
      .where('sports', 'array-contains-any', selectedSports)
      .get();

    const filteredUsers = snapshot.docs
      .map((doc) => ({ id: doc.id, data: doc.data() }))
      .filter((user) => user.id !== currentUserId);

      const formattedArray= filteredUsers.map((item) => {
          return {
            ...item.data,
            id: item.id,
          };
      });

    res.json(formattedArray);
  } catch (error) {
    console.error('Error filtering users by sports:', error);
    res.status(500).json({ message: 'Failed to filter users by sports.' });
  }
}
