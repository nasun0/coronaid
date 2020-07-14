import React from 'react';
import { motion } from 'framer-motion';

import MenuItem from './MenuItem';


const variants = {
    open: {transition: { staggerChildren: 0.07, delayChildren: 0.2 }},
    closed: {transition: { staggerChildren: 0.05, delayChildren: -1 }}
}

function SideBar(props: {setCurrentTerm: (term: string) => void}) {
    const elements = [0, 1, 2, 3];
    return (
        <motion.ul variants={variants}>
            {elements.map(el => (
                <MenuItem i={el} key={el} setCurrentTerm={props.setCurrentTerm}/>
            ))}
        </motion.ul>
    );
}

export default SideBar;