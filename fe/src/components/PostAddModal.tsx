import { Modal, Button, Form, Input, Label, TextArea } from "@heroui/react"
import { useState } from "react"
import { api } from '../App';

interface PostAddModalProps {
    isOpen: boolean;
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
    gameId: number;
}

function PostAddModal({ isOpen, setIsOpen, gameId }: PostAddModalProps) {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        fetch(`${api}/posts`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify({
                "title": title,
                "description": description,
                "gameId": gameId
            })
        }).then((res) => {
            console.log("RES: ", res);
            return res.json();
        }).then((json) => {
            console.log("Post Add JSON: ", json);
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
                            <Modal.Heading className="text-2xl">Create post</Modal.Heading>
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
                                            value={title}
                                            onChange={(e) => setTitle(e.target.value)}
                                        />
                                    </div>
                                    <div className="flex flex-col gap-1">
                                        <Label className="text-xl" htmlFor="input-type-password">Description</Label>
                                        <TextArea
                                            className="text-xl"
                                            id="input-type-password"
                                            placeholder="Enter description"
                                            value={description}
                                            onChange={(e) => setDescription(e.target.value)}
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
export default PostAddModal