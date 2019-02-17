/// <reference path="../node_modules/bingmaps/types/MicrosoftMaps/Microsoft.Maps.All.d.ts" />
import * as React from "react";
import { IAutoSuggestionOptions, IMapClick, IMapService, IPoint } from "../../MapTypes";
import "./BingMapServices.css";
import BingMapServicesOptions from "./BingMapServicesOptions";
import DynamicHeadInsertion from "dynamicheadinsertion";

class BingMapServices implements IMapService {
    private _Key: string;
    private _RestEndPointUrl: string;
    private _Map?: Microsoft.Maps.Map;
    constructor(Options: BingMapServicesOptions) {
        this._Key = Options.Key;
        this._RestEndPointUrl = Options.RestEndPointUrl;
    }




    public AutoSuggest(options: IAutoSuggestionOptions): void {

    }
    public GeoCode(Address: string): Promise<IPoint[]> {
        return new Promise<IPoint[]>(
            (resolve: (points: IPoint[]) => void, reject: (reason: any) => void) => { }
        )
    }
    public ReverseGeoCode(Point: IPoint): Promise<string[]> {
        return new Promise<string[]>(
            (resolve: (suggestions: string[]) => void, reject: (reason: any) => void) => { }
        )
    }
    public Map(Center: IPoint, ClickHandler: IMapClick): JSX.Element {

        const mapElement = document.createElement("div");
        mapElement.className = "bing-maps-services";
        const bingMapsScriptElement: HTMLScriptElement = document.createElement("script");
        bingMapsScriptElement.src = "//www.bing.com/api/maps/mapcontrol";
        bingMapsScriptElement.async = true;
        bingMapsScriptElement.defer = true;
        bingMapsScriptElement.onloadend = () => {
            this._Map =
                new Microsoft.Maps.Map(mapElement,
                    {
                        credentials: this._Key,
                        center: new Microsoft.Maps.Location(
                            Center.Latitude,
                            Center.Longitude)
                    });
        }

        DynamicHeadInsertion(bingMapsScriptElement);

        return <React.Fragment>{mapElement}</React.Fragment>;
    }

    public getKey(): string { return this._Key; }
    public getRESTEnpoint(): string { return this._RestEndPointUrl; }
}

export default BingMapServices;