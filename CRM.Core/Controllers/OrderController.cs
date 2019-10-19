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
    public class OrderController : ControllerBase
    {
        private IOrderManager _OrderManager;
        private readonly UserManager<User> _userManager;
        public OrderController(IOrderManager OrderManager, UserManager<User> _userManager)
        {
            this._userManager = _userManager;
            this._OrderManager = OrderManager;
        }

        [HttpGet]
        [Route("{id}")]
        public async Task<IActionResult> getOrder(int id)
        {
            var currentUser = this._userManager.GetUserId(this.HttpContext.User);
            return Ok(this._OrderManager.getOrder(id, currentUser));
        }

        [HttpGet]
        [Route("all")]
        public async Task<IActionResult> getAllOrder()
        {
            var currentUser = this._userManager.GetUserId(this.HttpContext.User);
            return Ok(this._OrderManager.getOrders(currentUser));
        }

        [HttpPost]
        [Route("create")]
        public async Task<IActionResult> createOrder([FromBody] Order Order)
        {
            var currentUser = this._userManager.GetUserId(this.HttpContext.User);
            Order.UserId = currentUser;
            this._OrderManager.CreateOrder(Order);
            return Ok("done");
        }

        [HttpDelete]
        [Route("{id}")]
        public async Task<IActionResult> deleteOrder(int id)
        {
            var currentUser = this._userManager.GetUserId(this.HttpContext.User);
            this._OrderManager.DeleteOrder(currentUser, id);
            return Ok("done");
        }

        [HttpPut]
        [Route("update")]
        public async Task<IActionResult> updateOrder([FromBody] Order Order)
        {
            var currentUser = this._userManager.GetUserId(this.HttpContext.User);
            Order.UserId = currentUser;
            this._OrderManager.updateOrder(Order);
            return Ok("done");
        }
    }
}
