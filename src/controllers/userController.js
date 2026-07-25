const db = require('../config/db');

const registerUser = async (req, res) => {
  const { name, email, password, city } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  try {
    const cleanEmail = email.trim();
    const cleanPassword = password.trim();

    const checkUser = await db.query(
      'SELECT id FROM users WHERE LOWER(email) = LOWER($1)', [cleanEmail]
    );

    if (checkUser.rows.length > 0) {
      return res.status(400).json({
        message: "Email already exists"
      });
    }

    const insertQuery = `
      INSERT INTO users (name, email, password, city)
      VALUES($1, $2, $3, $4) 
      RETURNING id, name, email, city, created_at
    `;
    
    const result = await db.query(insertQuery, [
      name.trim(), 
      cleanEmail, 
      cleanPassword, 
      city ? city.trim() : null
    ]);

    res.status(201).json({
      message: "User registered successfully",
      user: result.rows[0]
    });
  } catch (error) {
    console.error("Register Error:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "email and password are required" });
  }

  try {
    const cleanEmail = email.trim();
    const cleanPassword = password.trim();

    const query = 'SELECT id, name, email, password FROM users WHERE LOWER(email) = LOWER($1)';
    const result = await db.query(query, [cleanEmail]);

    if (result.rows.length === 0) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const user = result.rows[0];

    if (user.password !== cleanPassword) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    res.status(200).json({
      message: 'Login successful',
      user: { id: user.id, name: user.name, email: user.email }
    });
  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ message: 'Server error' });
  }
};
const getUserProfile = async (req, res) => {
  const { id } = req.params;

  try {
    const userQuery = 'SELECT id, name, email, city, profile_image, created_at FROM users WHERE id = $1';
    const userResult = await db.query(userQuery, [id]);

    if (userResult.rows.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    const prefQuery = `
      SELECT 
        up.id AS preference_id,
        pt.name AS category,
        up.interest_level,
        up.max_budget,
        up.preferred_transport,
        up.likes_outdoor
      FROM user_preferences up
      JOIN place_types pt ON up.place_type_id = pt.id
      WHERE up.user_id = $1
    `;
    const prefResult = await db.query(prefQuery, [id]);

    res.status(200).json({
      user: userResult.rows[0],
      preferences: prefResult.rows
    });
  } catch (error) {
    console.error('Get Profile Error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
const getUserPreferences = async (req, res) => {
  const { id } = req.params;

  try {
    const query = `
      SELECT 
        up.id AS preference_id,
        pt.name AS category,
        up.interest_level,
        up.max_budget,
        up.preferred_transport,
        up.likes_outdoor
      FROM user_preferences up
      JOIN place_types pt ON up.place_type_id = pt.id
      WHERE up.user_id = $1
    `;
    const result = await db.query(query, [id]);

    res.status(200).json({ userId: id, preferences: result.rows });
  } catch (error) {
    console.error("Get Preferences Error:", error);
    res.status(500).json({ message: 'Server error' });
  }
};

const updateUserPreferences = async (req, res) => {
  const { id } = req.params;
  const { category_name, interest_level, max_budget, preferred_transport, likes_outdoor } = req.body;

  try {
    const typeQuery = 'SELECT id FROM place_types WHERE name = $1';
    const typeResult = await db.query(typeQuery, [category_name]);

    if (typeResult.rows.length === 0) {
      return res.status(400).json({ message: 'Invalid category name' });
    }

    const placeTypeId = typeResult.rows[0].id;

    const upsertQuery = `
      INSERT INTO user_preferences (user_id, place_type_id, interest_level, max_budget, preferred_transport, likes_outdoor)
      VALUES ($1, $2, $3, $4, $5, $6)
      ON CONFLICT (user_id, place_type_id) 
      DO UPDATE SET 
        interest_level = EXCLUDED.interest_level,
        max_budget = EXCLUDED.max_budget,
        preferred_transport = EXCLUDED.preferred_transport,
        likes_outdoor = EXCLUDED.likes_outdoor
      RETURNING *
    `;
    
    const values = [
      id, 
      placeTypeId, 
      interest_level, 
      max_budget, 
      preferred_transport, 
      likes_outdoor !== undefined ? likes_outdoor : false
    ];
    
    const result = await db.query(upsertQuery, values);

    res.status(200).json({ message: 'Preferences updated successfully', data: result.rows[0] });
  } catch (error) {
    console.error("Update Preferences Error:", error);
    res.status(500).json({ message: 'Server error' });
  }
};

const getUserGroups = async (req, res) => {
  const { id } = req.params;

  try {
    const query = `
      SELECT 
        g.id,
        g.name,
        g.description,
        g.privacy,
        gm.role,
        g.created_at
      FROM group_members gm
      JOIN groups g ON gm.group_id = g.id
      WHERE gm.user_id = $1 AND gm.status = 'ACTIVE'
      ORDER BY g.created_at DESC
    `;
    const result = await db.query(query, [id]);

    res.status(200).json(result.rows);
  } catch (error) {
    console.error('Error fetching user groups:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  registerUser,
  loginUser,
  getUserPreferences,
  updateUserPreferences,
  getUserProfile,
  getUserGroups
};