import { catchAsyncErrors } from "../middlewares/catchAsyncError.js";
import Errorhandler from "../middlewares/Error.js";
import { User } from "../schemas/user.models.js";
import { sendToken } from "../utils/jwtToken.js";

export const register = catchAsyncErrors(async (req, res, next) => {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
        return next(
            new Errorhandler('Please Fill All Fields')
        )
    }
    const isEmail = await User.findOne({ email });
    if (isEmail) {
        return next(new Errorhandler("Email Already Exists"));
    }
    const user = await User.create({
        name,
        email,
        password
    })
    sendToken(user, 200, res, 'User Registered Successfully');
});

export const login = catchAsyncErrors(async (req, res, next) => {
    const {email, password} = req.body;
    if(!email || !password) {
        return next(new Errorhandler('Please Provide Email and Password'));
    }

    const user = await User.findOne({email}).select('+password');

    if(!user) {
        return next(new Errorhandler('Invalid UserName and Password'));
    }

    const passwordMatch = await user.comparePassword(password);
    if(!passwordMatch) {
        return next(new Errorhandler('Invalid UserName and Password', 400));
    }
    sendToken(user, 200, res, "User Logged In Successfully");
});

export const logout = catchAsyncErrors(async (req, res, next) => {
    res.status(200).cookie("token", "", {
        httpOnly: true,
        expires: new Date(0), // Expire immediately
    }).json({
        success: true,
        message: "User Logged Out Successfully",
    });
});


export const getUser = catchAsyncErrors(async(req, res, next) => {
    const user = req.user;
    res.status(200).json({
        success: true,
        user
    });
})