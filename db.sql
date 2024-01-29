DROP DATABASE IF EXISTS senior;

CREATE DATABASE senior;

USE senior

DROP SCHEMA IF EXISTS desafio;

CREATE SCHEMA desafio;


DROP TABLE IF EXISTS senior.desafio.Response;

CREATE TABLE senior.desafio.Response (
	id nvarchar(1000) COLLATE SQL_Latin1_General_CP1_CI_AS NOT NULL,
	request_id nvarchar(1000) COLLATE SQL_Latin1_General_CP1_CI_AS NOT NULL,
	respondent_id nvarchar(1000) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	status nvarchar(1000) COLLATE SQL_Latin1_General_CP1_CI_AS DEFAULT 'awaiting' NOT NULL,
	observation nvarchar(1000) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	created_at datetime2 DEFAULT getdate() NOT NULL,
	updated_at datetime2 NULL,
	deleted_at datetime2 NULL,
	CONSTRAINT Response_id_key UNIQUE (id),
	CONSTRAINT Response_pkey PRIMARY KEY (id),
	CONSTRAINT Response_request_id_key UNIQUE (request_id)
);

DROP TABLE IF EXISTS senior.desafio.[User];

CREATE TABLE senior.desafio.[User] (
	id nvarchar(1000) COLLATE SQL_Latin1_General_CP1_CI_AS NOT NULL,
	username nvarchar(1000) COLLATE SQL_Latin1_General_CP1_CI_AS NOT NULL,
	password nvarchar(1000) COLLATE SQL_Latin1_General_CP1_CI_AS NOT NULL,
	roles nvarchar(1000) COLLATE SQL_Latin1_General_CP1_CI_AS DEFAULT 'requester' NOT NULL,
	created_at datetime2 DEFAULT getdate() NOT NULL,
	updated_at datetime2 NULL,
	deleted_at datetime2 NULL,
	CONSTRAINT User_id_key UNIQUE (id),
	CONSTRAINT User_pkey PRIMARY KEY (id),
	CONSTRAINT User_username_key UNIQUE (username)
);


DROP TABLE IF EXISTS senior.desafio.[_prisma_migrations];

CREATE TABLE senior.desafio.[_prisma_migrations] (
	id varchar(36) COLLATE SQL_Latin1_General_CP1_CI_AS NOT NULL,
	checksum varchar(64) COLLATE SQL_Latin1_General_CP1_CI_AS NOT NULL,
	finished_at datetimeoffset NULL,
	migration_name nvarchar(250) COLLATE SQL_Latin1_General_CP1_CI_AS NOT NULL,
	logs nvarchar(MAX) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	rolled_back_at datetimeoffset NULL,
	started_at datetimeoffset DEFAULT getdate() NOT NULL,
	applied_steps_count int DEFAULT 0 NOT NULL,
	CONSTRAINT PK___prisma___3213E83F859185D9 PRIMARY KEY (id)
);


DROP TABLE IF EXISTS senior.desafio.Request;

CREATE TABLE senior.desafio.Request (
	id nvarchar(1000) COLLATE SQL_Latin1_General_CP1_CI_AS NOT NULL,
	user_id nvarchar(1000) COLLATE SQL_Latin1_General_CP1_CI_AS NOT NULL,
	name nvarchar(1000) COLLATE SQL_Latin1_General_CP1_CI_AS NOT NULL,
	description nvarchar(1000) COLLATE SQL_Latin1_General_CP1_CI_AS NOT NULL,
	price nvarchar(1000) COLLATE SQL_Latin1_General_CP1_CI_AS NOT NULL,
	response_id nvarchar(1000) COLLATE SQL_Latin1_General_CP1_CI_AS NOT NULL,
	created_at datetime2 DEFAULT getdate() NOT NULL,
	updated_at datetime2 NULL,
	deleted_at datetime2 NULL,
	CONSTRAINT Request_id_key UNIQUE (id),
	CONSTRAINT Request_pkey PRIMARY KEY (id),
	CONSTRAINT Request_response_id_fkey FOREIGN KEY (response_id) REFERENCES senior.desafio.Response(id) ON UPDATE CASCADE,
	CONSTRAINT Request_user_id_fkey FOREIGN KEY (user_id) REFERENCES senior.desafio.[User](id) ON UPDATE CASCADE
);