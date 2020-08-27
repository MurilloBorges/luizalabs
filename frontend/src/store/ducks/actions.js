import { initialState } from './index';

class StateLoader {
  constructor() {
    this.state = '';
    this.form = '';
  }

  loadState() {
    try {
      const serializedState = localStorage.getItem('luizalabs:state');

      if (serializedState === null) {
        return this.initializeState();
      }

      return JSON.parse(serializedState);
    } catch (err) {
      return this.initializeState();
    }
  }

  saveState(state) {
    this.state = state;
    try {
      const serializedState = JSON.stringify(this.state);
      localStorage.setItem('luizalabs:state', serializedState);
    } catch (err) {
      console.log(err);
    }
  }

  initializeState(form) {
    this.form = form;
    const formData = initialState;
    return formData;
  }
}

export default StateLoader;
