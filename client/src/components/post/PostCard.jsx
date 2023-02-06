import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom'

function PostCard({ post }) {
    return (
        <Card style={{ width: '18rem', height: '20rem' }}>
            <Card.Body>
                <Card.Title>{post.title}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">{post.author.firstName} {post.author.lastName}</Card.Subtitle>
                <Card.Text style={{height: '10rem', overflow: 'hidden'}}>
                    {post.content}
                </Card.Text>
                <Card.Link as={Link} to={`/post/${post._id}`}>Read post</Card.Link>
            </Card.Body>
        </Card>
    );
}

export default PostCard;
