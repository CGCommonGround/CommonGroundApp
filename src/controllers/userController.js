const db = require('../config/db');

const registerUser = async(req, res)=>{
    const {name, email, password, city} = req.body;

    if(!name || !email || !password){
        return res.status(400).json({message: "Missing required fields"});
    }
    try{
        const checkUser = await db.query(
            'SELECT id FROM users WHERE LOWER(email) = LOWER($1)', [email]
        );
        if(checkUser.rows.length > 0){
            return res.status(400).json({
                message: "Email already exists"
            });
        }
        const insertQuery = `
        INSERT INTO users (name, email, password_hash, city)
        VALUES($1, $2, $3, $4) RETURNING id, name, email, city, created_at`;
        const result = await db.query(insertQuery, [name,email,password,city || null]);

        res.status(201).json({
            message: "User registered successfully", user: result.rows[0]
        });
    } catch(error){
        console.error(error);
        res.status(500).json({message: "Server Error"});
    }
};

// login
const loginUser = async (req,res)=>{
    const {email, password} = req.body;

    if(!email || !password){
        return res.status(400).json({message: "email and password are required"});
    }
    try{
        const query = 'SELECT id, name, email,password_hash FROM users WHERE LOWER(email) = LOWER($1)';
        const result = await db.query(query, [email]);

        if (result.rows.length === 0 || result.rows[0].password_hash !== password) {
          return res.status(401).json({ message: 'Invalid credentials' });
    }
    const user = result.rows[0];
    res.status(200).json({
      message: 'Login successful',
      user: { id: user.id, name: user.name, email: user.email }
    });
  } catch (error) {
    console.error(error);
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
    console.error(error);
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
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  registerUser,
  loginUser,
  getUserPreferences,
  updateUserPreferences
};
