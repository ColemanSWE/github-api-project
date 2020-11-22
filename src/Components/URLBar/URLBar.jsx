import { Component } from 'react'
import styles from './styles.module.scss'
import axios from 'axios'

export class URLBar extends Component {
    constructor(props) {
        super(props)

        this.state = { url: '' }
        this.handleChange = this.handleChange.bind(this)
    }

    handleChange(event) {
        this.setState({ url: event.target.value })
    }

    render() {
        return (
            <div className={styles.form}>
                <input onChange={this.handleChange} value={this.state.url} type="text" name="Github URL" autoComplete="off" />
                <label for="name" className={styles.labelName}>
                    <span className={styles.contentName}>Github URL</span>
                </label>
            </div>
        )
    } 
}