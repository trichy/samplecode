import { IRenderer } from "./IRenderer";

export interface IRenderable
{
    setRenderer(renderer: IRenderer);
    render(): void;
    dispose(): void;

    isSelected: boolean;

    setSelectedMaterial();
    setUnselectedMaterial();    
}