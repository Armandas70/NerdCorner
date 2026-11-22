import { Modal, Button, Form, TextArea } from "@heroui/react"
import { useState } from "react"
import { api } from '../App';

interface CommentAddModalProps {
    isOpen: boolean;
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
    postId: number;
}

function CommentAddModal({ isOpen, setIsOpen, postId }: CommentAddModalProps) {
    const [content, setContent] = useState("");
    const [error, setError] = useState(null);

    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        fetch(`${api}/comments`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify({
                "content": content,
                "postId": postId
            })
        }).then((res) => {
            console.log("RES: ", res);
            return res.json();
        }).then((json) => {
            console.log("Comment Add JSON: ", json);
            if (json?.message) {
                setError(json?.message);
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
                            <Modal.Heading className="text-2xl">Create comment</Modal.Heading>
                            {error && <p className="text-lg text-red-500">{error}</p>}
                        </Modal.Header>

                        <Form onSubmit={(e) => handleSubmit(e)}>
                            <Modal.Body className="flex-row-1 w-full">
                                <div className="grid grid-rows-1 gap-5">
                                    <div className="flex flex-col gap-1">
                                        <TextArea
                                            className="text-xl"
                                            id="input-type-password"
                                            placeholder="Enter comment"
                                            value={content}
                                            onChange={(e) => setContent(e.target.value)}
                                        />
                                    </div>
                                </div>
                            </Modal.Body>
                            <Modal.Footer>
                                <Button
                                    variant="secondary"
                                    size="lg"
                                    onClick={() => setIsOpen(false)}>
                                    Cancel
                                </Button>
                                <Button
                                    variant="primary"
                                    size="lg"
                                    type="submit">
                                    Create
                                </Button>
                            </Modal.Footer>
                        </Form>

                    </Modal.Dialog>
                </Modal.Container>
            </Modal.Backdrop>
        </Modal>
    )
}
export default CommentAddModal