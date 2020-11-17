import React from 'react';
import { AnimatePresence, AnimateSharedLayout } from 'framer-motion';

import { Wrapper, Container } from './styles';

interface IProps {
    isVisible: boolean;
    width?: string;
}

const Modal: React.FC<IProps> = ({ children, isVisible, width }) => {
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
                            {children}
                        </Container>
                    </Wrapper>
                )}
            </AnimatePresence>
        </AnimateSharedLayout>
    );
};

export default Modal;
