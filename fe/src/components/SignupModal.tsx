import { Modal, Button, Form, Input, Label } from "@heroui/react"
import { useState } from "react"

interface SignupModalProps {
    isOpen: boolean;
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

function SignupModal({ isOpen, setIsOpen }: SignupModalProps) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");

    function handleSubmit() {
        console.log("Tried to Sign up");
    }

    return (
        <Modal isOpen={isOpen} onOpenChange={() => setIsOpen(isOpen)}>
            <Modal.Backdrop>
                <Modal.Container placement="center" size="lg">
                    <Modal.Dialog>
                        <Modal.CloseTrigger onClick={() => setIsOpen(false)} />
                        <Modal.Header className="flex flex-col gap-1 mb-5">
                            <Modal.Heading className="text-2xl">Create your account</Modal.Heading>
                        </Modal.Header>

                        <Form onSubmit={handleSubmit}>
                            <Modal.Body className="flex-row-1 w-full">
                                <div className="flex flex-col gap-1">
                                    <Label className="text-xl" htmlFor="input-type-email">Email</Label>
                                    <Input
                                        className="text-xl"
                                        id="input-type-email"
                                        placeholder="Enter your email"
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </div>
                                <div className="flex flex-col gap-1">
                                    <Label className="text-xl" htmlFor="input-type-password">Password</Label>
                                    <Input
                                        className="text-xl"
                                        id="input-type-password"
                                        placeholder="Enter your password"
                                        type="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                </div>
                                <div className="flex flex-col gap-1">
                                    <Label className="text-xl" htmlFor="input-type-username">Username</Label>
                                    <Input
                                        className="text-xl"
                                        id="input-type-username"
                                        placeholder="Enter your username"
                                        type="text"
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                    />
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
                                    Log in
                                </Button>
                            </Modal.Footer>
                        </Form>

                    </Modal.Dialog>
                </Modal.Container>
            </Modal.Backdrop>
        </Modal>
    )
}
export default SignupModal