-- =========================================
-- SEED DATA: PLACE TYPES
-- =========================================
INSERT INTO place_types (name, description) VALUES
('concerts', 'Live music concerts, festivals, and gigs'),
('theater', 'Plays, musicals, and performing arts'),
('exhibitions', 'Art galleries, photography showcases, and temporary exhibitions'),
('technology', 'Tech fairs, hackathons, and programming talks'),
('museums', 'History, science, and classical art museums'),
('gastronomy', 'Tapas tours, wine tastings, and culinary fairs'),
('outdoor', 'Outdoor activities, parks, and urban hiking');

-- =========================================
-- SEED DATA: USERS
-- =========================================
-- Passwords are simulated with a generic hash for development purposes
INSERT INTO users (name, email, password_hash, city) VALUES
('Ivo', 'ivo@commonground.local', '$2a$10$rX.vG...', 'Barcelona'),
('Carla', 'carla@commonground.local', '$2a$10$rX.vG...', 'Barcelona'),
('Marc', 'marc@commonground.local', '$2a$10$rX.vG...', 'Barcelona'),
('Sofía', 'sofia@commonground.local', '$2a$10$rX.vG...', 'Barcelona'),
('Lucas', 'lucas@commonground.local', '$2a$10$rX.vG...', 'Girona');

-- =========================================
-- SEED DATA: USER PREFERENCES
-- =========================================
-- Ivo's preferences (id: 1): concerts, technology, cheap plans (20€ max), metro
INSERT INTO user_preferences (user_id, place_type_id, interest_level, max_budget, preferred_transport, likes_outdoor) VALUES
(1, 1, 5, 20.00, 'metro', TRUE),
(1, 4, 5, 15.00, 'metro', FALSE);

-- Carla's preferences (id: 2): theater, exhibitions, quiet plans, medium budget (40€ max)
INSERT INTO user_preferences (user_id, place_type_id, interest_level, max_budget, preferred_transport, likes_outdoor) VALUES
(2, 2, 5, 40.00, 'walking', FALSE),
(2, 3, 4, 30.00, 'bus', FALSE);

-- Marc's preferences (id: 3): concerts/festivals, high budget (60€ max)
INSERT INTO user_preferences (user_id, place_type_id, interest_level, max_budget, preferred_transport, likes_outdoor) VALUES
(3, 1, 5, 60.00, 'car', TRUE);

-- Sofía's preferences (id: 4): museums, gastronomy, outdoor, medium budget (30€ max)
INSERT INTO user_preferences (user_id, place_type_id, interest_level, max_budget, preferred_transport, likes_outdoor) VALUES
(4, 5, 4, 25.00, 'walking', TRUE),
(4, 6, 5, 35.00, 'metro', TRUE),
(4, 7, 5, 10.00, 'walking', TRUE);

-- =========================================
-- SEED DATA: GROUPS & MEMBERS
-- =========================================
-- Ivo creates the group "Planes Barcelona"
INSERT INTO groups (creator_id, name, description, privacy, status) VALUES
(1, 'Planes Barcelona', 'Group to organize cultural outings on weekends', 'PRIVATE', 'ACTIVE');

-- Add members to the group (id: 1)
INSERT INTO group_members (group_id, user_id, role, status) VALUES
(1, 1, 'ADMIN', 'ACTIVE'), -- Ivo is the admin/creator
(1, 2, 'MEMBER', 'ACTIVE'), -- Carla
(1, 3, 'MEMBER', 'ACTIVE'), -- Marc
(1, 4, 'MEMBER', 'ACTIVE'); -- Sofía

-- A pending invitation to test backend flows (Ivo invites Lucas)
INSERT INTO group_invitations (group_id, sender_id, receiver_id, status) VALUES
(1, 1, 5, 'PENDING');

-- =========================================
-- SEED DATA: EVENTS
-- =========================================
INSERT INTO events (place_type_id, title, description, location_name, address, city, event_date, price, weather_sensitive, event_status) VALUES
(1, 'Indie Concert in Montjuïc', 'Enjoy the best local emerging bands in a magical outdoor setting.', 'Parc de Montjuïc', 'Passeig de Jean C. N. Forestier', 'Barcelona', '2026-05-25 20:00:00', 18.00, TRUE, 'ACTIVE'),
(2, 'Theater Play: The Method', 'A dark comedy about corporate recruitment selection processes.', 'Teatre Poliorama', 'La Rambla, 115', 'Barcelona', '2026-05-28 19:30:00', 25.00, FALSE, 'ACTIVE'),
(3, 'Picasso Temporary Exhibition', 'An exclusive showcase of the artist’s Blue Period.', 'Museu Picasso', 'Carrer de Montcada, 15-23', 'Barcelona', '2026-06-02 11:00:00', 12.00, FALSE, 'ACTIVE');

-- =========================================
-- SEED DATA: PROPOSALS
-- =========================================
-- Ivo creates a proposal for the Indie Concert in Montjuïc (Event ID: 1)
INSERT INTO proposals (group_id, event_id, creator_id, title, comment, meeting_point, transport_method, estimated_cost, proposed_datetime, voting_deadline, status, has_alternative_plan, alternative_plan) VALUES
(1, 1, 1, 'Proposal: Indie Concert in Montjuïc', 'Looks like a great plan: it’s cheap, nearby, and several of us love indie music. If it rains, we can swap it for an indoor exhibition.', 'Sants Estació', 'Metro L3 + Walking', 23.00, '2026-05-25 20:00:00', '2026-05-24 12:00:00', 'OPEN', TRUE, 'Indoor exhibition at CaixaForum or a nearby music bar');

-- =========================================
-- SEED DATA: PROPOSAL VOTES
-- =========================================
INSERT INTO proposal_votes (proposal_id, user_id, vote, comment) VALUES
(1, 1, 'YES', 'I’ll take care of grabbing the first round of tickets!'),
(1, 2, 'YES', 'I am in as long as it doesn’t rain, the weather forecast looks a bit sketchy.'),
(1, 3, 'NO', 'I’m traveling that weekend, have a great time everyone!'),
(1, 4, 'YES', 'Awesome plan! I really want to head up to Montjuïc.');