import React from 'react'

import Filters from './Filters'
import PetBrowser from './PetBrowser'

class App extends React.Component {
  constructor() {
    super()

    this.state = {
      pets: [],
      filters: {
        type: 'all'
      }
    }
  }

  onChangeType = (event) => {
    this.setState({
      filters: {
        ...this.state.filters,
        type: event.target.value
      }
    })
  }

  fillPetsArray = (newObject) => {
    this.setState({
      pets: newObject
    })
  }

  onFindPetsClick = () => {
        const infoWeNeed = this.state.filters.type === 'all' ? '' : `?type=${this.state.filters.type}`
    fetch(`/api/pets${infoWeNeed}`)
    .then(response => response.json())
    .then(this.fillPetsArray)
  }
  
  onAdoptPet = petId => {
    const newPets = this.state.pets.map(onePet => {
      return onePet.id === petId ? {...onePet, isAdopted: true} : onePet 
    })
    this.setState({
      pets: newPets
    })
  }
  

  render() {
    return (
      <div className="ui container">
        <header>
          <h1 className="ui dividing header">React Animal Shelter</h1>
        </header>
        <div className="ui container">
          <div className="ui grid">
            <div className="four wide column">
              <Filters 
              onChangeType={this.onChangeType}
              onFindPetsClick={this.onFindPetsClick}
              />
            </div>
            <div className="twelve wide column">
              <PetBrowser 
              pets={this.state.pets}
              onAdoptPet={this.onAdoptPet}
              />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default App
