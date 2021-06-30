DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS posts;
CREATE TABLE users (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    email TEXT NOT NULL,
    password_hash TEXT NOT NULL,
    profile_photo_url TEXT NOT NULL
);
CREATE TABLE posts (
    user_id BIGINT NOT NULL,
    photo_url TEXT NOT NULL,
    caption TEXT NOT NULL,
    tags TEXT NOT NULL
);