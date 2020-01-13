require('dotenv/config');

module.exports = {
  dialect: 'postgres',
  host: process.env.DB_HOST, //este ip se tiver usando docker toolbox senão coloque 'localhost'
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  define: {
    timestamps: true,
    underscored: true, //força nome da tabela em caixa baixa e _
    underscoredAll: true, // faz a mesma coisa com colunas
  },
};
