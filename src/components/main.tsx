import React, { useEffect, useState } from "react";
import Img from "../images/meme.jpg";
import { getTemplate, createMeme } from "./util.js";

function Overview() {
  const [templates, setTemplate] = useState([]);
  const [templateId, setTemplateId] = useState("");
  const [texts, setTexts] = useState(["", ""]);
  const [url, setUrl] = useState("");

  const handleChange = (index, value) => {
    const newTexts = [...texts];
    newTexts[index] = value;
    setTexts(newTexts);
  };

  async function generateMeme() {
    const { url } = await createMeme(templateId, texts);
    console.log({ url });
    setUrl(url);
  }

  useEffect(() => {
    getTemplate()?.then((templates) => setTemplate(templates));
  }, []);

  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleTemplateClick = (id) => {
    setTemplateId(id);
    scrollToSection("section3");
  };

  return (
    <>
      <section id="section1" className="section">
        <h1>Unleash Your Creativity with Our Meme Generator!</h1>
        <h2>Choose an Image, Add Text, and Voila - Your Meme is Ready!</h2>
        <a href="#target" onClick={() => scrollToSection("section2")}>
          Create Your Meme Now!
        </a>
        <img src={Img} alt="Meme" />
      </section>

      <section id="section2" className="section">
        <h2 className="head2">Choose Your Template:</h2>
        <div className="image-container">
          {templates &&
            templates.map((template, index) => {
              const { id, blank } = template;
              return (
                <div
                  key={index}
                  className="template"
                  onClick={() => handleTemplateClick(id)}
                >
                  <img src={blank} className="img" alt="Template" />
                </div>
              );
            })}
        </div>
      </section>

      <section id="section3" className="section">
        <div className="search-area">
          <div className="second">
            <label htmlFor="text-top">Text on Top:</label>
            <input
              type="text"
              id="text-top"
              className="search-box box2"
              placeholder="Write your meme"
              onChange={(e) => handleChange(0, e.target.value)}
            />
          </div>
          <div className="third">
            <label htmlFor="text-bottom">Text on Bottom:</label>
            <input
              type="text"
              id="text-bottom"
              className="search-box box3"
              placeholder="Write your meme"
              onChange={(e) => handleChange(1, e.target.value)}
            />
          </div>
          <button className="btn2" onClick={generateMeme}>
            Generate
          </button>
        </div>
        {url && (
          <div className="meme-result">
            <h2 className="result-heading">Here's Your Meme:</h2>
            <img src={url} alt="Generated Meme" />
          </div>
        )}
      </section>
    </>
  );
}

export default Overview;
