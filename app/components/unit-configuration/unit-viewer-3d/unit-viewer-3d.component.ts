import { Component } from "@angular/core";
import { Input } from "@angular/core";
import { ViewChild } from "@angular/core";
import { AfterViewInit } from "@angular/core";
import { OnDestroy } from "@angular/core";

import * as THREE from "three";

import { Viewer3DComponent } from "@jci-ahu/ui.shared.viewer3d";

import { CMeshEvents } from "./CMeshEvents";

import { CUnit_ViewModel } from "../view-model/CUnit_ViewModel";
import { IRenderer } from "../view-model/IRenderer";
import { IRenderable } from "../view-model/IRenderable";
import { Vector3 } from "three";
import { setTimeout } from "timers";

declare var THREEx: any;

@Component
    ({
        selector: "unit-viewer-3d",
        templateUrl: "./unit-viewer-3d.component.html",
        styleUrls:
            [
                "./unit-viewer-3d.component.css"
            ]
    })
export class UnitViewer3DComponent implements AfterViewInit, OnDestroy, IRenderer
{
    @Input("unit")
    unit: CUnit_ViewModel = null;

    @ViewChild("viewer")
    viewer: Viewer3DComponent = null;

    private _domEvents: any = null;
    private _meshEvents: Map<THREE.Mesh, CMeshEvents> = new Map<THREE.Mesh, CMeshEvents>();

    addObject(obj: THREE.Object3D)
    {
        this.viewer.addObject(obj);
    }
    removeObject(obj: THREE.Object3D)
    {
        this.viewer.removeObject(obj);
    }

    // #region Click Event

    addClickEvent(
        mesh: THREE.Mesh,
        callback: (evt: Event) => void)
    {
        let item: CMeshEvents;

        if (this._meshEvents.has(mesh) === false)
        {
            this._meshEvents.set(mesh, new CMeshEvents());
        }

        item = this._meshEvents.get(mesh);

        if (item.click !== null)
        {
            this.removeClickEvent(mesh);
        }

        item.click = callback;

        this._domEvents.addEventListener(mesh, "click", item.click, false);
    }

    removeClickEvent(mesh: THREE.Mesh)
    {
        if (this._meshEvents.has(mesh))
        {
            let item: CMeshEvents;

            item = this._meshEvents.get(mesh);

            if (item.click)
            {
                this._domEvents.removeEventListener(mesh, "click", item.click, false);
            }

            item.click = null;
        }
    }

    // #endregion

    // #region DoubleClick Event

    addDoubleClickEvent(
        mesh: THREE.Mesh,
        callback: (evt: Event) => void)
    {
        let item: CMeshEvents;

        if (this._meshEvents.has(mesh) === false)
        {
            this._meshEvents.set(mesh, new CMeshEvents());
        }

        item = this._meshEvents.get(mesh);

        if (item.doubleclick !== null)
        {
            this.removeDoubleClickEvent(mesh);
        }

        item.doubleclick = callback;

        this._domEvents.addEventListener(mesh, "dblclick", item.doubleclick, false);
    }

    removeDoubleClickEvent(mesh: THREE.Mesh)
    {
        if (this._meshEvents.has(mesh))
        {
            let item: CMeshEvents;

            item = this._meshEvents.get(mesh);

            if (item.doubleclick)
            {
                this._domEvents.removeEventListener(mesh, "dblclick", item.doubleclick, false);
            }

            item.doubleclick = null;
        }
    }

    // #endregion

    // #region MouseUp Event

    addMouseUpEvent(
        mesh: THREE.Mesh,
        callback: (evt: Event) => void)
    {
        let item: CMeshEvents;

        if (this._meshEvents.has(mesh) === false)
        {
            this._meshEvents.set(mesh, new CMeshEvents());
        }

        item = this._meshEvents.get(mesh);

        if (item.mouseup !== null)
        {
            this.removeMouseUpEvent(mesh);
        }

        item.mouseup = callback;

        this._domEvents.addEventListener(mesh, "mouseup", item.mouseup, false);
    }

    removeMouseUpEvent(mesh: THREE.Mesh)
    {
        if (this._meshEvents.has(mesh))
        {
            let item: CMeshEvents;

            item = this._meshEvents.get(mesh);

            if (item.mouseup)
            {
                this._domEvents.removeEventListener(mesh, "mouseup", item.mouseup, false);
            }

            item.mouseup = null;
        }
    }

    // #endregion

    // #region MouseDown Event

    addMouseDownEvent(
        mesh: THREE.Mesh,
        callback: (evt: Event) => void)
    {
        let item: CMeshEvents;

        if (this._meshEvents.has(mesh) === false)
        {
            this._meshEvents.set(mesh, new CMeshEvents());
        }

        item = this._meshEvents.get(mesh);

        if (item.mousedown !== null)
        {
            this.removeMouseDownEvent(mesh);
        }

        item.mousedown = callback;

        this._domEvents.addEventListener(mesh, "mousedown", item.mousedown, false);
    }

    removeMouseDownEvent(mesh: THREE.Mesh)
    {
        if (this._meshEvents.has(mesh))
        {
            let item: CMeshEvents;

            item = this._meshEvents.get(mesh);

            if (item.mousedown)
            {
                this._domEvents.removeEventListener(mesh, "mousedown", item.mousedown, false);
            }

            item.mousedown = null;
        }
    }

    // #endregion

    // #region MouseOver Event

    addMouseOverEvent(
        mesh: THREE.Mesh,
        callback: (evt: Event) => void)
    {
        let item: CMeshEvents;

        if (this._meshEvents.has(mesh) === false)
        {
            this._meshEvents.set(mesh, new CMeshEvents());
        }

        item = this._meshEvents.get(mesh);

        if (item.mouseover !== null)
        {
            this.removeMouseOverEvent(mesh);
        }

        item.mouseover = callback;

        this._domEvents.addEventListener(mesh, "mouseover", item.mouseover, false);
    }

    removeMouseOverEvent(mesh: THREE.Mesh)
    {
        if (this._meshEvents.has(mesh))
        {
            let item: CMeshEvents;

            item = this._meshEvents.get(mesh);

            if (item.mouseover)
            {
                this._domEvents.removeEventListener(mesh, "mouseover", item.mouseover, false);
            }

            item.mouseover = null;
        }
    }

    // #endregion

    // #region MouseOut Event

    addMouseOutEvent(
        mesh: THREE.Mesh,
        callback: (evt: Event) => void)
    {
        let item: CMeshEvents;

        if (this._meshEvents.has(mesh) === false)
        {
            this._meshEvents.set(mesh, new CMeshEvents());
        }

        item = this._meshEvents.get(mesh);

        if (item.mouseout !== null)
        {
            this.removeMouseOutEvent(mesh);
        }

        item.mouseout = callback;

        this._domEvents.addEventListener(mesh, "mouseout", item.mouseout, false);
    }

    removeMouseOutEvent(mesh: THREE.Mesh)
    {
        if (this._meshEvents.has(mesh))
        {
            let item: CMeshEvents;

            item = this._meshEvents.get(mesh);

            if (item.mouseout)
            {
                this._domEvents.removeEventListener(mesh, "mouseout", item.mouseout, false);
            }

            item.mouseout = null;
        }
    }

    // #endregion

    ngAfterViewInit()
    {
        this.renderObjects();
    }


    ngOnDestroy()
    {
        this.destroyObjects();
    }

    public destroyObjects() : void {
        this.unit.getRenderableObjectList().forEach(
            i => {
                i.dispose();
            });
    }


    public renderObjects(): void {
        let bounds: THREE.Box3;
        let list: IRenderable[]

        this.viewer.initialize();

        this._domEvents = new THREEx.DomEvents(
            this.viewer.camera,
            this.viewer.domElement);

        list = this.unit.getRenderableObjectList();

        list.forEach(
            i => {
                i.setRenderer(this);
                i.render();
            });

        this.viewer.moveCamera(0, 0, 0);
        this.viewer.setCameraUpDirection(0, 1, 0);
        this.viewer.lookAt(1, -1, 1);
        this.viewer.zoomExtents();

        bounds = this.viewer.getBoundingBox();
        if (bounds !== null) {
            this.viewer.setControlsTarget(bounds.getCenter(new THREE.Vector3()));
        }

        this.viewer.startRenderer();

        list.forEach(
            i => {
                if (i.isSelected) {
                    i.setSelectedMaterial();
                }
                else {
                    i.setUnselectedMaterial();
                }
            });
    }

    public zoomExtents()
    {
        this.viewer.moveCamera(0, 0, 0);
        this.viewer.setCameraUpDirection(0, 1, 0);
        this.viewer.lookAt(1, -1, 1);
        this.viewer.zoomExtents();
    }

    public changeView(view: number): void {
        this.viewer.changeView(view);
       // this.viewer.moveCamera(0, 0, 0);
    }

    public setTunnelFocus(selectedTunnel: object): void {
        this.viewer.setTunnelFocus(selectedTunnel);
    }


    public renderNewSegment(): void {       
        
        this.viewer.clearScene();
        let list: IRenderable[];
        list = this.unit.getRenderableObjectList();
        list.forEach(
            i => {
                i.setRenderer(this);
                i.render();
                i.setUnselectedMaterial();
            });

    }

    public deleteSegment(selectedSegment) {
        this.unit.deleteSegment(selectedSegment);

        this.viewer.clearScene();

        let list = this.unit.getRenderableObjectList();
        list.forEach(
            i => {
                i.render();
                i.isSelected ? i.setSelectedMaterial() : i.setUnselectedMaterial();
            });
    }

}
