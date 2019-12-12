const router = require("express").Router();
const UserController = require("../controllers/UserController");

router.get("/:id", UserController.get);
router.post("/", UserController.create);
router.put("/", UserController.update);
router.delete("/", UserController.remove);

module.exports = router;
