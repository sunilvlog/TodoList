import './App.css';
import Todolist from './Todolist';
import pencil from './images/pencil.svg'
function App() {
  return (
    <section className='bg-primary'>
      <Todolist edit={pencil}/>
    </section>
  );
}

export default App;
