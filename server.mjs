import http2 from "node:http2";
import fs from "node:fs";

async function* generateEvents() {
  while (true) {
    await new Promise((resolve) => setTimeout(resolve, 1000)); // simulate delay
    yield { time: new Date().toISOString() };
  }
}

const server = http2.createSecureServer({
  key: fs.readFileSync(".secrets/localhost-privkey.pem"),
  cert: fs.readFileSync(".secrets/localhost-cert.pem"),
});

server.on("stream", async (stream, headers) => {
  if (headers[":path"] === "/") {
    console.log("serving index.html");
    const indexPath = "./index.html";
    stream.respondWithFile(
      indexPath,
      {
        "content-type": "text/html",
      },
      {
        onError: (err) => stream.end("Error loading index.html"),
      }
    );
  } else if (headers[":path"] === "/events") {
    console.log('setting up events')
    stream.respond({
      "content-type": "text/event-stream",
      "cache-control": "no-cache",
    });

    try {
      for await (const event of generateEvents()) {
        console.log(event);
        if (stream.writableEnded) break; // Check if the stream has ended
        stream.write(`data: ${JSON.stringify(event)}\n\n`);
      }
    } catch (err) {
      console.error(err); // handle potential errors
    }
  } else {
    stream.respond({ ":status": 404 });
    stream.end("Not Found");
  }
});

server.listen(3000, () => {
  console.log("Server running on https://localhost:3000");
});
