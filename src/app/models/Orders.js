import Sequelize, { Model } from 'sequelize';
import {} from 'date-fns';

class Order extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        email: Sequelize.STRING,
        recipient_id: Sequelize.NUMBER,
        deliverer_id: Sequelize.NUMBER,
        signature_id: Sequelize.NUMBER,
        product: Sequelize.STRING,
        canceled_at: Sequelize.DATE,
        start_date: Sequelize.DATE,
        end_date: Sequelize.DATE,
        redeemable: {
          type: Sequelize.VIRTUAL,
          get() {},
        },
      },
      {
        sequelize,
      }
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.Deliverer, {
      foreignKey: 'deliverer_id',
      as: 'deliverer',
    });
    this.belongsTo(models.Recipient, {
      foreignKey: 'recipient_id',
      as: 'recipient',
    });
  }
}

export default Order;
