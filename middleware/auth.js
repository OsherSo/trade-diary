import { verifyJWT } from "../utils/token.js";
import { UnauthenticatedError } from "../errors/customErrors.js";

export const authenticateUser = async (req, res, next) => {
  const { token } = req.cookies;
  if (!token) {
    throw new UnauthenticatedError("Authentication invalid");
  }

  try {
    const { userId } = verifyJWT(token);
    req.user = { userId };
    next();
  } catch (error) {
    throw new UnauthenticatedError("Authentication invalid");
  }
};
