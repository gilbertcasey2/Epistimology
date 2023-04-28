using System;
using System.Collections.Generic;
namespace Epistimology_BE.Models
{
	public interface IUserRepository
	{
		IEnumerable<UserModel> GetAll();
		UserModel Add(UserModel user);
	}
}

