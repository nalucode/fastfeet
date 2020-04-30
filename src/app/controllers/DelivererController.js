import * as Yup from 'yup';
import { Op } from 'sequelize';
import Deliverer from '../models/Deliverer';
import File from '../models/File';

class DelivererController {
  async index(req, res) {
    const schema = Yup.object().shape({
      email: Yup.string().email(),
      name: Yup.string(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json('Validation fails');
    }

    const { page = 1 } = req.query;
    const { email, name } = req.body;

    let search;

    if (email || name) {
      search = {
        where: email
          ? { email }
          : {
              name: {
                [Op.regexp]: `[${name.substr(0, 1).toLowerCase()}|${name
                  .substr(0, 1)
                  .toUpperCase()}]${name.substr(1)}`,
              },
            },
        order: ['id'],
        limit: 20,
        offset: (page - 1) * 20,
        attributes: ['id', 'email', 'name'],
        include: [
          {
            model: File,
            as: 'avatar',
            attributes: ['path', 'name', 'url'],
          },
        ],
      };
    } else if (!email && !name) {
      search = {
        order: ['id'],
        limite: 20,
        offset: (page - 1) * 20,
        attributes: ['id', 'email', 'name'],
        include: [
          {
            model: File,
            as: 'avatar',
            attributes: ['path', 'name', 'url'],
          },
        ],
      };
    }

    const deliverers = await Deliverer.findAll(search);

    return res.json(deliverers);
  }

  async show(req, res) {
    const { id } = req.params;
    const deliverer = await await Deliverer.findOne({
      where: { id },
      attributes: ['id', 'email', 'name'],
      include: [
        {
          model: File,
          as: 'avatar',
          attributes: ['name', 'path', 'url'],
        },
      ],
    });

    if (!deliverer) {
      return res.status(404).json({ error: 'Deliverer not found' });
    }

    return res.json(deliverer);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string()
        .email()
        .required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }
    const delivererExists = await Deliverer.findOne({
      where: { email: req.body.email },
    });

    if (delivererExists) {
      return res.status(400).json({ error: 'Deliverer already exists' });
    }

    const deliverer = await Deliverer.create(req.body);
    return res.json(deliverer);
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string(),
      email: Yup.string().email(),
      avatar_id: Yup.number(),
    });

    if (!(await schema.isValid(req.body))) {
      res.status(400).json({ error: 'Validation fails' });
    }
    const { email } = req.body;

    const deliverer = await Deliverer.findByPk(req.params.id);

    if (email && email !== deliverer.email) {
      const delivererExists = await Deliverer.findOne({
        where: { email },
      });

      if (delivererExists) {
        return res.status(400).json({ error: 'User already exists' });
      }
    }
    const { id, name } = await deliverer.update(req.body);

    return res.json({ id, name, email });
  }

  async delete(req, res) {
    const deliverer = await Deliverer.findByPk(req.params.id);

    if (!deliverer) {
      return res.status(400).json({
        error: 'This deliverer does not exists',
      });
    }

    await deliverer.destroy({ where: { id: req.params.id } });
    return res.json({ name: deliverer.name, email: deliverer.email });
  }
}

export default new DelivererController();
