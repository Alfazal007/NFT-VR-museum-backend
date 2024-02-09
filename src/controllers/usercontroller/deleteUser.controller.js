import { User } from "../../models/user.model.js";
import { ApiError } from "../../utils/ApiError.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
import { asyncHandler } from "../../utils/asyncHandler.js";

const deleteUser = asyncHandler(
    async (req, res) => {
        const userId = req.user?._id;
        if (!userId) {
            throw new ApiError(401, "No user found");
        }
        await User.findByIdAndDelete(userId);
        return res.status(200).json(new ApiResponse(200, "Get out, dont come back", {}));
    }
);


export { deleteUser };