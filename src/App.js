import Page from './Components/Page/Page';
import { FavoriteCharactersProvider } from './Components/FavoriteCharacterContext/FavoriteCharacterContext';
function App() {
  return (
    <FavoriteCharactersProvider>
          <div className="App">
            <Page/>
          </div>
      
    </FavoriteCharactersProvider>
  );
}

export default App;
