-- Enable UUID Extenstion
CREATE EXTENSION "uuid-ossp";

-- Create User Table
CREATE TABLE users (
    id UUID PRIMARY KEY NOT NULL DEFAULT uuid_generate_v4(),
    msisdn VARCHAR NOT NULL UNIQUE,
    fullname VARCHAR,
    image_url VARCHAR,
    birth_date DATE,
    gender VARCHAR,
    role VARCHAR NOT NULL DEFAULT 'FREE_USER',
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create OTP Table
CREATE TABLE verify_otp (
    id UUID PRIMARY KEY NOT NULL DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id),
    otp_code VARCHAR(6) NOT NULL,
    is_used BOOLEAN,
    expired_at TIMESTAMPTZ NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create Video Table
CREATE TABLE videos (
    id UUID NOT NULL DEFAULT uuid_generate_v4(),
    title VARCHAR NOT NULL,
    content TEXT,
    video_url VARCHAR NOT NULL,
    user_id UUID NOT NULL REFERENCES users(id),
    content_type VARCHAR NOT NULL,
    views INT NOT NULL DEFAULT 0,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);