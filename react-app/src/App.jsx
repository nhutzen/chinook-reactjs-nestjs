import AppHeader from "./components/Header";
import AppFooter from "./components/Footer";
import ArtistPage from "./features/Artist/ArtistPage";
import AboutPage from "./features/AboutPage";
import AlbumPage from "./features/Album/AlbumPage";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <>
      <AppHeader />
    
      <main style={{ padding: '20px', minHeight: '80vh' }}>
        <Routes>
          <Route path="/" element={<div>Welcome to the Home Page</div>} />
          <Route path="/artists" element={<ArtistPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/albums" element={<AlbumPage />} />
        </Routes>
      </main>
      
      <AppFooter />
    </>
  );
}

export default App;
