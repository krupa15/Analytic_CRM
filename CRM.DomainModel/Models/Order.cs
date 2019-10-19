using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace CRM.DomainModel.Models
{
    public class Order
    {
        [Key]
        public int Id { get; set; }

        public string UserId { get; set; }
        public int CustomerId { get; set; }
        public int ProductId { get; set; }
        public int Quantity { get; set; }
        public string PlacedDate { get; set; }
        public string ShippedDate { get; set; }
        public bool Status { get; set; }
        public int Amount { get; set; }
    }
}
