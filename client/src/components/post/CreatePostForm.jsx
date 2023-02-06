import { Container } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Alert } from 'react-bootstrap';
import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../App';
import { useNavigate } from 'react-router-dom';
import { getTokenFromCookies } from '../../helpers/cookies';

function CreatePostForm() {
    const context = useContext(UserContext);

    const [error, setError] = useState();

    const [title, setTitle] = useState(null);
    const [content, setContent] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {
        if(!getTokenFromCookies()) {
            navigate('/login')
        }
    }, [])

    function submitHandler(e) {
        e.preventDefault();

        fetch('http://localhost:3001/post/new', {
            headers: {
                'Content-Type': 'application/json',
                'authorization': `bearer ${getTokenFromCookies()}`
            },
            method: 'POST',
            body: JSON.stringify({title, content})
        })
        .then(response => response.json())
        .then(res => console.log(res))
    }


    return (
        <Container>
            {error && <Alert variant="danger">{error}</Alert>}
            <Form>
                <Form.Group className="mb-3" controlId="formBasicTitle">
                    <Form.Label>Title</Form.Label>
                    <Form.Control type="text" placeholder="Enter title" onChange={e => setTitle(e.target.value)} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicContent">
                    <Form.Label>Content</Form.Label>
                    <Form.Control as="textarea" style={{height: "100px"}} placeholder="Content" onChange={e => setContent(e.target.value)} />
                </Form.Group>

                <Button variant="primary" type="submit" onClick={e => submitHandler(e)}>
                    Submit
                </Button>
            </Form>
        </Container>
    )
}

export default CreatePostForm;