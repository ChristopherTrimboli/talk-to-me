import configure from './configure';
import reducer from '../reducers';
export const store = configure(reducer);