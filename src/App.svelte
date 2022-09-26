<script lang="ts">
    import Header from "./components/Header.svelte";
    import Footer from "./components/Footer.svelte";
    import ProjectPlanner from "./components/projectPlanner/ProjectPlanner.svelte";
</script>

<Header />

<main>
    <div class="top-container">
        <ProjectPlanner />
    </div>
</main>

<Footer />
