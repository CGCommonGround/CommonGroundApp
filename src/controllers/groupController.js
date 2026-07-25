const db = require('../config/db');

const createGroup = async (req, res) => {
  const { creator_id, name, description, privacy } = req.body;

  if (!creator_id || !name) {
    return res.status(400).json({ message: 'Creator ID and group name are required' });
  }

  try {
    const groupQuery = `
      INSERT INTO groups (creator_id, name, description, privacy)
      VALUES ($1, $2, $3, $4)
      RETURNING *
    `;
    const groupResult = await db.query(groupQuery, [
      creator_id,
      name.trim(),
      description ? description.trim() : null,
      privacy || 'PUBLIC'
    ]);

    const newGroup = groupResult.rows[0];

    const memberQuery = `
      INSERT INTO group_members (group_id, user_id, role, status)
      VALUES ($1, $2, 'ADMIN', 'ACTIVE')
    `;
    await db.query(memberQuery, [newGroup.id, creator_id]);

    res.status(201).json({
      message: 'Group created successfully',
      group: newGroup
    });
  } catch (error) {
    console.error('Error creating group:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

const getGroups = async (req, res) => {
  try {
    const query = `
      SELECT g.*, u.name AS creator_name 
      FROM groups g
      JOIN users u ON g.creator_id = u.id
      ORDER BY g.created_at DESC
    `;
    const result = await db.query(query);
    res.status(200).json(result.rows);
  } catch (error) {
    console.error('Error fetching groups:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  createGroup,
  getGroups
};