using CRM.DomainModel.Context;
using CRM.DomainModel.Models;
using System;
using System.Collections.Generic;
using System.Text;
using System.Linq;

namespace CRM.Core.Services
{
    public interface ICustomerManager
    {
        void CreateCustomer(Customer customer);
        Customer getCustomer(int id, string userId);
        List<Customer> getCustomers(string userId);
        void updateCustomer(Customer customer);
        void DeleteCustomer(string userId, int id);
    }
    public class CustomerManager : ICustomerManager
    {
        private readonly CrmContext _context;
        public CustomerManager(CrmContext context)
        {
            this._context = context;
        }
        public void CreateCustomer(Customer customer)
        {
            var table_customer = this._context.Set<Customer>();
            table_customer.Add(customer);
            this._context.SaveChanges();
        }
        public Customer getCustomer(int id, string userId)
        {
            var table_Customer = this._context.Set<Customer>();
            var list = table_Customer.Where(p => p.Id == id && p.UserId == userId).ToList<Customer>();
            if (list.Count > 0)
            {
                return list.First();
            }
            else
            {
                return new Customer() { Id = -1 };
            }
        }
        public List<Customer> getCustomers(string userId)
        {
            var table_Customer = this._context.Set<Customer>();
            return table_Customer.Where(p => p.UserId == userId).ToList<Customer>();
        }
        public void updateCustomer(Customer Customer)
        {
            var table_Customer = this._context.Set<Customer>();
            table_Customer.Update(Customer);
            this._context.SaveChanges();
        }
        public void DeleteCustomer(string userId, int id)
        {
            var table_orders = this._context.Set<Order>();
            var table_Customer = this._context.Set<Customer>();
            var entity = table_Customer.Find(id);
            if (entity != null)
            {
                table_orders.RemoveRange(table_orders.Where(o => o.CustomerId == id));
                table_Customer.Remove(entity);
                this._context.SaveChanges();
            }

        }
    }
}
