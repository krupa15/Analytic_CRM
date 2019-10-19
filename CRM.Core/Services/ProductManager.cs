using CRM.DomainModel.Context;
using CRM.DomainModel.Models;
using System;
using System.Collections.Generic;
using System.Text;
using System.Linq;

namespace CRM.Core.Services
{
    public interface IProductManager
    {
        void CreateProduct(Product product);
        Product getProduct(int id,string userId);
        List<Product> getProducts(string userId);
        void updateProduct(Product product);
        void DeleteProduct(string userId, int id);
    }
    public class ProductManager :IProductManager
    {
        private readonly CrmContext _context;
        public ProductManager(CrmContext context) {
            this._context = context;
        }
        public void CreateProduct(Product product) {
            var table_product = this._context.Set<Product>();
            table_product.Add(product);
            this._context.SaveChanges();
        }
        public Product getProduct(int id, string userId) {
            var table_product = this._context.Set<Product>();
            var list = table_product.Where(p => p.Id == id && p.UserId== userId).ToList<Product>();
            if (list.Count > 0)
            {
                return list.First();
            }
            else {
                return new Product() { Id = -1 };
            }
        }
        public List<Product> getProducts(string userId) {
            var table_product=this._context.Set<Product>();
            return table_product.Where(p => p.UserId == userId).ToList<Product>();
        }
        public void updateProduct(Product product) {
            var table_product = this._context.Set<Product>();
            table_product.Update(product);
            this._context.SaveChanges();
        }
        public void DeleteProduct(string userId,int id) {
            var table_orders = this._context.Set<Order>();
            var table_product = this._context.Set<Product>();
            var entity = table_product.Find(id);
            if (entity!=null) {
                table_orders.RemoveRange(table_orders.Where(o => o.ProductId == id));
                table_product.Remove(entity);
                this._context.SaveChanges();
            }
            
        }
    }
}
