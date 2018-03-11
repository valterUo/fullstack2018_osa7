const initialState = []

const blogReducer = (store = initialState, action) => {
  switch (action.type) {
    case 'NEW_BLOG':
            const blogs = store
           const newBlogs = blogs.concat(action.blog)
            return newBlogs 
    case 'INIT_BLOGS':
        return action.blogs
    case 'LIKE':
        const oldBlogs = store.filter(blog => blog._id !== action.id)
        const likedBlog = store.find(blog => blog._id === action.id)
        return [...oldBlogs, { ...likedBlog, likes: likedBlog.likes+1} ]
    case 'DELETE':
        const oldBlogs2 = store.filter(blog => blog._id !== action.id)
        return oldBlogs2
    default:
      return store
  }
}

export default blogReducer