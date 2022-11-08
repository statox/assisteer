<script lang="ts">
    import { getObject } from '../../services/data/objects';

    import ObjectName from '../utils/ObjectName.svelte';
</script>

<main>
    <div class="content-section">
        <h3 class="content-header">How to use the Project Planner</h3>
    </div>

    <div class="container">
        <div>
            <h4 class="content-subheader">Object selection</h4>
            <p>
                First select the items you want to use in your project with the
                <span class="important-word">object selection</span>
                <button class="nav-item" data-toggle="tooltip" data-placement="top" title="Object selection">
                    <span class="bi bi-card-list" />
                </button>
                modal.
            </p>
            <p>
                This modal will show the details of the object (recipe, tier, wiki link, power stats, planets location,
                ...) and allows you to choose which objects to include in your project.
            </p>
        </div>

        <div>
            <h4 class="content-subheader">Projects list</h4>
            <p>
                The
                <span class="important-word">projects list</span>
                <button class="nav-item" data-toggle="tooltip" data-placement="top" title="Object selection">
                    <span class="bi bi-list-ul" />
                </button>
                modal allows you to save your current project and load previously saved projects.
            </p>
            <p>
                Once you are happy with your project you can give it a name and use the save button. If you reuse an
                existing name the existing project will be overwritten.
            </p>
            <p>
                In this modal you will also findall the items you added in the project. You can choose to group your
                items by tier or categories. (The categories used here are not explicitely matching the in-game sorts)
            </p>
            <p>
                You can use add or remove items individually. The page also shows the number of bytes required to unlock
                all the items in the project.
            </p>
        </div>

        <div>
            <h4 class="content-subheader">Production Graph</h4>
            <p>See all the items in your projects and the resources needed to create them in a dependency tree.</p>
            <p>
                The <span class="important-word">Split tree by object</span> setting defines if the resources in common between
                the different objects should be shown one time by object or only once for the whole project.
            </p>
            <p>
                The <span class="important-word">layout</span> and <span class="important-word">edge</span> settings change
                the appearance of the graph.
            </p>
        </div>

        <div>
            <h4 class="content-subheader">Resources</h4>
            <p>The resource sections shows all the resources involved at one point in your project.</p>
            <p>
                The resources are grouped by their nature (natural, gas, refined, composite and special resources). They
                are the same resources as the ones in the <span class="important-word">Production Graph</span> section but
                displayed to give you a better general view.
            </p>
        </div>

        <div>
            <h4 class="content-subheader">Trading</h4>
            <p>
                If you don't have the resources needed in your project in stock you can use a <ObjectName
                    object={getObject('soil centrifuge')}
                    pictureType={'icon'}
                    importantWord={true}
                /> or a <ObjectName object={getObject('trade platform')} pictureType={'icon'} importantWord={true} /> to
                trade soil or scrap and get the resources.
            </p>
            <p>This section shows all the tradable resources in your project and their cost in scrap and soil.</p>
            <p>
                In the scrap section the number in orange shows the total required amount scrap only for resources which
                can not be obtained with soil. These items will also have thei name in orange in the list.
            </p>
            <p>
                The blue numbers next to resources shows the number of resources created but not needed. For example if
                you want to craft <ObjectName
                    object={getObject('packager')}
                    pictureType="icon"
                    quantity={1}
                    importantWord={true}
                /> you will need <ObjectName
                    object={getObject('graphite')}
                    pictureType="icon"
                    quantity={1}
                    importantWord={true}
                />. The trade platform will return <ObjectName
                    object={getObject('graphite')}
                    pictureType="icon"
                    quantity={2}
                    importantWord={true}
                /> for each scrap you give to it. So you will see a <span class="important-word">(+1)</span> number next
                to the graphite in the scrap section to show that you will end up with one excedent graphite.
            </p>
        </div>

        <div>
            <h4 class="content-subheader">Power</h4>
            <p>
                The goal of the power section is to analyze which objects consume, produce and store power in your
                project.
            </p>
            <p>
                The page allows you to select a planet on which the project will live, this is important because not all
                power sources work the same on all planets. The differences are the following:
            </p>
            <ul>
                <li>
                    Each planet has a different daylight cycle time which impacts the activity time of the solar panels.
                </li>
                <li>
                    Each planet has a different sun power which impacts the efficiency of the solar panels when the sun
                    is up.
                </li>
                <li>
                    Each planet has different wind activity. Like the daylight cycle for the solar panels, the wind
                    activity defines which percentage of the time the wind turbines are active. But unlike the daylight
                    cycle this is not dependent on the hour of the day.
                </li>
                <li>
                    Each planet has a different wind power which impacts the efficiency of the wind turbines when the
                    wind is blowing.
                </li>
            </ul>
            <p>The section shows different graphs:</p>
            <ul>
                <li>
                    <b>Environment</b> displays the day/night cycle length (in seconds) with the coefficient for the sun
                    power and the wind turbines activity. The activity percentage of the wind turbines comes from
                    <a target="blank" href="astroneer.fandom.com/wiki/wind_Turbines">the wiki</a> and this percentage is
                    assumed to be true over periods of 60 seconds.
                </li>
                <li>
                    <b>Producers output</b> displays how much power is produced by each type of items depending on the wind
                    and sun situation. It also shows the tool nominal consumption which is how much power is drained by all
                    the tools if they are working at the same time.
                </li>
                <li>
                    <b>Storage throughput</b> is used to understand when the batteries in the project are being filled, how
                    much power is available to fill them and how much power they are delivering when the other power sources
                    are lacking.
                </li>
                <li>
                    <b>Storage capacity</b> shows how much power is stored in all the batteries compared to their maximum
                    capacity.
                </li>
            </ul>
            <p>
                The section also shows several calculations (note that these ones need to be reworked and might not be
                accurage):
            </p>
            <ul>
                <li>
                    <b>Max instant</b> The power production and consumption when all power sources are active at the same
                    time and all tools are active at the same time
                </li>
                <li><b>Excess production</b> The surplus of power produced by the sources not consumed by the tools</li>
                <li><b>Storage total capacity</b> The total capacity of all the batteries in the project.</li>
                <li><b>Storage max throughput</b> The max U/s delivered by the batteries when they are all charged.</li>
                <li>
                    <b>Storage time to fill/empty</b> The estimation of the time it would take to charge and dischage all
                    the batteries in the project. (For now the computations are wrong, to be fixed)
                </li>
            </ul>
            <p>
                It finally lists the different power sources, tools consuming power and batteries in the project and
                allow the user to change their quantity in the project.
            </p>
        </div>

        <div>
            <h4 class="content-subheader">Storage</h4>
            <p>
                This sections list your items by tier. It also shows the objects which can be used to store other
                objects like platforms and storages and show the total number of available slots by tier.
            </p>
            <p>This section needs some rework to be completely useful.</p>
        </div>

        <div>
            <h4 class="content-subheader">Settings</h4>
            <p>You guessed it: It's the settings.</p>
            <ul>
                <li>
                    <span class="important-word">Type of picture to show</span> will switch the image shown next to objects
                    and resource names in some sections.
                </li>
                <li>
                    <span class="important-word">Split tree by object</span> should probably be removed and be shown only
                    in the Production Graph section.
                </li>
            </ul>
        </div>
    </div>
</main>

<style>
    p {
        text-align: justify;
    }
</style>
