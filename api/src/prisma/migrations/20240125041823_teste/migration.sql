BEGIN TRY

BEGIN TRAN;

-- CreateTable
CREATE TABLE [desafio].[User] (
    [id] NVARCHAR(1000) NOT NULL,
    [username] NVARCHAR(1000) NOT NULL,
    [password] NVARCHAR(1000) NOT NULL,
    [roles] NVARCHAR(1000) NOT NULL CONSTRAINT [User_roles_df] DEFAULT 'user',
    [created_at] DATETIME2 NOT NULL CONSTRAINT [User_created_at_df] DEFAULT CURRENT_TIMESTAMP,
    [updated_at] DATETIME2 NOT NULL,
    [deleted_at] DATETIME2 NOT NULL,
    CONSTRAINT [User_pkey] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [User_id_key] UNIQUE NONCLUSTERED ([id]),
    CONSTRAINT [User_username_key] UNIQUE NONCLUSTERED ([username])
);

-- CreateTable
CREATE TABLE [desafio].[Request] (
    [id] NVARCHAR(1000) NOT NULL,
    [user_id] NVARCHAR(1000) NOT NULL,
    [description] NVARCHAR(1000) NOT NULL,
    [price] NVARCHAR(1000) NOT NULL,
    [created_at] DATETIME2 NOT NULL CONSTRAINT [Request_created_at_df] DEFAULT CURRENT_TIMESTAMP,
    [updated_at] DATETIME2 NOT NULL,
    [deleted_at] DATETIME2 NOT NULL,
    CONSTRAINT [Request_pkey] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [Request_id_key] UNIQUE NONCLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [desafio].[Response] (
    [id] NVARCHAR(1000) NOT NULL,
    [request_id] NVARCHAR(1000) NOT NULL,
    [respondent_id] NVARCHAR(1000) NOT NULL,
    [confirmed] NVARCHAR(1000) NOT NULL,
    [observation] NVARCHAR(1000) NOT NULL,
    [created_at] DATETIME2 NOT NULL CONSTRAINT [Response_created_at_df] DEFAULT CURRENT_TIMESTAMP,
    [updated_at] DATETIME2 NOT NULL,
    [deleted_at] DATETIME2 NOT NULL,
    CONSTRAINT [Response_pkey] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [Response_id_key] UNIQUE NONCLUSTERED ([id])
);

-- AddForeignKey
ALTER TABLE [desafio].[Request] ADD CONSTRAINT [Request_user_id_fkey] FOREIGN KEY ([user_id]) REFERENCES [desafio].[User]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [desafio].[Response] ADD CONSTRAINT [Response_request_id_fkey] FOREIGN KEY ([request_id]) REFERENCES [desafio].[Request]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
