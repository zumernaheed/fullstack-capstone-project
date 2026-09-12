import { useState } from "react";
import { API_URL, parseJson } from "./api.js";
import registerUser from "./pages/RegisterPage.js";
import loginUser from "./pages/LoginPage.js";

export default function App() {
  const [screen, setScreen] = useState("home");
  const [gifts, setGifts] = useState([]);
  const [message, setMessage] = useState("");
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("");

  async function loadGifts() {
    try {
      setMessage("Loading...");
      const data = await parseJson(await fetch(`${API_URL}/api/gifts`));
      setGifts(data);
      setMessage(`${data.length} item(s) found`);
      setScreen("gifts");
    } catch (error) {
      setMessage(error.message);
    }
  }

  async function searchGifts(event) {
    event.preventDefault();
    try {
      const params = new URLSearchParams();
      if (query) params.set("q", query);
      if (category) params.set("category", category);
      const data = await parseJson(await fetch(`${API_URL}/api/search?${params}`));
      setGifts(data);
      setMessage(`${data.length} item(s) matched your search`);
      setScreen("gifts");
    } catch (error) {
      setMessage(error.message);
    }
  }

  async function handleRegister(event) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    try {
      const result = await registerUser(Object.fromEntries(form));
      setMessage(result.message);
      event.currentTarget.reset();
    } catch (error) {
      setMessage(error.message);
    }
  }

  async function handleLogin(event) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    try {
      const result = await loginUser(Object.fromEntries(form));
      setMessage(`${result.message}. Welcome ${result.user.name}.`);
      event.currentTarget.reset();
    } catch (error) {
      setMessage(error.message);
    }
  }

  return (
    <div className="app-shell">
      <header className="nav">
        <button className="brand" onClick={() => setScreen("home")}>GiftLink</button>
        <nav>
          <button onClick={loadGifts}>Browse Items</button>
          <button onClick={() => setScreen("register")}>Register</button>
          <button onClick={() => setScreen("login")}>Login</button>
        </nav>
      </header>

      {screen === "home" && (
        <main className="hero">
          <div>
            <p className="eyebrow">SHARE • REUSE • RECYCLE</p>
            <h1>GiftLink</h1>
            <p className="tagline">Give useful household items a second life and find what you need without buying new.</p>
            <button className="primary" onClick={loadGifts}>Get Started</button>
          </div>
        </main>
      )}

      {screen === "gifts" && (
        <main className="content">
          <h2>Available Gifts</h2>
          <form className="search" onSubmit={searchGifts}>
            <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search items" />
            <input value={category} onChange={(e) => setCategory(e.target.value)} placeholder="Category, e.g. Books" />
            <button className="primary">Search</button>
          </form>
          <p>{message}</p>
          <div className="grid">
            {gifts.map((gift) => (
              <article className="card" key={gift._id}>
                <span>{gift.category}</span>
                <h3>{gift.name}</h3>
                <p>{gift.description}</p>
                <small>{gift.condition} • {gift.location}</small>
              </article>
            ))}
          </div>
        </main>
      )}

      {screen === "register" && (
        <main className="content narrow">
          <h2>Create an account</h2>
          <form className="stack" onSubmit={handleRegister}>
            <input name="name" required placeholder="Name" />
            <input name="email" type="email" required placeholder="Email" />
            <input name="password" type="password" required minLength="6" placeholder="Password" />
            <input name="location" placeholder="Location" />
            <button className="primary">Register</button>
          </form>
          <p>{message}</p>
        </main>
      )}

      {screen === "login" && (
        <main className="content narrow">
          <h2>Login</h2>
          <form className="stack" onSubmit={handleLogin}>
            <input name="email" type="email" required placeholder="Email" />
            <input name="password" type="password" required placeholder="Password" />
            <button className="primary">Login</button>
          </form>
          <p>{message}</p>
        </main>
      )}
    </div>
  );
}
