using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace CRM.DomainModel.Models
{
    public class Product
    {
        [Key]
        public int Id { get; set; }

        public string UserId { get; set; }
        public string Name { get; set; }
        public long Quantity { get; set; }
        public int price { get; set; }
        public string Catagory { get; set; }
    }
}
