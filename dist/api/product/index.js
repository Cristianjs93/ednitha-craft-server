"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const product_controller_1 = require("./product.controller");
const auth_controller_1 = require("../../auth/auth.controller");
const formDataProccesor_1 = require("../../middlewares/formDataProccesor");
const pagination_1 = require("../../middlewares/pagination");
const filtering_1 = require("../../middlewares/filtering");
const router = (0, express_1.Router)();
router.post('/create', auth_controller_1.isAuthenticated, (0, auth_controller_1.hasRole)(['ADMIN']), formDataProccesor_1.formDataProccesor, product_controller_1.createProductHandler);
router.get('/', filtering_1.filtering, (0, pagination_1.pagination)(), product_controller_1.getAllProductsHandler);
router.put('/update', auth_controller_1.isAuthenticated, (0, auth_controller_1.hasRole)(['ADMIN']), formDataProccesor_1.formDataProccesor, product_controller_1.updateProductHandler);
router.delete('/delete', auth_controller_1.isAuthenticated, (0, auth_controller_1.hasRole)(['ADMIN']), product_controller_1.deleteProductHandler);
exports.default = router;
