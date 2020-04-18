module.exports = {
  up: queryInterface => {
    return queryInterface.bulkInsert(
      'deliverers',
      [
        {
          name: 'Geraldo Martins',
          email: 'geraldo_m@fastfeet.com',
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    );
  },

  down: () => {},
};
