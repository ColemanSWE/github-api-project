import React, { Component } from 'react';
import {Formik} from 'formik';
import styles from './styles.module.scss'
import * as Yup from 'yup';
import {actions} from '../../infrastructure/actions';
import {connect} from 'react-redux';

export class URLBar extends Component {
    constructor(props) {
        super(props)
        this.state = { url: '', user: '' }
        
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    isSubmitting = false;

    handleChange(event) {
        this.setState({ url: event.target.value })
    }

    // Calls the Github API and retrieves a user's avatar.
    handleSubmit = (values) => {
        this.props.loadUserData(values.name);
        this.isSubmitting = false;
    }

    validationSchema=Yup.object().shape({
        name: Yup.string().required('Required')
    })

    render() {
        return (
            <div className={styles.form}>
                <input onChange={this.handleChange} value={this.state.url} type="text" name="Github Username" autoComplete="off" />
                <label className={styles.labelName}>
                    <span className={styles.contentName}>Github Username</span>
                </label>
                <button disabled={this.isSubmitting} className={styles.submitButton} onClick={this.handleSubmit}>Submit</button>
                <div className="output">
                    {JSON.stringify(this.props.user, null, 2)}
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.user
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        loadUserData: name => dispatch(actions.loadUserData(name))
    };
};

export const Dashboard = connect(mapStateToProps, mapDispatchToProps)(URLBar);