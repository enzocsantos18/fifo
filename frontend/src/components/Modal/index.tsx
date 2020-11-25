import React from 'react';
import { AnimatePresence, AnimateSharedLayout } from 'framer-motion';

import { Wrapper, Container, Header } from './styles';
import { MdClose } from 'react-icons/md';

interface IProps {
    isVisible: boolean;
    width?: string;
    onClose?(): void;
}

const wrapperVariants = {
    open: { opacity: 1, display: 'flex' },
    closed: {
        opacity: 0,

        transitionEnd: {
            display: 'none',
        },
    },
};

const containerVariants = {
    open: { opacity: 1, translateY: 0 },
    closed: { opacity: 0, translateY: 200 },
};

const Modal: React.FC<IProps> = ({ children, isVisible, width, onClose }) => {
    return (
        <AnimateSharedLayout type='crossfade'>
            <AnimatePresence>
                <Wrapper
                    animate={isVisible ? 'open' : 'closed'}
                    variants={wrapperVariants}>
                    <Container
                        animate={isVisible ? 'open' : 'closed'}
                        variants={containerVariants}
                        style={{ width: width ? width : '300px' }}>
                        {onClose && (
                            <Header>
                                <MdClose onClick={onClose} size={24} />
                            </Header>
                        )}

                        {children}
                    </Container>
                </Wrapper>
            </AnimatePresence>
        </AnimateSharedLayout>
    );
};

export default Modal;
