import { server } from "./app";
import './websockets/ChatService';

server.listen(3000, () => {
  console.log('🚀 Server is running on port 3333')
});