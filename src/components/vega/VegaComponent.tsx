import * as vega from "vega";
import React, {FC, useEffect} from "react";
import vegaSettings from '../../Dummy/vegaSettings.json'

type VegaComponentProps = {
    data: any[]
}
const VegaComponent: FC<VegaComponentProps> = ({data}) => {

    useEffect(() => {
        const view = new vega.View(vega.parse(vegaSettings as any), {
            renderer: "svg", // renderer (canvas or svg)
            container: "#view", // parent DOM container
            hover: true // enable hover processing
        });
        view.runAsync();
    }, [data]);

    return (
        <div>
            <div
                id="view"
                style={{
                    width: "auto",
                    display: "flex"
                }}
            />
        </div>
    );
};

export default VegaComponent;
