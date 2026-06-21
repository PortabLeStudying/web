const http = require("http");

const PORT = process.env.PORT || 3000;

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET,POST,PUT,DELETE,OPTIONS",
  "Access-Control-Allow-Headers":
    "x-test,ngrok-skip-browser-warning,Content-Type,Accept,Access-Control-Allow-Headers",
  "Content-Type": "application/json",
};

function readBody(request) {
  return new Promise((resolve, reject) => {
    let body = "";

    request.setEncoding("utf8");
    request.on("data", (chunk) => {
      body += chunk;
    });
    request.on("end", () => resolve(body));
    request.on("error", reject);
  });
}

const server = http.createServer(async (request, response) => {
  try {
    const url = new URL(request.url, `http://${request.headers.host || "localhost"}`);
    const body = await readBody(request);

    if (url.pathname === "/result4/") {
      response.writeHead(200, corsHeaders);
      response.end(
        JSON.stringify({
          message: "1154070",
          "x-result": request.headers["x-test"] || "",
          "x-body": body,
        })
      );
      return;
    }

    response.writeHead(404, corsHeaders);
    response.end(JSON.stringify({ error: "not found" }));
  } catch (error) {
    response.writeHead(500, corsHeaders);
    response.end(JSON.stringify({ error: "server error" }));
  }
});

server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}/result4/`);
});
