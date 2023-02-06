import { Container, Spinner } from "react-bootstrap"

function LoadingSpinner() {
    return (
        <Container style={{
            height: "90vh",
            display: "grid",
            alignItems: "center",
            justifyContent: "center"
        }}>
            <Spinner animation="border" role="status" >
                <span className="visually-hidden">Loading...</span>
            </Spinner >
        </Container>
    )
}

export default LoadingSpinner