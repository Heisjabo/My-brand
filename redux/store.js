const { createStore } = Redux


const initialState = {
  blogs: [],
  likes: [],
  comments: []
};

const reducer = (state = initialState, action) => {
  
};

const store = createStore(reducer);
