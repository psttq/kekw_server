import { Game } from "./Game.ts";
import { GameObject } from "./GameObject.ts";

const game = new Game();
const clients = new Set<WebSocket>(); 

Deno.serve((req) => {
  if (req.headers.get("upgrade") != "websocket") {
    return new Response(null, { status: 501 });
  }
  const { socket, response } = Deno.upgradeWebSocket(req, {});

  clients.add(socket);

  socket.addEventListener("open", (e) => {
    console.log("a client connected!");
    const new_player = new GameObject(game.gameObjects.length, {x: game.gameObjects.length*10, y:game.gameObjects.length*10});
    game.addGameObject(new_player);
    socket.send(JSON.stringify(game.serialize()));
  });

  socket.addEventListener("message", (event) => {
    console.log(event.data);
    let data = JSON.parse(event.data);
    let go = game.gameObjects.find((x)=>x.id === data.id);
    if(go){
      go.position.x = data.mouse_x;
      go.position.y = data.mouse_y;
      socket.send(JSON.stringify(game.serialize()));
    }
    
  });
  return response;
});

setInterval(() => {
  const serializedGame = JSON.stringify(game.serialize());
  for (const client of clients) {
    if (client.readyState === WebSocket.OPEN) {
      client.send(serializedGame);
    }
  }
}, 4); // Send every second
