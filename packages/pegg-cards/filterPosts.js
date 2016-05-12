function filterPostsByUser (parameters) {
  user = Meteor.user()
  if (user) {
    userId = user._id
  } else {
    userId = 'nobody'
  }
  if (!Users.is.admin(user)) {
    var parameters = Telescope.utils.deepExtend(true, parameters, {
      selector: {
        $and: [
          {userId: userId}
        ]
      }
    });
  }
  return parameters;
}
Telescope.callbacks.add("postsParameters", filterPostsByUser);
