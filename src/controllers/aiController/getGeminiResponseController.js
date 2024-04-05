import { genAI } from "../../constants.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
import { asyncHandler } from "../../utils/asyncHandler.js";

const getAIResponse = asyncHandler(
    async (req, res) => {
        const { question } = req.body;
        if (!question || question.length < 2) {
            console.log("Inside if");
            return res.status(200).json(new ApiResponse(200, "Invalid question", { message: "Give complete valid question with some context" }));
        }
        try {
            const model = genAI.getGenerativeModel({ model: "gemini-pro" });
            const result = await model.generateContent(question + "tell me in a single para");
            const response = await result.response;
            const text = response.text();
            return res.status(200).json(new ApiResponse(200, "Got the response", { message: text }));
        }
        catch (err) {
            return res.status(200).json(new ApiResponse(500, "Issue at server", {}));
        }
    }
);

export {
    getAIResponse
};
