import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useNavigate } from 'react-router-dom';
import { removeTokenFromCookies } from '../helpers/cookies';

function LogoutModal({ show, setShow }) {
    const navigate = useNavigate();
    
    function handleLogout() {
        removeTokenFromCookies();
        navigate("/login");
        setShow();
    }


    return (
        <>
            <Modal show={show} onHide={setShow}>
                <Modal.Header closeButton>
                    <Modal.Title>Modal heading</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure you want to logout?</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={setShow}>
                        Go back
                    </Button>
                    <Button variant="danger" onClick={handleLogout}>
                        Logout
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default LogoutModal