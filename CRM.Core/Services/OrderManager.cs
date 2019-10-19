using CRM.DomainModel.Context;
using CRM.DomainModel.Models;
using System;
using System.Collections.Generic;
using System.Text;
using System.Linq;

namespace CRM.Core.Services
{
    public interface IOrderManager
    {
        void CreateOrder(Order Order);
        Order getOrder(int id, string userId);
        List<Order> getOrders(string userId);
        void updateOrder(Order Order);
        void DeleteOrder(string userId, int id);
    }
    public class OrderManager : IOrderManager
    {
        private readonly CrmContext _context;
        public OrderManager(CrmContext context)
        {
            this._context = context;
        }
        public void CreateOrder(Order Order)
        {
            var table_Order = this._context.Set<Order>();
            var table_product = this._context.Set<Product>();
            var loss = Order.Quantity;
            var entityProduct = table_product.Find(Order.ProductId);
            entityProduct.Quantity = entityProduct.Quantity - loss;
            Order.Amount = entityProduct.price * loss;
            table_Order.Add(Order);
            this._context.SaveChanges();
        }
        public Order getOrder(int id, string userId)
        {
            var table_Order = this._context.Set<Order>();
            var list = table_Order.Where(p => p.Id == id && p.UserId == userId).ToList<Order>();
            if (list.Count > 0)
            {
                return list.First();
            }
            else
            {
                return new Order() { Id = -1 };
            }
        }
        public List<Order> getOrders(string userId)
        {
            var table_Order = this._context.Set<Order>();
            return table_Order.Where(p => p.UserId == userId).ToList<Order>();
        }
        public void updateOrder(Order Order)
        {
            var table_Order = this._context.Set<Order>();
            var table_product = this._context.Set<Product>();
            var entityProduct = table_product.Find(Order.ProductId);
            var entityOrder = table_Order.Find(Order.Id);
            var oldLoss = entityOrder.Quantity;
            var newloss = Order.Quantity;

            entityProduct.Quantity = entityProduct.Quantity + oldLoss - newloss;
            entityOrder.PlacedDate = Order.PlacedDate;
            entityOrder.ShippedDate = Order.ShippedDate;
            entityOrder.CustomerId = Order.CustomerId;
            entityOrder.ProductId = Order.ProductId;
            entityOrder.Quantity = newloss;
            entityOrder.Amount = entityProduct.price * newloss;
            this._context.SaveChanges();
        }
        public void DeleteOrder(string userId, int id)
        {
            
            var table_Order = this._context.Set<Order>();
            var entity = table_Order.Find(id);
            if (entity != null)
            {
                table_Order.Remove(entity);
                this._context.SaveChanges();
            }

        }
    }
}
