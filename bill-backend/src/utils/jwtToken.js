export const sendToken = (user, statusCode, res, message) => {
    const token = user.getJwtToken();

    const expiresInDays = Number(process.env.COOKIE_EXPIRE) || 1; // Default to 1 day if invalid
    const options = {
        expires: new Date(Date.now() + expiresInDays * 24 * 60 * 60 * 1000), // Convert days to milliseconds
        httpOnly: true,
        secure: process.env.NODE_ENV === "production", // Ensure security in production
        sameSite: "Strict",
    };

    res.status(statusCode).cookie("token", token, options).json({
        success: true,
        user,
        message,
        token,
    });
};
