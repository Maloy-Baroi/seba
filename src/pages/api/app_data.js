// example.js

import {callApi} from './apis';

export async function getMedicineList() {
    return await callApi('api-product/medicine-list/');
}

export async function getProductList() {
    return await callApi('api-product/products-list/');
}

export async function getMedicineInfoList() {
    return await callApi('api-product/medicines-info/')
}

export async function getExpiredProductsList() {
    return await callApi('api-product/expired-products/');
}

export async function getCategoryList() {
    return await callApi('api-product/categories/');
}

export async function getOrderListForLoginUser() {
    return await callApi('api-seller/order-list/')
}

export async function getAllOrders() {
    return await callApi('api-admin/order-list-for-manager/')
}

export async function getCustomerReport() {
    return await callApi('api-seller/customer-report')
}

export async function getSubCategoryList() {
    return await callApi('api-product/sub-categories/');
}

export async function getConsumptionTypeList() {
    return await callApi('api-product/product-consumption-types/');
}

export async function getBrandList() {
    return await callApi('api-product/brand/');
}

export async function getShelfList() {
    return await callApi('api-product/all-shelf/');
}

export async function getStockAlert() {
    return await callApi('api-seller/stock-alerts/');
}

export async function getNearToExpiredDate() {
    return await callApi('api-seller/near-expiry-products/')
}

export async function getAlmostStockOutProducts() {
    return await callApi('api-seller/stock-less-than-minimum-quantity/')
}

export async function getCustomerSellerInvoiceCount() {
    return await callApi('api-admin/customer-seller-order-count/')
}

export async function getSellerList() {
    return await callApi('api-admin/seller-list/')
}

export async function getProfileInfo() {
    return await callApi('api-seller/salesman-profile/')
}

export async function getMonthSales() {
    return await callApi('api-seller/monthly-sales/')
}

export async function getMonthlyTotalSales() {
    return await callApi('api-seller/order-stats/')
}

export async function getPaymentMethodPercentage() {
    return await callApi('api-seller/payment-methods/')
}

export async function getMostSoldProduct() {
    return await callApi('api-seller/sold-products/')
}

export async function getImportedProducts() {
    return await callApi('api-product/imported-products/')
}

