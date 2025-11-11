"use client";
import React, { useEffect, useRef } from "react";
import NavBar from "../components/navbar";
import Footer from "../components/footer";

function EmbeddedChatBot() {
  const gradioRef = useRef(null);

  useEffect(() => {
    // Listen for iframe load (Gradio app fully rendered)
    const checkIframeLoaded = () => {
      const iframe = gradioRef.current?.querySelector("iframe");
      if (iframe) {
        iframe.addEventListener("load", () => {
          // Scroll to top once Gradio fully loads
          window.scrollTo({ top: 0, behavior: "smooth" });
        });
      } else {
        // Retry after short delay if iframe not yet in DOM
        setTimeout(checkIframeLoaded, 4500);
      }
    };

    checkIframeLoaded();
  }, []);

  return (

    <div className="bg-transparent min-h-screen flex flex-col">
      <NavBar />

      <main className="flex-grow">
        <div
          ref={gradioRef}
          className="bg-black"
          style={{
            maxWidth: 1200,
            margin: "40px auto",
            border: "1px solid #ddd",
            borderRadius: 8,
            padding: 16,
            minHeight: "600px", // prevent collapsing
            overflow: "hidden",
          }}
        >
          {/* Load Gradio script */}
          <script
            type="module"
            src="https://gradio.s3-us-west-2.amazonaws.com/5.49.1/gradio.js"
          ></script>

          {/* Embed chatbot */}
          <gradio-app src="https://soumyasuryan-women-entrepreneur-chatbot.hf.space"></gradio-app>
        </div>
      </main>

      <Footer />
    </div>

  );
}

export default EmbeddedChatBot;
