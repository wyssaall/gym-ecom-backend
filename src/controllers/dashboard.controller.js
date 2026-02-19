import Order from '../models/orders.model.js';
import Product from '../models/products.model.js';
import expressAsyncHandler from 'express-async-handler';

const getDashboardStats = expressAsyncHandler(async (req, res) => {
  const now = new Date();
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
  const startOfLastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
  const endOfLastMonth = new Date(now.getFullYear(), now.getMonth(), 0, 23, 59, 59);

  const [
    totalSalesResult,
    totalOrders,
    ordersThisMonth,
    ordersLastMonth,
    productsCount,
    salesPerMonth,
  ] = await Promise.all([
    Order.aggregate([{ $group: { _id: null, total: { $sum: '$total' } } }]),
    Order.countDocuments(),
    Order.countDocuments({ createdAt: { $gte: startOfMonth } }),
    Order.countDocuments({ createdAt: { $gte: startOfLastMonth, $lte: endOfLastMonth } }),
    Product.countDocuments(),
    Order.aggregate([
      {
        $group: {
          _id: {
            year: { $year: '$createdAt' },
            month: { $month: '$createdAt' },
          },
          total: { $sum: '$total' },
          count: { $sum: 1 },
        },
      },
      { $sort: { '_id.year': 1, '_id.month': 1 } },
      { $limit: 12 },
    ]),
  ]);

  const totalSales = totalSalesResult[0]?.total ?? 0;
  const monthNames = ['', 'Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Juin', 'Juil', 'Août', 'Sep', 'Oct', 'Nov', 'Déc'];
  const salesPerMonthFormatted = salesPerMonth.map((item) => ({
    month: `${monthNames[item._id.month]} ${item._id.year}`,
    ventes: item.total,
    commandes: item.count,
  }));

  const growthOrders = ordersLastMonth > 0
    ? Math.round(((ordersThisMonth - ordersLastMonth) / ordersLastMonth) * 100)
    : (ordersThisMonth > 0 ? 100 : 0);

  res.json({
    totalSales,
    totalOrders,
    ordersThisMonth,
    ordersLastMonth,
    productsCount,
    growthOrders,
    salesPerMonth: salesPerMonthFormatted,
  });
});

export { getDashboardStats };
