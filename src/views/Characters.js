import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { loadAll, createCharacter } from '../reducers/characters';
import { startCharacterCreation, changeCharacterCreationStage } from '../reducers/ui';

import Container from '../atoms/Container';
import Button from '../atoms/Button';

import CharacterCreation from '../components/CharacterCreation';
import Character from '../components/Character';

const AddCharacter = styled(Button)`
  position: absolute;
  bottom: 15px;
  right: 15px;
`

class Characters extends Component {

  componentWillMount() {

    if (!this.props.loaded) this.props.loadAll()

  }

  render() {

    const { characters, createCharacter, creatingCharacter, creationStage,
      changeCharacterCreationStage
    } = this.props;

    if (creatingCharacter) {
      return (
        <CharacterCreation stage={creationStage} changeStage={changeCharacterCreationStage} />
      )
    }

    return (
      <Container width='calc(100% - 40px)' height='calc(100% - 40px)' padding='20px'>
        {

          (characters.length === 0) ? null :

          characters.map(character => {
            const { name, job, exp } = character
  
            return <Character key={character._id} name={name} job={job} exp={exp} character={character} id={character._id} />
          })
        }

        <AddCharacter onClick={createCharacter} width='150px'>Add Character</AddCharacter>
      </Container>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    characters: state.characters.characters,
    loaded: state.characters.loaded,
    creatingCharacter: state.ui.creatingCharacter,
    creationStage: state.ui.creationStage
  }
}


export default withRouter(connect(mapStateToProps, { loadAll, createCharacter, startCharacterCreation, changeCharacterCreationStage })(Characters));