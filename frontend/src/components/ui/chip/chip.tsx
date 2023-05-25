import clsx from "clsx";

import styles from './chip.module.css'
import {ReactNode} from "react";

interface IChipProps {
    size?: 'small' | 'medium' | 'large',
    type?: 'primary'|'secondary'|'error'|'success'
    children: ReactNode
}

export const Chip = ({size = 'medium', type = 'secondary', children}: IChipProps) => {
    return (
            <div className={clsx(
                styles.chip,
                {
                    [styles.success]: type === 'success',
                    [styles.error]: type === 'error',
                    [styles.primary]: type === 'primary',
                    [styles.small]: size === 'small',
                    [styles.medium]: size === 'medium',
                    [styles.large]: size === 'large'
                }
            )}>
                {children}
            </div>
    )
}