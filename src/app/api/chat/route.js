import axios from "axios";

export async function POST(req) {
  try {
    const { message } = await req.json();
    const apiKey = process.env.GEMMA_API_KEY;
    if (!apiKey) throw new Error("API key is missing. Check your environment variables.");

    // Create a single prompt that includes your system instruction and the user's message.
    const promptText = `You are an expert-level digital agency assistant representing Getimagin Digital Agency. Always provide responses that are valuable, extremely concise, and summarized. Keep your answers very short and to the point, while ensuring they reflect Getimagin's expertise.
User: ${message}
AI:`;

    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
      { prompt: { text: promptText } }
    );

    // Extract candidate response text from each part's 'text' property.
    const candidate = response.data.candidates && response.data.candidates[0];
    const reply =
      candidate &&
      candidate.content &&
      candidate.content.parts &&
      Array.isArray(candidate.content.parts)
        ? candidate.content.parts.map((part) => part.text).join(" ")
        : "No response generated.";

    return new Response(JSON.stringify({ reply }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error:", error);
    return new Response(JSON.stringify({ error: error.response?.data || error.message }), {
      status: error.response?.status || 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
