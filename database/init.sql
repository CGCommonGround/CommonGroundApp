DROP eschema application if EXISTS CASCADE;
CREATE eschema application;

-- =========================================
-- CLEANUP 
-- =========================================

DROP TABLE IF EXISTS proposal_votes CASCADE;
DROP TABLE IF EXISTS proposals CASCADE;
DROP TABLE IF EXISTS group_invitations CASCADE;
DROP TABLE IF EXISTS group_members CASCADE;
DROP TABLE IF EXISTS events CASCADE;
DROP TABLE IF EXISTS groups CASCADE;
DROP TABLE IF EXISTS user_preferences CASCADE;
DROP TABLE IF EXISTS place_types CASCADE;
DROP TABLE IF EXISTS users CASCADE;

-- =========================================
-- USERS
-- =========================================

CREATE TABLE users (
id SERIAL PRIMARY KEY,
name VARCHAR(100) NOT NULL,
email VARCHAR(150) NOT NULL,
password_hash TEXT NOT NULL,
city VARCHAR(100),
profile_image TEXT,
created_at TIMESTAMP NOT NULL DEFAULT NOW(),
updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE UNIQUE INDEX uq_users_email
ON users (LOWER(email));

-- =========================================
-- PLACE TYPES
-- =========================================

CREATE TABLE place_types (
id SERIAL PRIMARY KEY,
name VARCHAR(100) NOT NULL UNIQUE,
description TEXT
);

-- =========================================
-- USER PREFERENCES
-- =========================================

CREATE TABLE user_preferences (
id SERIAL PRIMARY KEY,
user_id INT NOT NULL,
place_type_id INT NOT NULL,
interest_level INT CHECK (interest_level BETWEEN 1 AND 5),
max_budget NUMERIC(10,2) CHECK (max_budget >= 0),
preferred_transport VARCHAR(50),
likes_outdoor BOOLEAN NOT NULL DEFAULT FALSE,

CONSTRAINT fk_upref_user
    FOREIGN KEY (user_id)
    REFERENCES users(id)
    ON UPDATE CASCADE
    ON DELETE CASCADE,

CONSTRAINT fk_upref_place_type
    FOREIGN KEY (place_type_id)
    REFERENCES place_types(id)
    ON UPDATE CASCADE
    ON DELETE CASCADE,

CONSTRAINT uq_upref_user_place
    UNIQUE (user_id, place_type_id)

);

-- =========================================
-- GROUPS
-- =========================================

CREATE TABLE groups (
id SERIAL PRIMARY KEY,
creator_id INT NOT NULL,
name VARCHAR(100) NOT NULL,
description TEXT,

privacy VARCHAR(20)
    NOT NULL DEFAULT 'PUBLIC'
    CHECK (privacy IN ('PUBLIC','PRIVATE')),

status VARCHAR(20)
    NOT NULL DEFAULT 'ACTIVE'
    CHECK (status IN ('ACTIVE','ARCHIVED','DELETED')),

created_at TIMESTAMP NOT NULL DEFAULT NOW(),

CONSTRAINT fk_group_creator
    FOREIGN KEY (creator_id)
    REFERENCES users(id)
    ON UPDATE CASCADE
    ON DELETE RESTRICT

);

-- =========================================
-- GROUP MEMBERS
-- =========================================

CREATE TABLE group_members (
id SERIAL PRIMARY KEY,
group_id INT NOT NULL,
user_id INT NOT NULL,

role VARCHAR(20)
    NOT NULL DEFAULT 'MEMBER'
    CHECK (role IN ('ADMIN','MEMBER')),

status VARCHAR(20)
    NOT NULL DEFAULT 'ACTIVE'
    CHECK (status IN ('ACTIVE','INACTIVE','BANNED')),

joined_at TIMESTAMP NOT NULL DEFAULT NOW(),

CONSTRAINT fk_gmember_group
    FOREIGN KEY (group_id)
    REFERENCES groups(id)
    ON UPDATE CASCADE
    ON DELETE CASCADE,

CONSTRAINT fk_gmember_user
    FOREIGN KEY (user_id)
    REFERENCES users(id)
    ON UPDATE CASCADE
    ON DELETE CASCADE,

CONSTRAINT uq_gmember_group_user
    UNIQUE (group_id, user_id)

);

-- =========================================
-- GROUP INVITATIONS
-- =========================================

CREATE TABLE group_invitations (
id SERIAL PRIMARY KEY,
group_id INT NOT NULL,
sender_id INT NOT NULL,
receiver_id INT NOT NULL,

status VARCHAR(20)
    NOT NULL DEFAULT 'PENDING'
    CHECK (status IN ('PENDING','ACCEPTED','DECLINED','CANCELLED')),

sent_at TIMESTAMP NOT NULL DEFAULT NOW(),
responded_at TIMESTAMP,

CONSTRAINT fk_ginv_group
    FOREIGN KEY (group_id)
    REFERENCES groups(id)
    ON UPDATE CASCADE
    ON DELETE CASCADE,

CONSTRAINT fk_ginv_sender
    FOREIGN KEY (sender_id)
    REFERENCES users(id)
    ON UPDATE CASCADE
    ON DELETE CASCADE,

CONSTRAINT fk_ginv_receiver
    FOREIGN KEY (receiver_id)
    REFERENCES users(id)
    ON UPDATE CASCADE
    ON DELETE CASCADE

);

-- =========================================
-- EVENTS
-- =========================================

CREATE TABLE events (
id SERIAL PRIMARY KEY,
place_type_id INT NOT NULL,

title VARCHAR(150) NOT NULL,
description TEXT,
location_name VARCHAR(150),
address TEXT,
city VARCHAR(100),

event_date TIMESTAMP,

price NUMERIC(10,2)
    CHECK (price >= 0),

weather_sensitive BOOLEAN NOT NULL DEFAULT FALSE,

event_status VARCHAR(20)
    NOT NULL DEFAULT 'ACTIVE'
    CHECK (event_status IN ('ACTIVE','CANCELLED','COMPLETED')),

image_url TEXT,
official_url TEXT,

created_at TIMESTAMP NOT NULL DEFAULT NOW(),

CONSTRAINT fk_event_place_type
    FOREIGN KEY (place_type_id)
    REFERENCES place_types(id)
    ON UPDATE CASCADE
    ON DELETE RESTRICT

);

-- =========================================
-- PROPOSALS
-- =========================================

CREATE TABLE proposals (
id SERIAL PRIMARY KEY,

group_id INT NOT NULL,
event_id INT NOT NULL,
creator_id INT NOT NULL,

title VARCHAR(150) NOT NULL,
comment TEXT,

meeting_point VARCHAR(200),
transport_method VARCHAR(50),

estimated_cost NUMERIC(10,2)
    CHECK (estimated_cost >= 0),

proposed_datetime TIMESTAMP,
voting_deadline TIMESTAMP,

status VARCHAR(20)
    NOT NULL DEFAULT 'OPEN'
    CHECK (status IN ('OPEN','APPROVED','REJECTED','CANCELLED')),

has_alternative_plan BOOLEAN NOT NULL DEFAULT FALSE,
alternative_plan TEXT,

created_at TIMESTAMP NOT NULL DEFAULT NOW(),

CONSTRAINT chk_proposal_dates
    CHECK (
        voting_deadline IS NULL
        OR proposed_datetime IS NULL
        OR voting_deadline < proposed_datetime
    ),

CONSTRAINT fk_proposal_group
    FOREIGN KEY (group_id)
    REFERENCES groups(id)
    ON UPDATE CASCADE
    ON DELETE CASCADE,

CONSTRAINT fk_proposal_event
    FOREIGN KEY (event_id)
    REFERENCES events(id)
    ON UPDATE CASCADE
    ON DELETE RESTRICT,

CONSTRAINT fk_proposal_creator
    FOREIGN KEY (creator_id)
    REFERENCES users(id)
    ON UPDATE CASCADE
    ON DELETE RESTRICT

);

-- =========================================
-- PROPOSAL VOTES
-- =========================================

CREATE TABLE proposal_votes (
id SERIAL PRIMARY KEY,

proposal_id INT NOT NULL,
user_id INT NOT NULL,

vote VARCHAR(20)
    NOT NULL
    CHECK (vote IN ('YES','NO','MAYBE')),

comment TEXT,
voted_at TIMESTAMP NOT NULL DEFAULT NOW(),

CONSTRAINT fk_pvote_proposal
    FOREIGN KEY (proposal_id)
    REFERENCES proposals(id)
    ON UPDATE CASCADE
    ON DELETE CASCADE,

CONSTRAINT fk_pvote_user
    FOREIGN KEY (user_id)
    REFERENCES users(id)
    ON UPDATE CASCADE
    ON DELETE CASCADE,

CONSTRAINT uq_pvote_proposal_user
    UNIQUE (proposal_id, user_id)

);
