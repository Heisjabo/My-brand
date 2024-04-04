const loaderDiv = document.getElementById("loader-element");

const Blogs = () => {
    const [blogs, setBlogs] = React.useState([]);

    const fetchBlogs = async () => {
        try{
            loaderDiv.style.display = "flex";
            const response = await fetch("https://mybrand-be-x023.onrender.com/api/v1/blogs");
            loader.style.display = "none"
            const data = await response.json();
            const blogs = await Promise.all(data.data.map(async (blog) => {
                const likesResponse = await fetch(`https://mybrand-be-x023.onrender.com/api/v1/blogs/${blog._id}/likes`);
                const likesData = await likesResponse.json();
                const likes = likesData.likes;

                const commentsResponse = await fetch(`https://mybrand-be-x023.onrender.com/api/v1/blogs/${blog._id}/comments`);
                const commentsData = await commentsResponse.json();
                const comments = commentsData.comments;

                return {
                    ...blog,
                    likes,
                    comments
                };
            }));
            setBlogs(blogs);
        }catch(err){
            loaderDiv.style.display = "none"
            console.log(err)
        }
    }

    React.useEffect(() => {
        fetchBlogs()
    }, [])

    console.log(blogs)

    return (<>
    {blogs.map((item) => {
        return (
            <div class="blog-card" key={item._id}>
                <a href={`./screens/singleBlog.html?id=${item._id}`}><img alt="" src={`${item.image}`} /></a>
                <div class="blog-text">
                    <h3>{item.title}</h3>
                    <div class="date-stats">
                        <p>Oct 9, 2023</p>
                        <button class="like">{item.likes} <i class={`fa-regular fa-heart`}></i></button>
                        <button class="like">{item.comments} <i class="fa-regular fa-comment"></i></button>
                    </div>
                    <div dangerouslySetInnerHTML={{ __html: item.description.slice(0, 50) + "..." }} />
                </div>
            </div>
        )
    })}
    </>)
}

ReactDOM.render(<Blogs/>, document.getElementById("blogs-container"));