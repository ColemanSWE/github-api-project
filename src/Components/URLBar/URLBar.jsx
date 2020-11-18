import { Component } from 'react'
import styles from './styles.module.scss'

export class URLBar extends Component {
    render() {
        return (
            <div className={styles.form}>
                <input type="text" name="Github URL" autoComplete="off" />
                <label for="name" className={styles.labelName}>
                    <span className={styles.contentName}>Github URL</span>
                </label>
            </div>
        )
    } 
}