import React from 'react';
import axios from 'axios';


class Home extends React.Component {
    constructor(props) {
      super(props);
      this.state = {link: '', breedName:'Random'};
  
      this.handleChange = this.handleChange.bind(this);
    }
  
    handleChange(event) {
      this.setState({breedName: event.target.value});
    }


  async fetchData() {
    let url;
    if (this.state.breedName === 'Random') {
      url = 'https://dog.ceo/api/breeds/image/random';
    } else {
      url = `https://dog.ceo/api/breed/${this.state.breedName.toLowerCase()}/images/random`;
    }

    const response = await axios.get(url);
    const result = response.data.message;
    this.setState({ link: result });
  }



    async componentDidMount(){
        
        try {
            const response = await axios.get(`https://dog.ceo/api/breeds/image/random`);
            const result = await response.data.message;
            this.setState({link:result});

          } catch (error) {
            console.error('Error fetching data:', error);
          }

    }
    async componentDidUpdate(prevProps, prevState) {
        // Check if breedName has changed
        if (this.state.breedName !== prevState.breedName) {
          await this.fetchData();
        }
      }
 
  
    render() {
      return (
         <div style={{  display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'center', paddingTop:'100px' }}>
            <div style={{ display:'flex', flexDirection:'row' }}>
                Select a Breed:
                <select onChange={this.handleChange}>
                <option value="Random" default>Random</option>
                <option value="Beagle">Beagle</option>
                <option value="Boxer">Boxer</option>
                <option value="Dalmatian">Dalmatian</option>
                <option value="Husky">Husky</option>
                </select>
            </div>

            <img src={this.state.link} alt="Dog" style={{ objectFit: 'contain' }} />

            <button onClick = {()=>this.fetchData()}style={{ width: '50px', height: '30px' }}>Next</button>
         </div>
      );
    }
  }

  export default Home