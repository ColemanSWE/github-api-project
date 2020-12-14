import { Component } from 'react'
import styles from './styles.module.scss'
import axios from 'axios'

export class SummaryCard extends Component {
    constructor(props) {
        super(props)
        this.state = { url: '', location: '', stars: '', imageUrl: '' }
        
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
        this.setState({ location: request.data.location, imageUrl: request.data.avatar_url })
    }

    render() {
        if (this.state.imageUrl !== '') {
            this.image = <img src={this.state.imageUrl} alt="github avatar" />
        } else {
            this.image = <></>
        }

        return (
            <div className={styles.form}>
                <input onChange={this.handleChange} placeholder=" " value={this.state.url} type="text" name="Github URL" autoComplete="off" />
                <label htmlFor="name" className={styles.labelName}>
                    <span className={styles.contentName}>Github Username</span>
                </label>
                <button className={styles.submitButton} onClick={this.handleSubmit}>Submit</button>
                <div className={styles.container}>
                    {this.image}
                    {this.state.location}
                </div>
            </div>
        )
    } 
}