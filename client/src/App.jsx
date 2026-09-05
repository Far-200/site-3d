// Greenfield rebuild, step 1: a single flat viewport, nothing else.
// The previous routing tree, pages, and components are untouched and
// dormant in the repository — this file simply doesn't render them for
// now. No new routing system is introduced.
function App() {
  return (
    <div
      style={{
        minHeight: "100vh",
        width: "100%",
        background: "#78977A",
      }}
    />
  );
}

export default App;
