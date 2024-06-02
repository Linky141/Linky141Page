using API.controllers;
using API.data;
using API.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers;

public class ContactController : BaseApiController
{
    private readonly PageContext pageContext;

    public ContactController(PageContext pageContext)
    {
        this.pageContext = pageContext;
    }

    [HttpGet]
    public async Task<ActionResult<List<Contact>>> GetContacts()
    {
        var contactsData = await pageContext.Contacts.ToListAsync();
        return Ok(contactsData);
    }
}