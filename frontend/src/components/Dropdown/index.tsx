import React, { useState, useRef, useEffect } from 'react';

import { Wrapper, Container, Item } from './styles';

interface IItem {
    text: string;
    route?: string;
    icon?: JSX.Element;
}

interface IProps {
    items: IItem[];
}

const Dropdown: React.FC<IProps> = ({ children, items }) => {
    const [isVisible, setVisible] = useState(false);
    const container = useRef<HTMLDivElement | null>(null);

    function handleClickOutside(e: MouseEvent) {
        if (
            container.current &&
            !container.current.contains(e.target as Element)
        ) {
            setVisible(false);
        }
    }

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const newChildren = React.cloneElement(children as any, {
        onClick: () => setVisible(!isVisible),
    });

    return (
        <Wrapper>
            {newChildren}
            {isVisible && (
                <Container
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0 }}
                    ref={container}>
                    {items.map(item => (
                        <Item key={item.text}>
                            {item.icon && item.icon}
                            {item.text}
                        </Item>
                    ))}
                </Container>
            )}
        </Wrapper>
    );
};

export default Dropdown;
