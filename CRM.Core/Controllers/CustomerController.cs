using CRM.Core.Services;
using CRM.DomainModel.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace CRM.Core.Controllers
{
    [Authorize]
    [Produces("application/json")]
    [Route("api/[controller]")]
    [ApiController]
    public class CustomerController : ControllerBase
    {
        private ICustomerManager _CustomerManager;
        private readonly UserManager<User> _userManager;
        public CustomerController(ICustomerManager CustomerManager, UserManager<User> _userManager)
        {
            this._userManager = _userManager;
            this._CustomerManager = CustomerManager;
        }

        [HttpGet]
        [Route("{id}")]
        public async Task<IActionResult> getCustomer(int id)
        {
            var currentUser = this._userManager.GetUserId(this.HttpContext.User);
            return Ok(this._CustomerManager.getCustomer(id, currentUser));
        }

        [HttpGet]
        [Route("all")]
        public async Task<IActionResult> getAllCustomer()
        {
            var currentUser = this._userManager.GetUserId(this.HttpContext.User);
            return Ok(this._CustomerManager.getCustomers(currentUser));
        }

        [HttpPost]
        [Route("create")]
        public async Task<IActionResult> createCustomer([FromBody] Customer Customer)
        {
            var currentUser = this._userManager.GetUserId(this.HttpContext.User);
            Customer.UserId = currentUser;
            this._CustomerManager.CreateCustomer(Customer);
            return Ok("done");
        }

        [HttpDelete]
        [Route("{id}")]
        public async Task<IActionResult> deleteCustomer(int id)
        {
            var currentUser = this._userManager.GetUserId(this.HttpContext.User);
            this._CustomerManager.DeleteCustomer(currentUser, id);
            return Ok("done");
        }

        [HttpPut]
        [Route("update")]
        public async Task<IActionResult> updateCustomer([FromBody] Customer Customer)
        {
            var currentUser = this._userManager.GetUserId(this.HttpContext.User);
            Customer.UserId = currentUser;
            this._CustomerManager.updateCustomer(Customer);
            return Ok("done");
        }
    }
}
