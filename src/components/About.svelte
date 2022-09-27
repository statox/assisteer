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
            To list the existing objects in the game I manually parsed <a href="https://astroneer.fandom.com/wiki/Astroneer_Wiki">the wiki</a>
            and turned the information into typescript files.
        </p>
        <p>
            None of the images on this app belong to me, they are actually hosted by the wiki and were created
            either by <a href="https://astroneer.space/">System Era Softwork</a> or the wiki users.
            I also took some inspiration for the design from the wiki.
        </p>
        <p>
            Everything else is my own work and the source code is available <a href="https://github.com/statox/assisteer">on Github</a>.
            The graph part is made with <a href="https://js.cytoscape.org/">CytoscapeJS</a>.
        </p>
        <h2>But it sucks!</h2>
        <p>
            I hear you fellow astroneer! This app might have a few missing objects I forgot to add to the database.
            I also plan on fixing some UI issues at one point and on adding more features like a power consumption
            analysis of your project and a required storage count. But all of that might never happen.
        </p>
        <p>
            In the meantime I strongly encourage you to check <a href="https://astroneer.projects.matco.name/">this other
                astroneer companion app</a> made by <a href="https://github.com/matco">Matthieu Corageoud</a> it is
            more complete than this app, has a nice UI and works quite well.
        </p>
    </div>
    <div>
        <h2>Changelog</h2>
        <div>
            <h3>v 0.2</h3>
            <p>v 0.2 is here</p>
            <p>The new object structure is here and that allowed to have a much cleaner components system for Svelte</p>
            <p>I still need to do some clean up because I kept the old components as a reference and I still need them to reimplement some of the graph features. But as soon as
                I rework the graph I'll be able to remove these old components
            </p>
            <p>New features in this version:</p>
            <ul>
                <li>Improved objects pickers with <a href="https://github.com/rob-balfre/svelte-select">svelte-select</a> making it easier to search the list of objects.
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
