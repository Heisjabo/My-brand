const SingleBlog = () => {
  const urlParams = new URLSearchParams(window.location.search);
  const blogId = urlParams.get("id");

  const [blog, setBlog] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const [likes, setLikes] = React.useState([]);
  const [comments, setComments] = React.useState([]);
  const [content, setContent] = React.useState("");
  const [submitting, setSubmitting] = React.useState(false);

  const fetchBlog = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `https://mybrand-be-x023.onrender.com/api/v1/blogs/${blogId}`
      );
      const data = await response.json();
      setLoading(false);
      setBlog(data.data);
    } catch (err) {
      setLoading(false);
      console.log(err);
    }
  };

  const fetchLikes = async () => {
    try {
      const response = await fetch(
        `https://mybrand-be-x023.onrender.com/api/v1/blogs/${blogId}/likes`
      );
      const data = await response.json();
      console.log(data.likes);
      setLikes(data.data);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchComments = async () => {
    try {
        
      const response = await fetch(
        `https://mybrand-be-x023.onrender.com/api/v1/blogs/${blogId}/comments`
      );
      const data = await response.json();
      setComments(data.data);
    } catch (err) {
      console.log(err);
    }
  };

  const popupContent = document.getElementById("popup-content");
  const openPopup = (message) => {
      const popup = document.getElementById("popup");
      const popupMessage = document.getElementById("popup-message");
    
      popupMessage.innerHTML = message;
      popup.style.display = "block";
  
      const closeBtn  = document.getElementById("popup-ok-button");
      closeBtn.addEventListener("click", () => {
        closePopup()
      })
    }
    
    const closePopup = () => {
        const popup = document.getElementById("popup");
        popup.style.display = "none";
        window.location.href = "./signin.html"
  }

  const addComment = async (e) => {
    e.preventDefault()
    const authorization = sessionStorage.getItem("accessToken");
    if(!authorization){
        openPopup("please login to add a comment!");
    }
    if(content){
        try{
            setSubmitting(true)
            const res = await fetch(`https://mybrand-be-x023.onrender.com/api/v1/blogs/${blogId}/comments`,{
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${authorization}`
                },
                body: JSON.stringify({ content: content})
            });
            const data = await res.json();
            setSubmitting(false)
            console.log(data)
            setContent("")
        } catch(err){
            setSubmitting(false)
            console.log(err)
        }
    }
  }

const accesssToken = sessionStorage.getItem("accessToken");

function decodeJwt(token) {
  const base64Url = token.split('.')[1];
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  const jsonPayload = decodeURIComponent(atob(base64).split('').map((c) => {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
  }).join(''));

  return JSON.parse(jsonPayload);
}
let decoded;
if(accesssToken){
  decoded = decodeJwt(accesssToken);
}

const userId = decoded?.userId;

  const checkUserLiked = () => {
    for (const like of likes) {
        if (like.user === userId) {
          return true;
        }
      }
    return false;
  }
  const isLiked = checkUserLiked()

const likeBlog = async () => {
    const authorization = sessionStorage.getItem("accessToken");
    if(!authorization){
      openPopup("please login first, to like this blog");
      return
    }
    try{
      const response = await fetch(`https://mybrand-be-x023.onrender.com/api/v1/blogs/${blogId}/likes`, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${authorization}`
        }
      });
      const data = await response.json();
      console.log(data)
    } catch(err){
      console.log(err)
    }
    
}

  React.useEffect(() => {
    fetchBlog();
    fetchLikes();
    fetchComments();
  }, []);

  React.useEffect(() => {
    fetchComments()
  }, [comments])

  React.useEffect(() => {
    fetchLikes();
  }, [likes])

  React.useEffect(() => {
    checkUserLiked();
  }, [likes])


  const generateAvatar = (name) => {
    return name.split(' ').map(name => name[0]).join('').toUpperCase();
  }

  return (
    <>
      {loading && (
        <div id="single-blog-loader" className="container-loader">
          <p>Loading content...</p>
          <div id="loader" class="loader"></div>
        </div>
      )}
      <img src={blog?.image} alt={blog?.title} />
      <div className="blog-info-container">
        <div className="blog-headers">
          <h2 className="blog-title">{blog?.title}</h2>
          {blog && (
            <div className="blog-stats">
              <button className="like">
                {likes.length} <i className={`fa-regular fa-heart ${isLiked? "liked" : ""}`} onClick={likeBlog}></i>
              </button>
              <button className="like">
                {comments.length} <i className="fa-regular fa-comment"></i>
              </button>
            </div>
          )}
        </div>

        <div
          className="blog-content"
          dangerouslySetInnerHTML={{ __html: blog?.description }}
        ></div>
        <div className="comment-section">
          <h3>Comments</h3>
          <div className="comments-container">
            {loading && (
                <div id="single-blog-loader" className="container-loader">
                <div id="loader" class="loader"></div>
              </div>
            )}
            {comments?.length === 0 ? (
              <p>No comments added yet!</p>
            ) : (
              comments.map((item) => {
                return (<div className="comment-item">
                  <div className="avatar">{generateAvatar(item.name)}</div>
                  <div className="comment-text">
                    <h4>{item.name}</h4>
                    <p>{item.content}</p>
                    <span className="time">{item.createdAt.slice(0, 10)}</span>
                  </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
        <div className="add-comment">
          <h3>Leave a comment</h3>
          <form>
            <textarea placeholder="Enter your comment" value={content} onChange={(e) => setContent(e.target.value)}></textarea>
            <button id="submit-comment" onClick={addComment}>
              {submitting ? "submitting..." : "submit"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

ReactDOM.render(<SingleBlog />, document.getElementById("single-blog-root"));
