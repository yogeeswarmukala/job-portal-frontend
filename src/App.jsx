import Navbar from "./Components/Navbar";

import AppRoutes from "./routes/AppRoutes";

function App() {

  return (
    <>
      <Navbar />

      <main>
        <AppRoutes />
      </main>
    </>
  );
}

export default App;