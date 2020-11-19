import React from 'react';
import { AnimatePresence, AnimateSharedLayout } from 'framer-motion';

import { Wrapper, Container, Header } from './styles';
import { MdClose } from 'react-icons/md';

interface IProps {
    isVisible: boolean;
    width?: string;
    onClose?(): void;
}

const Modal: React.FC<IProps> = ({ children, isVisible, width, onClose }) => {
    return (
        <AnimateSharedLayout type='crossfade'>
            <AnimatePresence>
                {isVisible && (
                    <Wrapper
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}>
                        <Container
                            initial={{ opacity: 0, translateY: 200 }}
                            animate={{ opacity: 1, translateY: 0 }}
                            exit={{ opacity: 0, translateY: 200 }}
                            style={{ width: width ? width : '300px' }}>
                            {onClose && (
                                <Header>
                                    <MdClose onClick={onClose} size={24} />
                                </Header>
                            )}

                            {children}
                        </Container>
                    </Wrapper>
                )}
            </AnimatePresence>
        </AnimateSharedLayout>
    );
};

export default Modal;
