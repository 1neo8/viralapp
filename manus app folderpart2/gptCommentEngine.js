import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: "***REMOVED***mHwjAxZxudS782M76GG4jnsWQ0Z8Pwq6wBy9VF7Hx-P0-ApjTFPPY9xG0uFfhmGN9ZuULv3jZ1T3BlbkFJRnBLT3Yk5zW9_hXAllz9hakDwMHjn7tzyRtCUbZPrHp3dac-2-QT3JllMqLYll_f-cotkBbN4A",
});

const openai = new OpenAIApi(configuration);

export async function generateComment(tone = "fanboy", influencer = "JessicaLive", topic = "livestream") {
  try {
    const prompt = `Generate a short ${tone} style comment for a fake livestream hosted by ${influencer} on the topic "${topic}". Make it sound like a real chat message.`;

    const response = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.9,
      max_tokens: 30,
    });

    const comment = response.data.choices[0].message.content.trim();
    return comment;
  } catch (error) {
    console.error("GPT comment error:", error);
    return null;
  }
}
