import { useState, useImperativeHandle, forwardRef } from 'react';

import styled from 'styled-components';
import sad from '../../assets/mine.png';
import happy from '../../assets/1.png';
import sunglasses from '../../assets/2.png';
import wonder from '../../assets/3.png';

type SmileRoleType = keyof typeof SmileRole;

export const SmileRole = {
    sad: sad,
    default: happy,
    sunglasses: sunglasses,
    wonder: wonder,
};

interface SmileProps {
    role: SmileRoleType;
}

const Smile = styled.div<SmileProps>`
    width: 50px;
    height: 50px;

    background-color: #bdbdbd;
    border: 4px solid;
    border-top-color: #f8f8f8;
    border-left-color: #f8f8f8;
    border-right-color: #7b7b7b;
    border-bottom-color: #7b7b7b;

    background-image: url(${(props) => SmileRole[props.role]});
    background-repeat: no-repeat;
    background-size: 100%;
`;

export interface SmileButtonRef {
    setRole: (role: SmileRoleType) => void;
}

const SmileButton = forwardRef<SmileButtonRef>((props, ref) => {
    const [role, setRole] = useState<SmileRoleType>('default');

    useImperativeHandle(ref, () => ({
        setRole: (role) => {
            setRole(role);
        },
    }));

    return <Smile role={role} />;
});

export default SmileButton;
