import { CORE_CONCEPTS } from "../data";
import CoreConcept from "./CoreConcept";

export default function CoreConcepts() {
    return (<section id="core-concepts">
            <h2>Core Features</h2>
            <ul>
                {CORE_CONCEPTS.map((conceptItem) => <CoreConcept {...conceptItem} />)}
            </ul>
            </section>);
}  