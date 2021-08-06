import { SiteClient } from "datocms-client";

const TOKEN = "ce0e5427e9e16cea1d92f5d5bbb7be";

class ChatbotController {

  static async CriarLista (parameters){
    const name = parameters.cliente_nome.name;
    const ModelId = "1045539";
    
    try {
      const client = new SiteClient(TOKEN);
      const record = await client.items.create({
        itemType: ModelId,
        name
      });

      console.log(record);
      if(record)
        return `Lista ${name} criada com sucesso!`;
    } catch (err){
      console.log(err);
    }

    return `Desculpe, mas não foi possível criar a lista ${name}`;
  }

  static async processRequest(req, res) {
    if (!req.body)
      return res.status(400).json({ message: "Erro na requisição." });

    const intent = req.body.queryResult.intent.displayName;
    const parameters = req.body.queryResult.parameters;
    let message = '';

    console.log(intent);
    console.log(parameters);

    if (intent && intent.toLowerCase() == "criar lista") {
      message = await this.CriarLista(parameters);
    }

    console.log(message);

    res.status(200).json({
      fulfillmentMessages: [
        {
          text: {
            text: [
              message,
            ],
          },
        },
      ],
    });
  }
}

export default ChatbotController;


/*
fetch('https://graphql.datocms.com/', {
      method: 'POST',
      headers: {
        'Authorization': 'bfa98b2226adb28aea9d378d36adc8',
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({ "query": `query {
        allCommunities {
          id
          title 
          imageUrl
          creatorSlug
        }
      }` })
    })
    .then(res => res.json())
    .then(res => {
      setComunidades(res.data.allCommunities);
    });
*/