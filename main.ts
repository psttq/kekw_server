import { Client } from "./Client.ts";
import { Game } from "./Game.ts";
import { GameObject } from "./GameObject.ts";

const game = new Game();

const clients = new Set<Client>();

Deno.serve({port: 8123},(req) => {
  if (req.headers.get("upgrade") != "websocket") {
    return new Response(null, { status: 501 });
  }
  const { socket, response } = Deno.upgradeWebSocket(req, {});
  let ball = new GameObject(game.currentIDStack, {x:0,y:0});
  let client = new Client(socket, undefined,ball);
  game.addGameObject(ball);

  clients.add(client);

  socket.addEventListener("open", (e) => {
    console.log("a client connected!");
    const new_player = new GameObject(game.currentIDStack, {
      x: 100,
      y: 100
    });
    game.addGameObject(new_player);
    client.gameObject = new_player;
    const data = {
      playerId: new_player.id,
      game: game.serialize(),
    };

    socket.send(JSON.stringify(data));
  });

  socket.addEventListener("close", (e) => {
    if (client.gameObject !== undefined) {
      console.log("a client", client.gameObject.id, "disconnected!");
      game.removeGameObject(client.ball);
      game.removeGameObject(client.gameObject);
      clients.delete(client);
    }
  });

  socket.addEventListener("message", (event) => {
    let data = JSON.parse(event.data);
    let go = game.gameObjects.find((x) => x.id === data.id);
    if (go) {
      // go.setPosition({x: data.mouse_x, y: data.mouse_y});
      client.update(data.mouse_x, data.mouse_y);
    }
  });
  return response;
});

let lastTime = Temporal.Now.instant().epochMilliseconds;

setInterval(() => {
  for (const client of clients) {
    if (client.gameObject !== undefined) {
      const data = {
        playerId: client.gameObject.id,
        game: game.serialize(),
      };
      client.socket.send(JSON.stringify(data));
    }
  }
  const currentTime = Temporal.Now.instant().epochMilliseconds;
  game.update((currentTime-lastTime)*10);
  lastTime = currentTime;
}, 16); // Send every second
