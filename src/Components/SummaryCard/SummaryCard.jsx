import { Component } from 'react'
import styles from './styles.module.scss'
import axios from 'axios'

export class SummaryCard extends Component {
    constructor(props) {
        super(props)
        this.state = { username: '', location: '', followers: '', imageUrl: '', rating: '', comment: '' }
        
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleChange(event) {
        this.setState({ username: event.target.value })
    }

    generateRating() {
        let randomIndex = Math.floor((Math.random() * (Math.floor(2) - Math.ceil(0) + 1)))
        let rating = Math.floor((Math.random() * 10) + 1)
        let comments = { 
            bad: ['Code is unclear and fuzzy, needs work.', 'Is there even any code here?!', 'What am I even reading?'],
            okay: ['Shows promise, not quite there yet.', 'Could make it as an intern (probably).', 'This person is an up-and-comer.'],
            good: ['Most definitely a 10x developer!', 'The programming equivalent of a rockstar!', 'Wow, can you tutor me?!']
        }
        this.setState({ rating: 'Profile rating: '.concat(rating) })
        
        if (rating <= 4) {
            this.setState({ comment: comments.bad[randomIndex]})
        } else if (rating > 4 && rating < 8) {
            this.setState({ comment: comments.okay[randomIndex]})
        } else {
            this.setState({ comment: comments.good[randomIndex]})
        }
    }

    handleSubmit = async () => {
        let baseUrl = 'https://api.github.com/users/'
        let user = this.state.username
        let requestUrl = baseUrl.concat(user)
        let request = await axios.get(requestUrl).catch(err => {
            if (err.response.status === 404) {
              console.log('404 error')
            }
            throw err;
        })
        
        // This makes sure I always get a more than perfect score, everyone else is left to chance. ;)
        if (request.data.id === 28316585) {
            this.setState({ rating: 'Profile rating: 100/10', comment: 'Best developer on the site, this guy is good. Good code quality, he is creative, and has good taste in design. :D' })
        } else {
            this.generateRating()
        }

        this.setState({ 
            location:'Location: '.concat(request.data.location), 
            imageUrl: request.data.avatar_url, 
            followers: 'Followers: '.concat(request.data.followers), 
        })
        console.log(request.data)
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
                    <div className={styles.infoContainer}>
                        <h2>{this.state.location}</h2>
                        <h2>{this.state.followers}</h2>
                        <h2>{this.state.rating}</h2>
                    </div>
                    <div className={styles.paragraphContainer}><h5>{this.state.comment}</h5></div>
                </div>
            </div>
        )
    } 
}