/* eslint-disable indent */
/* eslint-disable react/jsx-indent */
import { ReactElement, useEffect, useState } from 'react';
import BasicCard from './Card';
import Experience from '../Experience/Experience';

export default function CardContainer(): ReactElement {
    const [open, setOpen] = useState(false);
    const [index, setIndex] = useState(-1);
    const [top, setTop] = useState(0);
    const [left, setLeft] = useState(0);

    useEffect(() => {
        const experience = new Experience();
        window.addEventListener('click', () => {
            const ix = experience.world.getIndex();
            const mouse = experience.world.getMousePosition();
            if (ix) {
                setOpen(true);
                setIndex(ix);
                setTop(mouse.y);
                setLeft(mouse.x);
            } else {
                setOpen(false);
                setIndex(-1);
            }
        });
    }, []);

    return (
        <div>
            {open ? <BasicCard index={index} top={top} left={left} /> : <span />}
        </div>
    );
}
