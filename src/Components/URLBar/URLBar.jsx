import { Component } from 'react'
import styles from './styles.module.scss'

export class URLBar extends Component {
    render() {
        return (
            <div class={styles.form}>
                <input type="text" name="Github URL" autoComplete="off">
                
                </input>
            </div>
        )
    } 
}