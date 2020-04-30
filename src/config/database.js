module.exports = {
  dialect: 'postgres',
  host: 'localhost',
  username: 'admin',
  port: '5432',
  password: 'admin',
  database: 'fastfeet',
  define: {
    timestamps: true,
    underscored: true,
    underscoredAll: true,
  },
};
