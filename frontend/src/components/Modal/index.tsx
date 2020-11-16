import React, { useState } from 'react';
import { motion, AnimatePresence, AnimateSharedLayout } from 'framer-motion';

import { Wrapper, Container } from './styles';
import Button from '../Input/Button';

interface IProps {
    isVisible: boolean;
}

const Modal: React.FC<IProps> = ({ children, isVisible }) => {
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
                            exit={{ opacity: 0, translateY: 200 }}>
                            {children}
                        </Container>
                    </Wrapper>
                )}
            </AnimatePresence>
        </AnimateSharedLayout>
    );
};

export default Modal;
