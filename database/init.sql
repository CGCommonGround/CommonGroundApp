CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(150) UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    city VARCHAR(100),
    profile_image TEXT,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE place_types (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    color VARCHAR(50),
    icon VARCHAR(100),
    description TEXT


);

CREATE TABLE user_preferences (
    id SERIAL PRIMARY KEY,
    user_id INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    place_type_id INT NOT NULL REFERENCES place_types(id) ON DELETE CASCADE,
    interest_level INT,
    max_budget DECIMAL(10,2),
    preferred_transport VARCHAR(100),
    likes_outdoor BOOLEAN DEFAULT FALSE

);

CREATE TABLE groups (
    id SERIAL PRIMARY KEY,
    creator_id INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    name VARCHAR(150) NOT NULL,
    description TEXT,
    privacy VARCHAR(50),
    status VARCHAR(50),
    created_at TIMESTAMP DEFAULT NOW()

);

CREATE TABLE group_members (
    id SERIAL PRIMARY KEY,
    group_id INT NOT NULL REFERENCES groups(id) ON DELETE CASCADE,
    user_id INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    role VARCHAR(50),
    status VARCHAR(50),
    joined_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE group_invitations (
    id SERIAL PRIMARY KEY,
    group_id INT NOT NULL REFERENCES groups(id) ON DELETE CASCADE,
    sender_id INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    receiver_id INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    status VARCHAR(50),
    sent_at TIMESTAMP DEFAULT NOW(),
    responded_at TIMESTAMP

);

CREATE TABLE events (
    id SERIAL PRIMARY KEY,
    place_type_id INT REFERENCES place_types(id),
    title VARCHAR(200) NOT NULL,
    description TEXT,
    location_name VARCHAR(200),
    address TEXT,
    city VARCHAR(100),
    event_date TIMESTAMP,
    price DECIMAL(10,2),
    weather_sensitive BOOLEAN DEFAULT FALSE,
    event_status VARCHAR(50),
    image_url TEXT,
    official_url TEXT,
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE proposals (
    id SERIAL PRIMARY KEY,
    group_id INT NOT NULL REFERENCES groups(id) ON DELETE CASCADE,
    event_id INT REFERENCES events(id) ON DELETE SET NULL,
    creator_id INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    title VARCHAR(200) NOT NULL,
    comment TEXT,
    meeting_point VARCHAR(200),
    transport_method VARCHAR(100),
    estimated_cost DECIMAL(10,2),
    proposed_datetime TIMESTAMP,
    voting_deadline TIMESTAMP,
    status VARCHAR(50),
    has_alternative_plan BOOLEAN DEFAULT FALSE,
    alternative_plan TEXT,
    created_at TIMESTAMP DEFAULT NOW()

);

CREATE TABLE proposal_votes (
    id SERIAL PRIMARY KEY,
    proposal_id INT NOT NULL REFERENCES proposals(id) ON DELETE CASCADE,
    user_id INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    vote VARCHAR(20),
    comment TEXT,
    voted_at TIMESTAMP DEFAULT NOW()

);



CREATE TABLE weather_checks (
    id SERIAL PRIMARY KEY,
    proposal_id INT NOT NULL REFERENCES proposals(id) ON DELETE CASCADE,
    weather_status VARCHAR(50),
    rain_probability INT,
    temperature VARCHAR(50),
    risk_level VARCHAR(50),
    should_cancel BOOLEAN DEFAULT FALSE,
    checked_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE proposal_changes (
    id SERIAL PRIMARY KEY,
    proposal_id INT NOT NULL REFERENCES proposals(id) ON DELETE CASCADE,
    user_id INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    change_type VARCHAR(100),
    description TEXT,
    status VARCHAR(50),
    created_at TIMESTAMP DEFAULT NOW()
);


CREATE TABLE notifications (
    id SERIAL PRIMARY KEY,
    user_id INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    proposal_id INT REFERENCES proposals(id) ON DELETE CASCADE,
    title VARCHAR(200),
    message TEXT,
    is_read BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT NOW()
);