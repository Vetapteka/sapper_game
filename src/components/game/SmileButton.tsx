import { useState, useImperativeHandle, forwardRef } from 'react';

import styled from 'styled-components';
import sad from '../../assets/oldTheme/smile/sad.svg';
import happy from '../../assets/oldTheme/smile/happy.svg';
import sunglasses from '../../assets/oldTheme/smile/sunglasses.svg';
import wonder from '../../assets/oldTheme/smile/wonder.svg';

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
    width: 100%;
    height: 100%;

    background-color: ${props=> props.theme.colors.primary};;

    background-image: url(${(props) => SmileRole[props.role]});
    background-repeat: no-repeat;
    background-size: 100%;
`;

export interface SmileButtonRef {
    setRole: (role: SmileRoleType) => void;
}

interface SmileButtonProps {
    handleClick: (event: React.MouseEvent<HTMLDivElement>) => void;
}

const SmileButton = forwardRef<SmileButtonRef, SmileButtonProps>(
    ({ handleClick }, ref) => {
        const [role, setRole] = useState<SmileRoleType>('default');

        useImperativeHandle(ref, () => ({
            setRole: (role) => {
                setRole(role);
            },
        }));

        return <Smile role={role} onClick={handleClick} />;
    }
);

export default SmileButton;
