import axios from 'axios';
import React, { Component } from 'react'
// for fetching the Api data
export default class Users extends Component {
    state = {
        lists: [],
    };

    componentDidMount() {
        axios.get(`https://reqres.in/api/users?page=2`)
        .then((res) => {
            console.log(res.data.data[0])
            this.setState({lists:res.data.data})})
        .catch(error => console.log(error))
    }
    render() {
        console.log("data: ",this.lists)
        return (
            <ol className='mt-5'>
                <h1 className='bg-dark'>API Data </h1>
                <table className="table">
                    <thead>
                        <tr>
                        <th scope="col">id</th>
                        <th scope="col">First Name</th>
                        <th scope="col">Last Name</th>
                        <th scope="col">Email</th>
                        <th scope="col">Avatar</th>
                        </tr>
                    </thead>
                    <tbody>
                    {this.state.lists.map((list) => {
                        return (
                            <tr key={list.id}>
                            <th scope="row">{list.id}</th>
                            <td>{list.first_name}</td>
                            <td>{list.last_name}</td>
                            <td>{list.email}</td>
                            <td><img src={list.avatar} alt="img" id='cimg' /></td>
                            </tr>
                        )
                    })}
                    </tbody>
                </table>
            </ol>
        )
    }
}
