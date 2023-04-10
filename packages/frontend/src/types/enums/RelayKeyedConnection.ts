// For connections that need to be associated with a certain key
// e.g., post comments are associated with a single post via post ID
// { [postId] => connectionId }
enum RelayKeyedConnection {
  PostComments = "PostComments",
}

export default RelayKeyedConnection;
