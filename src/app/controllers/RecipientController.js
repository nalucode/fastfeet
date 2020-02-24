import * as Yup from 'yup';
import Recipient from '../models/Recipient';

class RecipientController {
  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      andress: Yup.string().required(),
      complement: Yup.string().required(),
      number: Yup.string().required(),
      city: Yup.string().required(),
      state: Yup.string().required(),
      cep: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails.' });
    }

    const recipient = await Recipient.create(req.body);

    return res.json(recipient);
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string(),
      andress: Yup.string(),
      complement: Yup.string().when('andress', (andress, field) =>
        andress ? field.required() : field
      ),
      number: Yup.string().when('andress', (andress, field) =>
        andress ? field.required() : field
      ),
      city: Yup.string().when('andress', (andress, field) =>
        andress ? field.required() : field
      ),
      state: Yup.string().when('andress', (andress, field) =>
        andress ? field.required() : field
      ),
      cep: Yup.string().when('andress', (andress, field) =>
        andress ? field.required() : field
      ),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails.' });
    }
    const recipientExists = await Recipient.findOne({
      where: req.body,
    });

    if (!recipientExists) {
      return res.status(404).json({ error: 'Recipient does not found.' });
    }

    const recipient = Recipient.update(req.body);

    return res.json(recipient);
  }
}

export default new RecipientController();
