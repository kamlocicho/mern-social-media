import { useState, useContext, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { setTokenInCookies } from '../../helpers/cookies'
import { Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../App';

function LoginForm() {
    const context = useContext(UserContext);

    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);

    const navigate = useNavigate();

    const [error, setError] = useState("");

    function submitHandler(e) {
        e.preventDefault()
        fetch('http://localhost:3001/auth/login', {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify({ email, password })
        }).then(res => res.json()).then(data => {            
            if (data.success) {
                context.setUser(data.data.user)
                setTokenInCookies(data.data.accessToken);
                navigate('/');
            } else {
                setError(data.data.error);
            }
        })
    }
    useEffect(() => {
        if(context.user) {
            navigate('/');
        }
    }, [])

    return (
        <Container>
            {error && <Alert variant="danger">{error}</Alert>}
            <Form>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" onChange={e => setEmail(e.target.value)} />
                    <Form.Text className="text-muted">
                        We'll never share your email with anyone else.
                    </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} />
                </Form.Group>
                <Button variant="primary" type="submit" onClick={e => submitHandler(e)}>
                    Submit
                </Button>
            </Form>
        </Container>
    )
}

export default LoginForm;