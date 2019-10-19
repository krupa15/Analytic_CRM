using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace CRM.DomainModel.Models
{
    public class Customer
    {
        [Key]
        public int Id { get; set; }

        public string UserId { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public long ContactNumber { get; set; }
    }
}
