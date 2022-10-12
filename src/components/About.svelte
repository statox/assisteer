<style>
    .about-content {
        text-align: justify;
    }

    a {
        color: rgb(0, 100, 200);
        text-decoration: none;
    }

    a:hover {
        text-decoration: underline;
    }

    a:visited {
        color: rgb(0, 80, 160);
    }
</style>
<main>
    <div class="about-content">
        <h2>Welcome to Assisteer your personal Astroneer Assistant!</h2>
        <p>
            This tool was made to help me plan my projects when I'm playing astroneer.
            I've realized that most of the time when I want to create a factory or any complex system
            I have to go back and forth between the research catalogue to find out which resources I need,
            then I have to remember all the objects I want to create, realize that I'm missing one resource,
            wander around to find the resource, then forget what I was doing and feel frustrated.
        </p>
        <p>
            So I made this simple tool to help me plan my projects and maybe it can be useful to you too!
        </p>
        <p>
            Simply select the different objects you plan to make, choose the quantity and let the app tell you
            which resources you need, in which quantity and with which tools.
        </p>
        <h2>How it's made</h2>
        <p>
            To list the existing objects in the game I manually parsed <a target="blank" href="https://astroneer.fandom.com/wiki/Astroneer_Wiki">the wiki</a>
            and turned the information into typescript files.
        </p>
        <p>
            None of the images on this app belong to me, they are actually hosted by the wiki and were created
            either by <a target="blank" href="https://astroneer.space/">System Era Softwork</a> or the wiki users.
            I also took some inspiration for the design from the wiki.
        </p>
        <p>
            Everything else is my own work and the source code is available <a target="blank" href="https://github.com/statox/assisteer">on Github</a>.
            The graph part is made with <a target="blank" href="https://js.cytoscape.org/">CytoscapeJS</a>.
        </p>
        <h2>But it sucks!</h2>
        <p>
            I hear you fellow astroneer! This app might have a few missing objects I forgot to add to the database. It is still a work in progress so it is very
            likely that it has a few bugs I haven't noticed yet. The UI is also a work in progress and web design is not the area where I shine. I also plan to
            add a few more features as shown in the TODO section below.
        </p>
        <p>
            If you actually use the app and are bothered by something you are welcome to open an issue <a target="blank" href="https://github.com/statox/assisteer/issues">here</a>.
            I'll have a look but there is no guarantee I'll fix the issue.
        </p>
        <p>
            In the meantime I strongly encourage you to check <a target="blank" href="https://astroneer.projects.matco.name/">this other
                astroneer companion app</a> made by <a target="blank" href="https://github.com/matco">Matthieu Corageoud</a>. It doesn't have the same features as this app but
            the graph visualization works pretty well and the UI is quite enjoyable.
        </p>
        <h2>About tracking</h2>
        <p>This app doesn't send any personal data to a server. The only tracking in place uses <a target="blank" href="https://www.goatcounter.com/">GoatCounter</a>
            a free and open source web analytics tool which respects the user's private data.
        </p>
        <p>I use it only to monitor the volume of traffic on the page so that I can stroke my ego and adapt my hosting solution if the app became popular.</p>
        <p>So no cookie for you here 🍪! However the app does use your browser's local storage to remember the objects you put in your project.</p>
    </div>
    <div> 
        <h2>TODO</h2>
        <ul>
            <li><b>Project Graph - general improvements</b> Reintroduce the tools in the graph. Support more layouts. Maybe reintroduce planets.</li>
            <li><b>Storage analyser - storage selection</b> Allow the user to choose which objects should be used for storage and which ones should be stored</li>
            <li><b>Storage analyser - packaging selection</b> Allow the user to choose which object should be stored packaged.</li>
            <li><b>Resource List - exclude object</b> Allow objects to be marked as done so that they are not included in Resource List and Project Graph</li>
            <li><b>Astropedia+ - research</b> Show the bytes provided by the researchable objects</li>
            <li><b>Astropedia+ - research</b> Add the ability to select a number of objects/resources and compute the time required to research them all and
                the resulting number of bytes
            </li>
            <li><b>Astropedia+ - remember section</b> Reuse mechanism from Project Planner to store the current section in Astropedia+</li>
            <li><b>Astropedia+ - objects</b> Allow each object to redirect to its own information page in the app</li>
            <li><b>Astropedia+ - planets</b> Improve UI.</li>
            <li><b>Astropedia+ - flora</b> Create a page to show the detailed informations of the flora</li>
            <li><b>Astropedia+ - galastropods</b> Create a page to show the detailed informations of the galastropods</li>
            <li><b>Feature - Project saves</b> Allow the user to save multiple projects</li>
            <li><b>Feature - Project notes</b> Attach notes to projects to let the user keep track of where they put their resources, where are their project, etc...</li>
            <li><b>Feature - Scrap production planner</b> Assess how to help automate scrap farms based on the scrap value of objects when shredded</li>
            <li><b>UI - User guide</b> Add a user guide explaining how to use each section</li>
            <li><b>UI - Spoiler warning</b> Show a spoiler warning when the user visits the app for the first time</li>
            <li><b>UI - Add object modal</b> Assess how to move the Object Selection in a modal window so that the user can add objects to project from any tab. The
                modal could also show the Astropedia+ entry when it exists.
            </li>
        </ul>
        <ul>
            <li><b>Hosting - Pictures</b> For now all images are served from the wiki. Make sure their ToS allow that and maybe download all the images to serve them myself.</li>
            <li><b>Routing - Improve reloading</b> Study the possibility to use a server.js file to avoid 404 when navigating directly to a page.</li>
            <li><b>Component System</b> Create small components to show the objects names, quantities, icons and to show values and unities.</li>
            <li><b>Markdown component</b> Find a way to process markdown files with svelte (particularly for the about page)</li>
            <li><b>Object Selection - v2</b> Improve the selection experience on mobile. Sort by tier. Maybe revamp the UI completely to have the lists shown completely.</li>
            <li><b>Project Graph - refacto</b> Find another library than cytoscape</li>
        </ul>
        <h2>Done</h2>
        <ul>
            <li><s><b>Storage Analyser - v1</b> Show the number of objects by tier in the project, the number of available slots and the canisters capacity.</s></li>
            <li><s><b>Resource List - Soil centrifuge</b> Add soil centrifuge mechanism to resource list</s></li>
            <li><s><b>Resource List - Trade platform</b> Add trade platform mechanism to resource list</s></li>
            <li><s><b>Astropedia+ - research</b> Show the bytes provided by different resources.</s></li>
            <li><s><b>Astropedia+ - planets</b> Create a page to show the detailed informations of the planets (gases, gateway system infos, ...)</s></li>
        </ul>
    </div>
    <div>
        <h2>Changelog</h2>
        <div>
            <h3>v 0.3</h3>
            <p>I've done a lot of clean up most of the code of v0.1 has been removed, this leaner code and new object structure allowed me to make progress much faster!</p>
            <p>
                The big improvement of this version is the new Power Analyser section! It looks at the objects in the project which produce, consume or store some power.
                Based on these properties the section shows the production and consumption stats and compute the time it would approximatively take to fill or empty the batteries
                with the different tools in the project. I think these stats will be pretty useful when planning a new project, I still need to test it on a full scale in-game project.
                I will also have to add the coefficient depending on each planets sun and wind powers. The data is already there I have to implement the computations.
            </p>
            <p> 
                The other big improvement of this version is how the UI has been strongly revamped. Now the different sections are shown in a tabbed interface to reduce the scrolling.
                I also worked hard to add some CSS, I wanted to give an astroneer vibe but front end design really isn't my strong suit. Althought I'm now using the same font has
                the official Astroneer website, I'm not sure I'm completely allowed to do it but it does look much better!
            </p>
            <p>New features in this version:</p>
            <ul>
                <li>The new Power Analyser section is here!</li>
                <li>The different sections of the project planner are now shown in individual tabs</li>
                <li>The details of the objects now show their byte cost, their power stats, tier and a link to the wiki.</li>
                <li>The natural and atmospheric resources are now selectable in the inventory and the details show their availability on the planets.</li>
                <li>Project inventory now shows the number of objects in the project and their corresponding unlock cost</li>
                <li>The resource list now shows the planets for resources which are not available every where.</li>
                <li>The user can now choose if the common resources in the graph should be split by final object or put in common for all</li>
                <li>The user can choose between showing the icons or the in game images of in the resource list</li>
                <li>These settings are now in a svelte store allowing to use them more easily</li>
                <li>Introduced routing to the app so that the about page doesn't break the project planner anymore</li>
                <li>Added a todo list in the about page to keep track of the next steps</li>
            </ul>
        </div>

        <div>
            <h3>v 0.2</h3>
            <p>v 0.2 is here</p>
            <p>The new object structure is here and that allowed to have a much cleaner components system for Svelte</p>
            <p>I still need to do some clean up because I kept the old components as a reference and I still need them to reimplement some of the graph features. But as soon as
                I rework the graph I'll be able to remove these old components
            </p>
            <p>New features in this version:</p>
            <ul>
                <li>Improved objects pickers with <a target="blank" href="https://github.com/rob-balfre/svelte-select">svelte-select</a> making it easier to search the list of objects.
                    <b>TODO</b>Add the list selection feature where the user can select a category and scroll through the items of this category.
                </li>
                <li>Improved view of the currently selected tool with its name, image and recipe. <b>TODO</b> Allow to select the recipe on objects with multiple recipes</li>
                <li>The resource list is now sorted by resources and then by object tiers</li>
                <li>The sections Project inventory, Resource list and Project graph are now collapsable</li>
            </ul>
            <p>Next steps</p>
            <ul>
                <li><b>Improved graph</b> I broke some of the graph features and I'm not completely satisfied with cytoscape. I need to decide if I want to keep cytoscape, use another 3rd party lib
                    (for now I haven't found one which suits my needs) or implement the graph visualization from scratch (maybe with p5js but that sounds tedious)</li>
                <li><b>Power analysis</b> That will probably be the next feature I work on</li>
                <li><b>Bytes count</b> That should not be too costly to implement</li>
                <li><b>Storage analysis</b> That might be a bit longer because I'll need to figure out how to differentiate object meant to store others and object meant to be packaged.</li>
                <li><b>Improved project planner</b> I want to add the ability to mark objects as done so that they still appear in the project inventory but stop impacting the resource
                    list and the project graph</li>
                <li><b>Multiple pages</b> For now I have used svelte without digging too much into it, I'll need to figure out how routing works.</li>
                <li><b>Astropedia+</b> The in-game Astropedia is great but I want dedicated pages for resources, objects, planets, etc... so that the user has all information right in the app</li>
                <li><b>Improved Resource list</b> I want to be able to show what are the raw resources needed and those which are intermediate steps to get the objects</li>
            </ul>
        </div>

        <div>
            <h3>v 0.1</h3>
            <p>I'm declaring v 0.1 ready 🎉 </p>
            <p>Currently I have added all the resources and most of the objects in the game for a total of 160 items including the resources. The basic feature is working: the user
                can add objects to craft in a project and get the list of required component as well as a graph of the production chain. And the design of the webapp is not perfect
                but it is at least not completely raw.</p>
            <p>But there is still a lot I want to do:</p>
            <ul>
                <li>First I want to rework the data model I'm using: For now the description of the resources and objects are deeply coupled with the recipes. And the whole mechanism
                    is deeply coupled to cytoscapeJS the lib I use for the graph. This design was ok to quickly experiment but now it is holding me back. So I intend to rework
                    the data. Which sould allow me to fix several issues I have:
                </li>
                <li>For now it's hard to have a separated tree by object</li>
                <li>Detecting the level of the nodes will be more convenient so I can show the raw material needed and the material present in each steps of the process.</li>
                <li>The new tree structure will allow me to explore other libraries than cytoscapeJS which is great because for now I'm not satisfied with the way I display the graph
                    (specifically I can't make the ELK layout extension work and I think that would be the best layout to display this type of tree, it's also a major pita to tweak
                    the graph appearance like the side of the nodes and the way the edges are distributed)
                </li>
                <li>Then in the future I should be able to make the most out of the new data model to implement new features like a power analysis of a project (how much power is consumed
                    and produced by the objects in the project) and a count of the bytes necessary to unlock all the objects in the project. And we I dream big I could also imagine a tool
                    which would help the user to plan the layout of their projects in the game.
                </li>
            </ul>
        </div>
    </div>
</main>
