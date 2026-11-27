import { useState } from 'react';
import LoginModal from './LoginModal';
import SignupModal from './SignupModal';
import { Dropdown, Button, Label } from '@heroui/react';
import { isUser } from '../middleware/auth';
import settings from '../assets/settings.svg'
import logout from '../assets/logout.svg'
import login from '../assets/login.svg'
import signup from '../assets/signup.svg'

export default function UserMenu() {
    const [isLoginModalShown, setIsLoginModalShown] = useState(false);
    const [isSignupModalShown, setIsSignupModalShown] = useState(false);

    function handleLogout() {
        window.localStorage.clear();
        window.location.replace("/");
    }

    return (
        <div>
            <Dropdown>
                <Button aria-label="Menu" variant="primary">
                    <img src={settings} alt='settings svg' width={30}></img>
                </Button>
                <Dropdown.Popover>
                    <Dropdown.Menu onAction={(key) => console.log(`Selected: ${key}`)}>
                        <Dropdown.Item id="new-file" textValue="New file" onClick={() => setIsLoginModalShown(true)}>
                            <Label className='text-lg'>Log In</Label>
                            <img src={login} alt='login svg' width={20}></img>
                        </Dropdown.Item>
                        <Dropdown.Item id="edit-file" textValue="Edit file" onClick={() => setIsSignupModalShown(true)}>
                            <Label className='text-lg'>Sign Up</Label>
                            <img src={signup} alt='signup svg' width={20}></img>
                        </Dropdown.Item>
                        {isUser() && (
                            <Dropdown.Item id="delete-file" textValue="Delete file" variant="danger" onClick={handleLogout}>
                                <Label className='text-lg'>Log Out</Label>
                                <img src={logout} alt='logout svg' width={20}></img>
                            </Dropdown.Item>
                        )}
                    </Dropdown.Menu>
                </Dropdown.Popover>
            </Dropdown>
            {isLoginModalShown && <LoginModal isOpen={isLoginModalShown} setIsOpen={setIsLoginModalShown}></LoginModal>}
            {isSignupModalShown && <SignupModal isOpen={isSignupModalShown} setIsOpen={setIsSignupModalShown}></SignupModal>}
        </div>
    )
};