import * as THREE from "three";

export interface IRenderer
{
    addObject(obj: THREE.Object3D);
    removeObject(obj: THREE.Object3D);

    // #region Click Event

    addClickEvent(
        mesh: THREE.Mesh,
        callback: (evt: Event) => void);

    removeClickEvent(mesh: THREE.Mesh);

    // #endregion

    // #region DoubleClick Event

    addDoubleClickEvent(
        mesh: THREE.Mesh,
        callback: (evt: Event) => void);

    removeDoubleClickEvent(mesh: THREE.Mesh);

    // #endregion

    // #region MouseUp Event

    addMouseUpEvent(
        mesh: THREE.Mesh,
        callback: (evt: Event) => void);

    removeMouseUpEvent(mesh: THREE.Mesh);

    // #endregion

    // #region MouseDown Event

    addMouseDownEvent(
        mesh: THREE.Mesh,
        callback: (evt: Event) => void);

    removeMouseDownEvent(mesh: THREE.Mesh);

    // #endregion

    // #region MouseOver Event

    addMouseOverEvent(
        mesh: THREE.Mesh,
        callback: (evt: Event) => void);

    removeMouseOverEvent(mesh: THREE.Mesh);

    // #endregion

    // #region MouseOut Event

    addMouseOutEvent(
        mesh: THREE.Mesh,
        callback: (evt: Event) => void);

    removeMouseOutEvent(
        mesh: THREE.Mesh);

    // #endregion
}