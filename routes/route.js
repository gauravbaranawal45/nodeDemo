const router = require("express").Router();
const VerifyToken = require("../middleware/Auth");
const users = require("../Controllers/UsersController.js");
const profile = require("../Controllers/ProfileController.js");

/*  Start user auth   */
router.post("/signup-otp", users.signupOTP);
router.post("/verify-otp", users.verifyotp);
router.post("/signup", users.signup);
router.post("/signin", users.signin);
router.put("/logout", VerifyToken, users.logout);
/*  End user auth   */

router.get("/get-users", VerifyToken, profile.getUsers);

module.exports = router;
