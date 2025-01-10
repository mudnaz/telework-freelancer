import express from 'express';

import userRoutes from "./userRoutes.js";
import categoryRoutes from "./categoryRoutes.js";
import subcategoryRoutes from "./subCategoryRoutes.js";
import serviceRoutes from "./serviceRoutes.js";
import orderRoutes from "./orderRoutes.js";
import messageRoutes from "./messageRoutes.js";
import reviewRoutes from "./reviewRoutes.js";
import paymentRoutes from "./paymentRoutes.js";
import favoriteRoutes from "./favoriteRoutes.js";

const router = express.Router();


router.use("/User", userRoutes);
router.use("/Category", categoryRoutes);
router.use("/SubCategory", subcategoryRoutes);
router.use("/Service", serviceRoutes);
router.use("/Order", orderRoutes);
router.use("/Message", messageRoutes);
router.use("/Review", reviewRoutes);
router.use("/Payment", paymentRoutes);
router.use("/Favorite", favoriteRoutes);

export default router;
