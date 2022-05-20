import React, { Component } from 'react';
import axios from 'axios';
import ApiItem from './components/ApiItem'


const api ={
  baseUrl: "https://api.github.com",
  client_id: "Iv1.57673c0702df9093",
  client_secret:"SHA256:mRsBlyL2ulsoHorkz01pw38DLUkg9cZSmRHi4TscmcE="

}

class App extends Component{

  constructor(){
    super();
    this.state = {
      githubData: []
    }
  }

  componentDidMount() {
    axios
      .get(
        api.baseUrl +
        "/search/repositories?q=language:JavaScript&sort=starts&page=1&=" +
        api.client_id +
        "&=" +
        api.client_secret
      )
      
      .then((res) => {
        console.log("Infos da API", res);
        this.setState({githubData: res.data.items});
      })

    
  }

  render(){
    const { githubData } = this.state;
    return(
      <div className='Container App'>
        <div className='row'>
          {githubData.map((name) => (
            <div className='col-md-12' key={name.id}>
              <ApiItem titulo='Projeto: ' item={name.name}/>
              <ApiItem titulo='Usuário: ' item={name.owner.login}/>
              <ApiItem titulo='Descrição: ' item={name.description}/>
              <br /> 
            </div>

          ))}
        </div>
      </div>
    )
  }

}

export default App;