import React, { useState, useRef, useEffect } from 'react';

import { Wrapper, Container, Item } from './styles';

interface IItem {
    text: string;
    route?: string;
    icon?: JSX.Element;
    onClick?(): void;
}

interface IProps {
    items: IItem[];
    width?: string;
    top?: string;
}

const Dropdown: React.FC<IProps> = ({ children, items, width, top }) => {
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
                    ref={container}
                    style={{
                        width: width ? width : '100%',
                        top: top ? top : '0',
                    }}>
                    {items.map(item => (
                        <Item
                            key={item.text}
                            onClick={() => item.onClick && item.onClick()}>
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
