import { InputHTMLAttributes, TextareaHTMLAttributes } from 'react';
import styles from './styles.module.scss'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> { }
interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> { }



const Input = ({ ...rest }: InputProps) => {
    return (
        <input className={styles.input} {...rest} />
    );
}

export function TextArea({ ...rest }) {
    return (
        <textarea className={styles.input} {...rest}></textarea>
    )
}

export default Input;