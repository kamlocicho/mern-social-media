import { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap'
import DisplayPost from '../components/post/DisplayPost'
import LoadingSpinner from '../components/LoadingSpinner'
import { useNavigate, useParams } from 'react-router-dom';

function PostPage() {
    const [post, setPost] = useState();

    const params = useParams();

    const navigate = useNavigate();

    useEffect(() => {
        fetch(`http://localhost:3001/post/${params.post_id}`)
            .then(res => res.json())
            .then(res => {
                if (res.success) {
                    setPost(res.data.post)
                } else {
                    navigate('/')
                }
            })
    }, [post])

    return (
        <Container>
            {post ?
                <DisplayPost post={post} /> :
                <LoadingSpinner />}
        </Container>
    )
}

export default PostPage;