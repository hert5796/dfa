import React, { useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';

export default function App() {
  const [states, setStates] = useState(3);
  const [letter, setLetter] = useState('');
  const [alphabet, setAlphabet] = useState(['0', '1']);
  const [sourceState, setSourceState] = useState(0);
  const [transLetter, setTransLetter] = useState(0);
  const [targetState, setTargetState] = useState(0);
  const [transitions, setTransitions] = useState([{ '0': 0, '1': 1 }, { '0': 2, '1': 1 }, { '0': 1, '1': 1 }]);
  const [initialState, setInitialState] = useState(0);
  const [finalStates, setFinalStates] = useState([1]);
  return (
    <Container fluid>
      <Row className='pt-4'>
        <Col sm={6}>
          <Form>
            <Form.Group as={Row}>
              <Form.Label column sm="3">
                Q - States
              </Form.Label>
              <Col sm="9">
                <p className={`w-100 overflow-auto ${states === 0 && 'd-none'}`}>
                  {Array(states).fill('').map((_, ind) =>
                    <Button variant='dark' key={ind} size='sm' onClick={e => { e.preventDefault(); setStates(states - 1) }} className='mr-2 mb-2'>S{ind}</Button>
                  )}
                </p>
                <Form.Control type='number' value={states}
                  onChange={e => setStates(e.target.value > -1 && e.target.value < 21 ? parseInt(e.target.value) : states)} />
              </Col>
            </Form.Group>

            <Form.Group as={Row}>
              <Form.Label column sm="3">
                Σ - Alphabet
              </Form.Label>
              <Col sm="9">
                <p className={`w-100 overflow-auto ${alphabet.length === 0 && 'd-none'}`}>
                  {alphabet.map((letter, ind) =>
                    <Button variant='dark' key={ind} size='sm' className='mr-2 mb-2' onClick={e => { e.preventDefault(); setAlphabet(alphabet.filter(x => x !== letter)) }}>{letter}</Button>
                  )}
                </p>
                <Row className='no-gutters'>
                  <Col xs={8} sm={9}>
                    <Form.Control type='text' maxLength='1' value={letter} onChange={e => setLetter(e.target.value)} placeholder='e ∈ Σ' />
                  </Col>
                  <Col className='text-right'>
                    <Button variant='dark' onClick={e => { e.preventDefault(); !alphabet.includes(letter) && setAlphabet([...alphabet, letter]); setLetter('') }}>Add</Button>
                  </Col>
                </Row>
              </Col>
            </Form.Group>

            <Form.Group as={Row}>
              <Form.Label column sm="3">
                δ - Transitions
              </Form.Label>
              <Col sm="9">
                <p className={`w-100 overflow-auto ${transitions.reduce((acc, state) => acc += Object.keys(state).length, 0) === 0 && 'd-none'}`}>
                  {transitions.map((state, ind) =>
                    Object.keys(state).map((letter, ind2) =>
                      <Button variant='dark' key={ind + ind2} size='sm' className='mr-2 mb-2' onClick={e => { e.preventDefault(); delete transitions[ind][letter]; setTransitions([...transitions]) }}>δ(S{ind}, {letter}) {'=>'} {state[letter]}</Button>
                    )
                  )}
                </p>
                <Row className='no-gutters'>
                  <Col xs={2} >
                    <Form.Control as='select' placeholder="Q" value={sourceState} onChange={e => { e.preventDefault(); setSourceState(parseInt(e.target.value)) }} custom>
                      {Array(states).fill().map((_, ind) => <option key={ind} value={ind}>S{ind}</option>)}
                    </Form.Control>
                  </Col>
                  <Col xs={1} sm={1}>
                    <Form.Control className='text-center' plaintext readOnly defaultValue="X" />
                  </Col>
                  <Col xs={2}>
                    <Form.Control as='select' placeholder="Σ" value={transLetter} onChange={e => { e.preventDefault(); setTransLetter(parseInt(e.target.value)) }} custom>
                      {alphabet.map((letter, ind) => <option value={ind}>{letter}</option>)}
                    </Form.Control>
                  </Col>
                  <Col xs={1} sm={1}>
                    <Form.Control className='text-center' plaintext readOnly defaultValue="=>" />
                  </Col>
                  <Col xs={2} >
                    <Form.Control as='select' placeholder="Q" value={targetState} onChange={e => { e.preventDefault(); setTargetState(parseInt(e.target.value)) }} custom>
                      {Array(states).fill().map((_, ind) => <option value={ind}>S{ind}</option>)}
                    </Form.Control>
                  </Col>
                  <Col xs={4} sm={4} className='text-right'>
                    <Button variant='dark' onClick={e => { e.preventDefault(); transitions[sourceState][transLetter] = targetState; setTransitions([...transitions]) }}>Add</Button>
                  </Col>
                </Row>
              </Col>
            </Form.Group>
            <Form.Group as={Row}>
              <Form.Label column sm="3">
                q<sub>0</sub> - Initial state
              </Form.Label>
              <Col sm="9">
                <Form.Control as='select' value={initialState} onChange={e => { e.preventDefault(); setInitialState(e.target.value) }} custom>
                  {Array(states).fill().map((_, ind) =>
                    <option value={ind}>S{ind}</option>
                  )}
                </Form.Control>
              </Col>
            </Form.Group>

            <Form.Group as={Row}>
              <Form.Label column sm="3">
                F - Final states
              </Form.Label>
              <Col sm="9">
                <p className={`w-100 overflow-auto ${states === 0 && 'd-none'}`}>
                  {Array(states).fill('').map((_, ind) =>
                    <Button key={ind} variant={finalStates.includes(ind) ? 'dark' : 'outline-dark'} onClick={e => {e.preventDefault(); finalStates.includes(ind) ? setFinalStates(finalStates.filter(x => x !== ind)) : setFinalStates([...finalStates, ind]) }} size='sm' className='mr-2 mb-2'>S{ind}</Button>
                  )}
                </p>
              </Col>
            </Form.Group>
          </Form>

        </Col>
        <Col sm={6}></Col>
      </Row>
    </Container>
  );
}