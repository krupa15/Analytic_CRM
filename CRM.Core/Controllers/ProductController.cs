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
    public class ProductController : ControllerBase
    {
        private IProductManager _productManager;
        private readonly UserManager<User> _userManager;
        public ProductController(IProductManager productManager, UserManager<User> _userManager)
        {
            this._userManager = _userManager;
            this._productManager = productManager;
        }

        [HttpGet]
        [Route("{id}")]
        public async Task<IActionResult> getProduct(int id) {
            var currentUser = this._userManager.GetUserId(this.HttpContext.User);
            return Ok(this._productManager.getProduct(id, currentUser));
        }

        [HttpGet]
        [Route("all")]
        public async Task<IActionResult> getAllProduct() {
            var currentUser = this._userManager.GetUserId(this.HttpContext.User);
            return Ok(this._productManager.getProducts(currentUser));
        }

        [HttpPost]
        [Route("create")]
        public async Task<IActionResult> createProduct([FromBody] Product product) {
            var currentUser = this._userManager.GetUserId(this.HttpContext.User);
            product.UserId = currentUser;
            this._productManager.CreateProduct(product);
            return Ok("done");
        }

        [HttpDelete]
        [Route("{id}")]
        public async Task<IActionResult> deleteProduct(int id) {
            var currentUser = this._userManager.GetUserId(this.HttpContext.User);
            this._productManager.DeleteProduct(currentUser, id);
            return Ok("done");
        }

        [HttpPut]
        [Route("update")]
        public async Task<IActionResult> updateProduct([FromBody] Product product) {
            var currentUser = this._userManager.GetUserId(this.HttpContext.User);
            product.UserId = currentUser;
            this._productManager.updateProduct(product);
            return Ok("done");
        }
    }
}
