<script lang="ts">
    import { Router, Route, Link } from 'svelte-routing';
    import ProjectPlanner from './routes/projectPlanner.svelte';
    import About from './routes/about.svelte';
    import Header from './components/Header.svelte';
    import Footer from './components/Footer.svelte';
    import Astropedia from './routes/astropedia.svelte';

    let url = '';

    window.onunhandledrejection = (event: any) => {
        // Logs the error in the console
        console.log(`UNHANDLED PROMISE REJECTION: ${event.reason}`);
        console.log(event);
        alert(
            'Something went wrong. You should try deleting the local storage for this website and refresh the page. If the problem persists you can here an issue here: https://github.com/statox/assisteer/issues'
        );
    };
</script>

<Header />

<!-- Routing inspired by https://sustainablewww.org/principles/how-to-implement-routes-in-your-svelte-web-application-using-svelte-routing -->
<Router {url}>
    <nav class="d-flex flex-column flex-sm-row">
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
