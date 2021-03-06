import React, { useState } from 'react'
import styled from 'styled-components'

import Modal from './Modal'

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
`

const Row = styled.div`
  display: flex;
  width: 100%;
  margin-top: 20px;
  justify-content: space-between;
  align-items: center;
`

type ButtonProps = {
  cancel?: boolean
}

const Button = styled.p<ButtonProps>`
  background: ${props => props.cancel ? 'none' : props.theme.green };
  color: white;
  border-radius: 4px;
  padding: 10px;
  font-size: 1.3em;
  text-align: center;
  width: 40%;
  cursor: pointer;
`

const Input = styled.input`
  margin: 0 15px;
  color: rgba(20, 20, 20, 0.85);
  border: none;
  background: ${props => props.theme.elevated};
  border: 2px solid ${props => props.theme.sidebars};
  padding: 10px;
  border-radius: 4px;
  appearance: none;
  color: ${props => props.theme.gold};
  font-size: 1.4em;
  width: 100%;
  text-align: center;

  &:focus {
    outline: none;
  }
`

type Props = {
  defaultValue: string
  isOpen: boolean
  setIsOpen(open: boolean): void
  onConfirm(value: string): void
}

function StringEdit(props: Props) {
  const { defaultValue, isOpen, setIsOpen, onConfirm } = props

  const [value, setValue] = useState(defaultValue)

  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
      <Form onSubmit={e => {
        onConfirm(value)
        setIsOpen(false)
        e.preventDefault()
      }}>
        <Input
          type='text'
          spellCheck='false'
          defaultValue={value}
          onChange={e => setValue(e.target.value)}
        />

        <Row>
          <Button onClick={() => setIsOpen(false)} cancel>
            Cancel
          </Button>
          <Button onClick={() => {
            onConfirm(value)
            setIsOpen(false)
          }}>Confirm</Button>
        </Row>
      </Form>
    </Modal>
  )
}

export default StringEdit
