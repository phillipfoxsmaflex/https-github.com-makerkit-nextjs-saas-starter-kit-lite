-- Student table
CREATE TABLE IF NOT EXISTS student (
    student_id  uuid UNIQUE NOT NULL DEFAULT extensions.uuid_generate_v4(),
    name        VARCHAR(255) NOT NULL,
    email       VARCHAR(320) UNIQUE,
    account_id  uuid REFERENCES accounts (id)
);
