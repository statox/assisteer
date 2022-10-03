<script lang="ts">
    import { Router, Route, Link } from "svelte-routing";
    import Home from "./routes/home.svelte";
    import About from "./routes/about.svelte";
    import Header from "./components/Header.svelte";
    import Footer from "./components/Footer.svelte";

    let url = "";
</script>

<Header />

<!-- Routing inspired by https://sustainablewww.org/principles/how-to-implement-routes-in-your-svelte-web-application-using-svelte-routing -->
<Router {url}>
    <nav>
        <Link to="/"><span class="nav-item">Home</span></Link>
        <Link to="/about/"><span class="nav-item">About</span></Link>
    </nav>
    <div>
        <Route path="/"><Home /></Route>
        <Route path="/about/"><About /></Route>
    </div>
</Router>

<Footer />

<style>
    nav {
        margin-bottom: 10px;
    }

    .nav-item {
        color: white;
        font-weight: bolder;
        font-size: x-large;
        text-transform:uppercase;
        text-shadow: 2px 2px black;
    }

    .nav-item:hover {
        text-decoration: underline;
        color: white;
    }

    .nav-item:after {
        margin-left: 10px;
        margin-right: 10px;
        content: "|";
    }
</style>
