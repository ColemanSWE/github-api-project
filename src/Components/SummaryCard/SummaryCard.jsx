import { Component } from 'react'
import styles from './styles.module.scss'
import axios from 'axios'

export class SummaryCard extends Component {
    constructor(props) {
        super(props)
        this.state = { username: '', location: '', followers: '', imageUrl: '' }
        
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleChange(event) {
        this.setState({ username: event.target.value })
    }

    handleSubmit = async (event) => {
        let baseUrl = 'https://api.github.com/users/'
        let user = this.state.username
        let requestUrl = baseUrl.concat(user)
        let request = await axios.get(requestUrl).catch(err => {
            if (err.response.status === 404) {
              console.log('404 error')
            }
            throw err;
        })
        console.log(request)
        this.setState({ location:'Location: '.concat(request.data.location), imageUrl: request.data.avatar_url, followers: 'Followers: '.concat(request.data.followers) })
    }

    render() {
        if (this.state.imageUrl !== '') {
            this.image = <img src={this.state.imageUrl} alt="github avatar" />
        } else {
            this.image = <></>
        }

        return (
            <div className={styles.form}>
                <input onChange={this.handleChange} placeholder=" " value={this.state.username} type="text" name="Github username" autoComplete="off" />
                <label htmlFor="name" className={styles.labelName}>
                    <span className={styles.contentName}>Github Username</span>
                </label>
                <button className={styles.submitButton} onClick={this.handleSubmit}>Submit</button>
                <div className={styles.container}>
                    {this.image}
                    <h1>{this.state.location}</h1>
                    <h1>{this.state.followers}</h1>
                </div>
            </div>
        )
    } 
}