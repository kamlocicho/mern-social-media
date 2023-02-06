import PostCard from "./PostCard";
import { Row, Container, Col } from "react-bootstrap";


function PostGrid({ posts }) {
    return (
        <Container style={{
            width: "100%",
            height: "90vh",
            margin: "0 auto"
        }}>
            <Row>
                {posts && posts.map(post => (
                    <Col style={{scrollSnapMarginTop: '1rem'}} lg={3} md={6} key={post._id}><PostCard post={post} /></Col>
                ))}
            </Row>
        </Container>
    )
}

export default PostGrid