import { Modal, Button, Form, TextArea } from "@heroui/react"
import { useState } from "react"
import { api } from '../App';

interface CommentEditModalProps {
    isOpen: boolean;
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
    id: number;
    content: string;
}

function CommentEditModal({ isOpen, setIsOpen, id, content }: CommentEditModalProps) {
    const [newContent, setNewContent] = useState(content);

    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        fetch(`${api}/comments/${id}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify({
                "content": newContent
            })
        }).then((res) => {
            console.log("RES: ", res);
            return res.json();
        }).then((json) => {
            console.log("Comment Edit JSON: ", json);
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
                            <Modal.Heading className="text-2xl">Edit comment</Modal.Heading>
                        </Modal.Header>

                        <Form onSubmit={(e) => handleSubmit(e)}>
                            <Modal.Body className="flex-row-1 w-full">
                                <div className="grid grid-rows-1 gap-5">
                                    <div className="flex flex-col gap-1">
                                        <TextArea
                                            className="text-xl"
                                            id="input-type-password"
                                            placeholder="Enter comment"
                                            value={newContent}
                                            onChange={(e) => setNewContent(e.target.value)}
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
                                    Edit
                                </Button>
                            </Modal.Footer>
                        </Form>

                    </Modal.Dialog>
                </Modal.Container>
            </Modal.Backdrop>
        </Modal>
    )
}
export default CommentEditModal