
export default function handle(req, res) {
  if (req.method == 'POST' && req.body) {
    const intent = req.body.queryResult.intent.displayName;
    const parameters = req.body.queryResult.parameters;

    console.log(intent);
    console.log(parameters);

    if (intent && intent.toLowerCase() == "criar lista") {
      res.status(200).json({
        fulfillmentMessages: [
          {
            text: {
              text: [
                `Lista ${parameters.cliente_nome.name} criada com sucesso!`,
              ],
            },
          },
        ],
      });
    } else {
      res.status(200).json({
        fulfillmentMessages: [
          {
            text: {
              text: ["Text response from webhook da Nana"],
            },
          },
        ],
      });
    }
  } else {
    res.status(200).json({ message: 'Welcome to the Ricks Bar API' });
  }
};
