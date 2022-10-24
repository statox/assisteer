<script lang="ts">
    import { Router, Route, Link } from 'svelte-routing';
    import ProjectPlanner from './routes/projectPlanner.svelte';
    import About from './routes/about.svelte';
    import Header from './components/Header.svelte';
    import Footer from './components/Footer.svelte';
    import Astropedia from './routes/astropedia.svelte';
    import ObjectSelectionModal from './components/projectPlanner/objectSelection/ObjectSelectionModal.svelte';

    let url = '';
</script>

<Header />

<!-- Routing inspired by https://sustainablewww.org/principles/how-to-implement-routes-in-your-svelte-web-application-using-svelte-routing -->
<Router {url}>
    <nav>
        <Link to="/">
            <span class="nav-item">Planner</span>
            <span class="nav-item-separator" />
        </Link>
        <Link to="/astropedia/">
            <span class="nav-item">Astropedia+</span>
            <span class="nav-item-separator" />
        </Link>
        <Link to="/about/">
            <span class="nav-item">About</span>
        </Link>
    </nav>
    <div>
        <Route path="/"><ProjectPlanner /></Route>
        <Route path="/astropedia"><Astropedia /></Route>
        <Route path="/about/"><About /></Route>
    </div>
</Router>

<Footer />

<style>
    nav {
        margin-top: 30px;
        margin-bottom: 0;
        background-color: #13a5ec;
        padding-left: 10px;
    }

    .nav-item {
        color: white;
        font-weight: bolder;
        font-size: x-large;
        text-transform: uppercase;
        text-shadow: 2px 2px black;
    }

    .nav-item:hover {
        text-decoration: underline;
        color: white;
    }

    .nav-item-separator {
        color: white;
        font-weight: bolder;
        font-size: x-large;
        margin-left: 10px;
        margin-right: 10px;
    }
    .nav-item-separator:after {
        content: '|';
    }
</style>
