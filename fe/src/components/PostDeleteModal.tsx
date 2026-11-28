import { useState } from "react";
import { Modal, Button, Form} from "@heroui/react"
import { api } from '../App';
import { useNavigate } from 'react-router-dom';

interface PostDeleteModalProps {
    isOpen: boolean;
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
    id: number;
}

function PostDeleteModal({ isOpen, setIsOpen, id }: PostDeleteModalProps) {
    const navigate = useNavigate();
    const [error, setError] = useState(null);

    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        fetch(`${api}/posts/${id}`, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
        }).then((res) => {
            console.log("RES: ", res);
            return res.json();
        }).then((json) => {
            console.log("Post Delete JSON: ", json);
            if (json?.message) {
                setError(json?.message);
            } else {
                navigate(-1);
            }
        })
        event?.preventDefault();
    }

    return (
        <Modal isOpen={isOpen} onOpenChange={() => setIsOpen(isOpen)}>
            <Modal.Backdrop>
                <Modal.Container placement="center" size="lg" scroll="outside">
                    <Modal.Dialog>
                        <Modal.CloseTrigger onClick={() => setIsOpen(false)} />
                        <Modal.Header className="flex flex-col gap-1 mb-5">
                            <Modal.Heading className="text-2xl">Delete post</Modal.Heading>
                            <p className="text-lg">Are you sure you want to delete this post?</p>
                            {error && <p className="text-lg text-red-500">{error}</p>}
                        </Modal.Header>

                        <Form onSubmit={(e) => handleSubmit(e)}>
                            <Modal.Footer>
                                <Button
                                    variant="secondary"
                                    size="lg"
                                    onClick={() => setIsOpen(false)}>
                                    Cancel
                                </Button>
                                <Button
                                    variant="danger"
                                    size="lg"
                                    type="submit">
                                    Delete
                                </Button>
                            </Modal.Footer>
                        </Form>

                    </Modal.Dialog>
                </Modal.Container>
            </Modal.Backdrop>
        </Modal>
    )
}
export default PostDeleteModal