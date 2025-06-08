require('dotenv').config();

const express = require('express');
const cors = require('cors');
const OpenAI = require('openai');

const app = express();

app.use(cors());
app.use(express.json());

const apiKey = process.env.GEMINI_API_KEY;
const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;

app.post('/generatedietplan', async (req, res) => {
  const body = req.body;
  if (!body) {
    return res.status(400).json({ message: 'User preferences and health goals are required.' });
  }
  try {
    const prompt = `Based on weight,height,gender,goal, give me calories and proteins need daily consider me as 35 years of age following 
                    are the details : height = ${body.height}cm, weight = ${body.weight}kg ,goal: ${body.goal}, gender : ${body.gender}. Give me result
                    that has only daily consumption of proteins and calories in JSON format and follow 
                    the schema { Calories:<> in kcal, proteins : <> grams} Only give me json part dont give explanation and calculation`;


    const payload = {
      contents: [{ role: "user", parts: [{ text: prompt }] }],
      generationConfig: {
      }
    };

    const geminiResponse = await fetch(apiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    if (!geminiResponse.ok) {
      const errorText = await geminiResponse.text();
      console.error("Gemini API error:", geminiResponse.status, errorText);
      return res.status(geminiResponse.status).json({ message: "Failed to generate diet plan from AI.", details: errorText });
    }

    const geminiResult = await geminiResponse.json();

    if (geminiResult.candidates && geminiResult.candidates.length > 0 &&
      geminiResult.candidates[0].content && geminiResult.candidates[0].content.parts &&
      geminiResult.candidates[0].content.parts.length > 0) {
      const dietPlanText = geminiResult.candidates[0].content.parts[0].text;
      res.status(200).json({ dietPlan: dietPlanText });
    } else {
      console.error("Gemini API response structure unexpected:", geminiResult);
      res.status(500).json({ message: "AI response format was unexpected." });
    }

  } catch (error) {
    console.error('Error calling Gemini API:', error);
    res.status(500).json({ message: 'Internal server error while processing AI request.' });
  }
});



app.post('/generateImage', async (req, res) => {
  const titleArray = req.body.prompt;
  const generatedImage = new Array();
  const client = new OpenAI({
    baseURL: 'https://api.studio.nebius.com/v1/',
    apiKey: process.env.NEMBIUS_API_KEY,
  });
  for (var i = 0; i < 3; i++) {
    const prompt = titleArray[i]
    client.images.generate({
      "model": "stability-ai/sdxl",
      "response_format": "url",
      "response_extension": "png",
      "width": 1024,
      "height": 1024,
      "num_inference_steps": 30,
      "negative_prompt": "",
      "seed": -1,
      "prompt": prompt
    }).then((response) => {
        generatedImage.push(response.data[0].url);
        if (generatedImage.length == 3) {
          return res.status(200).json({generatedIMG : generatedImage});
        }
      })

  }
})


app.post('/generaterecepie', async (req, res) => {
  const { prompt } = req.body;
  if (!prompt || typeof prompt !== 'string' || prompt.trim() === '') {
    return res.status(400).json({ message: 'Recipe prompt is required and must be a non-empty string.' });
  }
  try {

    const payload = {
      contents: [{
        role: "user",
        parts: [{
          text: `Generate 3 detailed recipes based on the following request: "${prompt}".
                 For each recipe, include ingredients, step-by-step instructions, and approximate cooking time.
                 Provide the response as a JSON array where each object in the array represents one recipe and has the following keys:,
                 'title', 'ingredients' (as a single string),'recipeInstructions' (as a single string),'calories' and 'proteins'. 
                 Provide exact Calories (cal) and exact Proteins (g) and not the approximate value`
        }]
      }],
      generationConfig: {
        responseMimeType: "application/json",
        responseSchema: {
          type: "ARRAY",
          items: {
            type: "OBJECT",
            properties: {
              title: { type: "STRING" },
              ingredients: { type: "STRING" },
              recipeInstructions: { type: "STRING" },
              calories: { type: "STRING" },
              proteins: { type: "STRING" }
            },
            required: ["title", "ingredients", "recipeInstructions", "calories", "proteins"]
          }
        }
      }
    };


    const geminiResponse = await fetch(apiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });


    if (!geminiResponse.ok) {
      const errorText = await geminiResponse.text();
      console.error("Gemini API call failed with status:", geminiResponse.status, "Error:", errorText);
      return res.status(geminiResponse.status).json({ message: "Failed to get recipe from AI model.", details: errorText });
    }

    const geminiResult = await geminiResponse.json();

    if (geminiResult.candidates && geminiResult.candidates.length > 0 &&
      geminiResult.candidates[0].content && geminiResult.candidates[0].content.parts &&
      geminiResult.candidates[0].content.parts.length > 0) {
      const generatedRecipeText = JSON.parse(geminiResult.candidates[0].content.parts[0].text);
      res.status(200).json({ recipe: generatedRecipeText });

    } else {
      console.warn("Gemini API response structure unexpected or no candidates:", geminiResult);
      res.status(500).json({ message: "AI response was empty or in an unexpected format. Please try again." });
    }

  } catch (error) {
    console.error('Error during /generate-recipe API call:', error);
    res.status(500).json({ message: 'Internal server error while generating recipe.' });
  }

})
app.listen(3001, () => {
  console.log("Listening on port 3001")
})