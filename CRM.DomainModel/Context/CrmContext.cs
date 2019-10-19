using CRM.DomainModel.Models;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Text;

namespace CRM.DomainModel.Context
{
    public class CrmContext : IdentityDbContext<User>
    {
        public CrmContext(DbContextOptions<CrmContext> option) : base(option)
        {
        }
        
        public DbSet<Order> Orders { get; set; }
        public DbSet<Product> Products { get; set; }
        public DbSet<Customer> Customers { get; set; }
    }
}
