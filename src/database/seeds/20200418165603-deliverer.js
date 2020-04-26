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
        {
          name: 'Mario Paulo',
          email: 'mario_p@fastfeet.com',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: 'João Dória',
          email: 'joao_d@fastfeet.com',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: 'Gabriela Calote',
          email: 'gabriela_c@fastfeet.com',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: 'Paola Martins',
          email: 'paola_m@fastfeet.com',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: 'Fernanda Silva',
          email: 'Fernanda_s@fastfeet.com',
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    );
  },

  down: () => {},
};
