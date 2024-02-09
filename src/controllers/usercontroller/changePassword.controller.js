import { User } from "../../models/user.model.js";
import { ApiError } from "../../utils/ApiError.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
import { asyncHandler } from "../../utils/asyncHandler.js";

const changePassword = asyncHandler(
    async (req, res) => {
        const { password } = req.body;
        if (!password) {
            throw new ApiError(401, "Give new password");
        }
        try {
            const userToUpdate = await User.findById(
                req.user?._id,
            );
            userToUpdate.password = password;
            const afterUpdate = await userToUpdate.save();
        } catch (err) {
            throw new ApiError(401, "Give valid password");
        }
        return res.status(200).json(new ApiResponse(200, "Password updated successfully", {}));
    }
);

export { changePassword };