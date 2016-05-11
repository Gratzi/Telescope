function filterPostsByUser (parameters) {
  if (!Users.is.admin(Meteor.user())) {
    var parameters = Telescope.utils.deepExtend(true, parameters, {
      selector: {
        $and: [
          {userId: Meteor.user()._id}
        ]
      }
    });
  }
  return parameters;
}
Telescope.callbacks.add("postsParameters", filterPostsByUser);
