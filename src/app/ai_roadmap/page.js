"use client";
import React from "react";

function EmbeddedChatBot() {
  return (
    <div className="bg-pink-100 pt-10 pb-20">
    <div className="bg-black" style={{ maxWidth: 1200, margin: "40px auto", border: "1px solid #ddd", borderRadius: 8, padding: 16 }}>
      

      <script
        type="module"
        src="https://gradio.s3-us-west-2.amazonaws.com/5.49.1/gradio.js"
      ></script>

      {/* Embed the Gradio app for your Space */}
      <gradio-app src="https://soumyasuryan-women-entrepreneur-chatbot.hf.space"></gradio-app>
    </div>
    </div>
  );
}

export default EmbeddedChatBot;
