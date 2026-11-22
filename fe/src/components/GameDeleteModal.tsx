import { Modal, Button, Form } from "@heroui/react"
import { api } from '../App';

interface GameDeleteModalProps {
    isOpen: boolean;
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
    id: number;
}

function GameDeleteModal({ isOpen, setIsOpen, id }: GameDeleteModalProps) {

    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        fetch(`${api}/games/${id}`, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
        }).then((res) => {
            console.log("RES: ", res);
            return res.json();
        }).then((json) => {
            console.log("Game Delete JSON: ", json);
            if (json?.message) {
                return;
            } else {
                window.location.replace("/");
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
                            <Modal.Heading className="text-2xl">Delete game</Modal.Heading>
                            <p className="text-lg">Are you sure you want to delete this game?</p>
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
export default GameDeleteModal