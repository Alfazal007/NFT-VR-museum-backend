import { User } from "../../models/user.model.js";
import { ApiError } from "../../utils/ApiError.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { uploadOnCloudinary, deleteFromCloudinary } from "../../utils/cloudImage.js";

const changeAvatar = asyncHandler(
    async (req, res) => {
        let avatarLocalPath = "";
        if (!req.file) {
            throw new ApiError(400, "Provide an image to change the avatar");
        }
        avatarLocalPath = req.file.path;
        // remove existing image from cloud
        if (req.user.avatar) {
            await deleteFromCloudinary(req.user.avatar);
        }
        // add new image to the cloud
        let uploadObject = await uploadOnCloudinary(avatarLocalPath);
        let avatarUrl = uploadObject.url;
        // update the user
        const updatedUser = await User.findOneAndUpdate(req.user?._id, {
            $set: {
                avatar: avatarUrl
            },
        }, {
            new: true
        }).select("-password -refreshToken");
        return res.status(200).json(
            new ApiResponse(200, "Changed the avatar successfully", updatedUser)
        );
    }
);

export { changeAvatar };