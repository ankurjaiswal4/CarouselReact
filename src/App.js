import "./App.css";
import { carouselImages } from "./mocks/carousel";
import MyCustomCarousel from "./components/MyCustomCarousel";

function App() {
  return (
    <div className="App">
      <MyCustomCarousel items={carouselImages} />
    </div>
  );
}

export default App;
