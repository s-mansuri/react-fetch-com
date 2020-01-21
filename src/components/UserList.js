import React, { Component } from 'react';
import axios from 'axios';


class UserList extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            users: [],
            sort: 'asc',
            fiterStatus: '',
            speciesStatus: ''
        }
 }

 componentDidMount(){
   axios.get('https://rickandmortyapi.com/api/character/')
    .then(response => {
        let userData = []
        for(let i =0; i<= 19; i++){
        userData.push(response.data.results[i])
    }
    this.setState({
        users: userData
    })
    })
    .catch(error => {
        console.log(error)
    })
}

sortItems(){
    if(this.state.sort === 'asc')
    {
        this.setState({
            sort: 'desc'
        })
    }
    else{
        this.setState({
            sort: 'asc'
        })
    }   
}

filterStatus = (e) => {
    this.setState({
        fiterStatus: e.target.value
    })
} 

speciesStatus = (e) => {
    this.setState({
        speciesStatus: e.target.value
    })
} 

    render() {

        this.state.users.sort((a,b) => {
            if(this.state.sort === 'desc'){
                return parseInt(b.id - parseInt(a.id))
            }
            else if(this.state.sort === 'asc'){
                return parseInt(a.id - parseInt(b.id))
            }
        })

        let filteredData = this.state.users.filter((user) => {
            return user.status.toLowerCase().includes(this.state.fiterStatus.toLowerCase()) && user.species.toLowerCase().includes(this.state.speciesStatus.toLowerCase())
        })

        return (
        <div>
            <div className="header" >
                <img className="headerImg" alt="" src="https://cdn.worldvectorlogo.com/logos/react-1.svg"  /> <button className="button" onClick={this.sortItems.bind(this)}>{this.state.sort === 'asc' ? 'Sort DESC' : 'Sort ASC'}</button>
                <input type="text" name="filter" placeholder="Filter by Status" className="inputField" onChange={this.filterStatus}/>
                <input type="text" name="filter" placeholder="Filter by Species" className="inputField" onChange={this.speciesStatus}/>
            </div>
            <div className="container">
                {
                   filteredData.map(user => (
                    <div key={user.id}>
                    <div className="sepcificUser" >
                    <img className="userImage" src={user.image} alt="" /><br />
                    <div className="userName"> {user.name} </div>
                    <div className="userDetails"> {user.id} <br/> {user.status} <br /> {user.species} <br />{user.location.name}</div>
                    </div>
                    </div>
                    ))
                    
                }
                <div className="footer">$Mansuri</div>  
            </div>
        </div>
        )
        
    }
}

export default UserList
