function DisplayPost({post}) {
    return(
        <>
            <h1 className="display-3">{post.title}</h1>
            <hr />
            <h5 className="lead mb-3">{post.author.firstName} {post.author.lastName} - {post.author.email}</h5>
            <p>{post.content}</p>
        </>
    )
}

export default DisplayPost