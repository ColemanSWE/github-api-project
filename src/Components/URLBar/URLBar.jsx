import { Component } from 'react'
import styles from './styles.module.scss'
import axios from 'axios'

export class URLBar extends Component {
    constructor(props) {
        super(props)
        this.state = { url: '', user: null }
        
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleChange(event) {
        this.setState({ url: event.target.value })
    }

    handleSubmit = async (event) => {
        let baseUrl = 'https://api.github.com/users/'
        let user = this.state.url
        let requestUrl = baseUrl.concat(user)
        let request = await axios.get(requestUrl).catch(err => {
            if (err.response.status === 404) {
              console.log('404 error')
            }
            throw err;
        })
        console.log(request)
        this.setState({ user: JSON.stringify(request.data) })
    }

    render() {
        return (
            <div className={styles.form}>
                <input onChange={this.handleChange} placeholder=" " value={this.state.url} type="text" name="Github URL" autoComplete="off" />
                <label htmlFor="name" className={styles.labelName}>
                    <span className={styles.contentName}>Github URL</span>
                </label>
                <button className={styles.submitButton} onClick={this.handleSubmit}>Submit</button>
                <p>{this.state.user}</p>
            </div>
        )
    } 
}