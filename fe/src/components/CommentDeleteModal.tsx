import { Modal, Button, Form} from "@heroui/react"
import { api } from '../App';

interface CommentDeleteModalProps {
    isOpen: boolean;
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
    id: number;
}

function CommentDeleteModal({ isOpen, setIsOpen, id }: CommentDeleteModalProps) {

    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        fetch(`${api}/comments/${id}`, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
        }).then((res) => {
            console.log("RES: ", res);
            return res.json();
        }).then((json) => {
            console.log("Comment Delete JSON: ", json);
            if (json?.message) {
                return;
            } else {
                window.location.reload();
            }
        })
        event?.preventDefault();
    }

    return (
        <Modal isOpen={isOpen} onOpenChange={() => setIsOpen(isOpen)}>
            <Modal.Backdrop>
                <Modal.Container placement="center" size='lg'>
                    <Modal.Dialog>
                        <Modal.CloseTrigger onClick={() => setIsOpen(false)} />
                        <Modal.Header className="flex flex-col gap-1 mb-5">
                            <Modal.Heading className="text-2xl">Delete comment</Modal.Heading>
                            <p className="text-lg">Are you sure you want to delete this comment?</p>
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
export default CommentDeleteModal