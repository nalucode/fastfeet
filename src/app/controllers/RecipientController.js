import Recipient from '../models/Recipient';

class RecipientController {
  async store(req, res) {
    const recipient = await Recipient.create(req.body);

    return res.json(recipient);
  }

  async update(req, res) {
    const recipientExists = await Recipient.findOne({
      where: req.body,
    });

    if (!recipientExists) {
      res.status(404).json({ error: 'Recipient does not found.' });
    }

    const recipient = Recipient.update(req.body);

    res.json(recipient);
  }
}

export default new RecipientController();
