// path-to-your-custom-migration-provider

const { Client } = require('@prisma/client');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function createDatabaseAndSchema() {
  try {
    // Criar o banco de dados se não existir
    await prisma.$executeRaw`CREATE DATABASE IF NOT EXISTS Senior;`;

    // Alternativamente, você pode usar o SQL puro para criar o esquema
    await prisma.$executeRaw`USE Senior; CREATE SCHEMA IF NOT EXISTS desafio;`;

    console.log('Database and schema created successfully.');
  } catch (error) {
    console.error('Error creating database and schema:', error);
  } finally {
    await prisma.$disconnect();
  }
}

createDatabaseAndSchema();
