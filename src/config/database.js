module.exports = {
  dialect: 'postgres',
  host: 'localhost',
  username: 'luan',
  port: '5433',
  password: 'docker',
  database: 'fastfeet',
  define: {
    timestamps: true,
    underscored: true,
    underscoredAll: true,
  },
};
