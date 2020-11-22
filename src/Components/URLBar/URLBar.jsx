import { Component } from 'react'
import styles from './styles.module.scss'
import axios from 'axios'

export class URLBar extends Component {
    constructor(props) {
        super(props)
        this.state = { url: '' }
        
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleChange(event) {
        this.setState({ url: event.target.value })
    }

    handleSubmit(event) {
        alert('A URL was submitted: ' + this.state.url);
        event.preventDefault();
    }

    render() {
        return (
            <div className={styles.form}>
                <input onChange={this.handleChange} value={this.state.url} type="text" name="Github URL" autoComplete="off" />
                <label for="name" className={styles.labelName}>
                    <span className={styles.contentName}>Github URL</span>
                </label>
                <button className={styles.submitButton} onClick={this.handleSubmit}>Submit</button>
            </div>
        )
    } 
}