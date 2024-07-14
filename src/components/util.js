const baseURL = "https://api.memegen.link";

function getTemplate() {
  try {
    return fetch(`${baseURL}/templates?animated=false`).then((response) =>
      response.json()
    );
  } catch (error) {
    console.error(error);
  }
}

async function createMeme(templateId, text) {
  try {
    const options = {
      method: "POST",
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        text: text,
      }),
    };
    return fetch(`${baseURL}/templates/${templateId}`, options).then(
      (response) => response.json()
    );
  } catch (error) {
    console.error(error);
  }
}

module.exports = { getTemplate, createMeme };
