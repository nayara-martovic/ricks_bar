
import ChatbotController from "../../src/controllers/chatbot_controller";

function postHandle(req, res) {
  ChatbotController.processRequest(req, res);  
}

function getHandle(req, res) {
  res.status(200).json({ message: 'Bem-vindo a Ricks Bar API!' });
}

export default function handleChatbot(req, res) {
  if (req.method === 'POST') {
    postHandle(req, res);
  } else if (req.method === 'GET') {
    getHandle(req, res);
  } else {
    res.status(400).json({ message: 'Erro na requisição.' });
  }
};
