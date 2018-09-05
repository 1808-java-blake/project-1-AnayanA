CREATE SCHEMA ers;

SET SCHEMA 'ers';

CREATE TABLE user_roles (
	user_role_id serial PRIMARY KEY,
	user_role VARCHAR(10)
);

SET SCHEMA 'ers';

CREATE TABLE users (
	users_id SERIAL PRIMARY KEY,
	username VARCHAR(50) UNIQUE NOT NULL,
	pass VARCHAR(50) NOT NULL,
	first_name VARCHAR(100) NOT NULL,
	last_name VARCHAR(100) NOT NULL,
	user_email VARCHAR(150) NOT NULL,
	user_role_id INTEGER references user_roles(user_role_id)
);

CREATE TABLE reimbursement_status (
	status_id SERIAL PRIMARY KEY,
	status VARCHAR(10) NOT NULL
);

CREATE TABLE reimbursement_type (
	type_id SERIAL PRIMARY KEY,
	reimb_type VARCHAR(10) NOT NULL
);

CREATE TABLE reimbursement (
	reimb_id serial PRIMARY KEY,
	reimb_amount INTEGER NOT NULL,
	reimb_submitted TIMESTAMP NOT NULL,
	reimb_resolved TIMESTAMP,
	reimb_description VARCHAR(250),
	reimb_author INTEGER references users(users_id) NOT NULL,
	reimb_resolver INTEGER references users(users_id),
	reimb_status_id INTEGER references reimbursement_status(status_id) NOT NULL,
	reimb_type_id INTEGER references reimbursement_type(type_id) NOT NULL
)
