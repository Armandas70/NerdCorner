import { Modal, Button, Form, Input, Label, TextArea } from "@heroui/react"
import { useState } from "react"
import { api } from '../App';

interface PostEditModalProps {
    isOpen: boolean;
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
    id: number;
    title: string;
    description: string;
}

function PostEditModal({ isOpen, setIsOpen, id, title, description }: PostEditModalProps) {
    const [newTitle, setNewTitle] = useState(title);
    const [newDescription, setNewDescription] = useState(description);

    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        fetch(`${api}/posts/${id}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify({
                "title": newTitle,
                "description": newDescription
            })
        }).then((res) => {
            console.log("RES: ", res);
            return res.json();
        }).then((json) => {
            console.log("Login JSON: ", json);
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
                <Modal.Container placement="center" size="lg">
                    <Modal.Dialog>
                        <Modal.CloseTrigger onClick={() => setIsOpen(false)} />
                        <Modal.Header className="flex flex-col gap-1 mb-5">
                            <Modal.Heading className="text-2xl">Edit post</Modal.Heading>
                        </Modal.Header>

                        <Form onSubmit={(e) => handleSubmit(e)}>
                            <Modal.Body className="flex-row-1 w-full">
                                <div className="grid grid-rows-2 gap-5">
                                    <div className="flex flex-col gap-1">
                                        <Label className="text-xl" htmlFor="input-type-title">Title</Label>
                                        <Input
                                            className="text-xl"
                                            id="input-type-title"
                                            placeholder="Enter title"
                                            type="text"
                                            value={newTitle}
                                            onChange={(e) => setNewTitle(e.target.value)}
                                        />
                                    </div>
                                    <div className="flex flex-col gap-1">
                                        <Label className="text-xl" htmlFor="input-type-password">Description</Label>
                                        <TextArea
                                            className="text-xl"
                                            id="input-type-password"
                                            placeholder="Enter description"
                                            value={newDescription}
                                            onChange={(e) => setNewDescription(e.target.value)}
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
export default PostEditModal