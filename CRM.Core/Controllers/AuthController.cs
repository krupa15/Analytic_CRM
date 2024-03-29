﻿using CRM.DomainModel.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace CRM.Core.Controllers
{
    [Produces("application/json")]
    [Route("api/[controller]")]
    [ApiController]
    [AllowAnonymous]
    public class AuthController : ControllerBase
    {
        private readonly UserManager<User> _userManager;
        private readonly SignInManager<User> _signManager;
        private readonly IConfiguration _configuration;
        public AuthController(UserManager<User> _userManager, SignInManager<User> _signInManager, IConfiguration _configuration)
        {
            this._signManager = _signInManager;
            this._userManager = _userManager;
            this._configuration = _configuration;
        }
        [HttpPost]
        [Route("token")]
        public async Task<IActionResult> CreateToken(LogIn loginModel)
        {
            if (ModelState.IsValid)
            {
                var loginResult = await _signManager.PasswordSignInAsync(loginModel.Username, loginModel.Password, isPersistent: false, lockoutOnFailure: false);
                if (!loginResult.Succeeded)
                {
                    return Ok(new { loginResult = "fail", token = "" });
                }
                var user = await _userManager.FindByNameAsync(loginModel.Username);
                return Ok(new { loginResult = "success", token = GetToken(user) });
            }
            return Ok(new { loginResult = "fail", token = "" });
        }

        [Authorize]
        [HttpPost]
        [Route("refreshtoken")]
        public async Task<IActionResult> RefreshToken()
        {
            var user = await _userManager.FindByNameAsync(
                User.Identity.Name ??
                User.Claims.Where(c => c.Properties.ContainsKey("unique_name")).Select(c => c.Value).FirstOrDefault()
                );
            return Ok(GetToken(user));
        }
        [HttpPost]
        [Route("register")]
        [AllowAnonymous]
        public async Task<IActionResult> Register(Register model)
        {
            if (ModelState.IsValid)
            {
                var user = new User { UserName = model.Username };
                var result = await _userManager.CreateAsync(user, model.Password);
                if (result.Succeeded)
                {
                    await _signManager.SignInAsync(user, false);
                    return Ok(new { loginResult = "success", token = GetToken(user) });
                }
                else
                {
                    foreach (var error in result.Errors)
                    {
                        ModelState.AddModelError("", error.Description);
                    }
                }
            }
            return Ok(new { loginResult = "fail", ModelState });
        }
        private String GetToken(User user)
        {
            var utcNow = DateTime.UtcNow;
            var claims = new Claim[]
            {
                        new Claim(JwtRegisteredClaimNames.Sub, user.Id),
                        new Claim(JwtRegisteredClaimNames.UniqueName, user.UserName),
                        new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                        new Claim(JwtRegisteredClaimNames.Iat, utcNow.ToString())
            };

            var signingKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(this._configuration.GetValue<String>("Tokens:Key")));
            var signingCredentials = new SigningCredentials(signingKey, SecurityAlgorithms.HmacSha256);
            var jwt = new JwtSecurityToken(
                signingCredentials: signingCredentials,
                claims: claims,
                notBefore: utcNow,
                expires: utcNow.AddSeconds(this._configuration.GetValue<int>("Tokens:Lifetime")),
                audience: this._configuration.GetValue<String>("Tokens:Audience"),
                issuer: this._configuration.GetValue<String>("Tokens:Issuer")
                );

            return new JwtSecurityTokenHandler().WriteToken(jwt);
        }
    }
}
