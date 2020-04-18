module.exports = {
  up: queryInterface => {
    return queryInterface.bulkInsert(
      'recipients',
      [
        {
          name: 'Roberto Ferreira',
          andress: 'Rua Godoy Santos, Jardim Planalto',
          complement: 'Apartamento 8, Bloco A',
          number: '1003',
          city: 'Belo Horizonte',
          state: 'MG',
          cep: '13878-452',
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    );
  },

  down: () => {},
};
