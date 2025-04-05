exports.getFriends = async (req, res) => {
    try {
      // Mock friend data; in a real app, this would query Friendship model
      const friends = [
        { id: 1, name: 'Friend 1', progress: 75 },
        { id: 2, name: 'Friend 2', progress: 30 },
      ];
      res.json(friends);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch friends' });
    }
  };