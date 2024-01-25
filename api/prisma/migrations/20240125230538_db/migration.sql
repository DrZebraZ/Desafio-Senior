BEGIN TRY

BEGIN TRAN;

-- CreateTable
CREATE TABLE [desafio].[User] (
    [id] NVARCHAR(1000) NOT NULL,
    [username] NVARCHAR(1000) NOT NULL,
    [password] NVARCHAR(1000) NOT NULL,
    [roles] NVARCHAR(1000) NOT NULL CONSTRAINT [User_roles_df] DEFAULT 'requester',
    [created_at] DATETIME2 NOT NULL CONSTRAINT [User_created_at_df] DEFAULT CURRENT_TIMESTAMP,
    [updated_at] DATETIME2,
    [deleted_at] DATETIME2,
    CONSTRAINT [User_pkey] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [User_id_key] UNIQUE NONCLUSTERED ([id]),
    CONSTRAINT [User_username_key] UNIQUE NONCLUSTERED ([username])
);

-- CreateTable
CREATE TABLE [desafio].[Request] (
    [id] NVARCHAR(1000) NOT NULL,
    [user_id] NVARCHAR(1000) NOT NULL,
    [name] NVARCHAR(1000) NOT NULL,
    [description] NVARCHAR(1000) NOT NULL,
    [price] NVARCHAR(1000) NOT NULL,
    [response_id] NVARCHAR(1000) NOT NULL,
    [created_at] DATETIME2 NOT NULL CONSTRAINT [Request_created_at_df] DEFAULT CURRENT_TIMESTAMP,
    [updated_at] DATETIME2,
    [deleted_at] DATETIME2,
    CONSTRAINT [Request_pkey] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [Request_id_key] UNIQUE NONCLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [desafio].[Response] (
    [id] NVARCHAR(1000) NOT NULL,
    [request_id] NVARCHAR(1000) NOT NULL,
    [respondent_id] NVARCHAR(1000),
    [status] NVARCHAR(1000) NOT NULL CONSTRAINT [Response_status_df] DEFAULT 'awaiting',
    [observation] NVARCHAR(1000),
    [created_at] DATETIME2 NOT NULL CONSTRAINT [Response_created_at_df] DEFAULT CURRENT_TIMESTAMP,
    [updated_at] DATETIME2,
    [deleted_at] DATETIME2,
    CONSTRAINT [Response_pkey] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [Response_id_key] UNIQUE NONCLUSTERED ([id]),
    CONSTRAINT [Response_request_id_key] UNIQUE NONCLUSTERED ([request_id])
);

-- AddForeignKey
ALTER TABLE [desafio].[Request] ADD CONSTRAINT [Request_user_id_fkey] FOREIGN KEY ([user_id]) REFERENCES [desafio].[User]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [desafio].[Request] ADD CONSTRAINT [Request_response_id_fkey] FOREIGN KEY ([response_id]) REFERENCES [desafio].[Response]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
