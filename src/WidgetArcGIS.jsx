import { createElement } from "react";

import { HelloWorldSample } from "./components/HelloWorldSample";
import "./ui/WidgetArcGIS.css";

export function WidgetArcGIS({ sampleText }) {
    return (
    <div>
        <div>hallo</div>

        <div> <HelloWorldSample sampleText={sampleText} /> </div>

     </div>
    );
}
