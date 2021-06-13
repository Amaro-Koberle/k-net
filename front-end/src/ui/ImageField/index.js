import styles from './styles.module.css';
import { MdEdit } from "react-icons/md";
import { useState } from 'react';


const defaultURL = 'https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png';

const ImageField = props => {
    const [url, setURL] = useState(props.url || defaultURL);
    const newProps = {...props};
    delete newProps.url;
    delete newProps.onChange;

    const onChange = e => {
        const file = e.target.files[0];
        if(!file) return;
        setURL(URL.createObjectURL(e.target.files[0]));
        props.onChange && props.onChange(e);
    }

    return (
        <label className={styles.root} style={{ backgroundImage: `url(${url})` }} >
            <input type='file' onChange={onChange} {...newProps} />
            <span className={styles.editiconWrapper}><MdEdit /></span>
        </label>
    )
}

export default ImageField;