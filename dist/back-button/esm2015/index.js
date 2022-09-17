import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { MatchMediaModule } from "@co.mmons/angular-extensions/browser/match-media";
import { IonicFixModule } from "@co.mmons/ionic-extensions/ionic-fix";
import { IonicModule } from "@ionic/angular";
import { BackButton } from "./back-button";
export { BackButton } from "./back-button";
export class BackButtonModule {
}
BackButtonModule.decorators = [
    { type: NgModule, args: [{
                declarations: [BackButton],
                exports: [BackButton],
                imports: [CommonModule, IonicModule, MatchMediaModule, IonicFixModule]
            },] }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvYmFjay1idXR0b24vaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFDLFlBQVksRUFBQyxNQUFNLGlCQUFpQixDQUFDO0FBQzdDLE9BQU8sRUFBQyxRQUFRLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDdkMsT0FBTyxFQUFDLGdCQUFnQixFQUFDLE1BQU0sa0RBQWtELENBQUM7QUFDbEYsT0FBTyxFQUFDLGNBQWMsRUFBQyxNQUFNLHNDQUFzQyxDQUFDO0FBQ3BFLE9BQU8sRUFBQyxXQUFXLEVBQUMsTUFBTSxnQkFBZ0IsQ0FBQztBQUMzQyxPQUFPLEVBQUMsVUFBVSxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBRXpDLE9BQU8sRUFBQyxVQUFVLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFPekMsTUFBTSxPQUFPLGdCQUFnQjs7O1lBTDVCLFFBQVEsU0FBQztnQkFDTixZQUFZLEVBQUUsQ0FBQyxVQUFVLENBQUM7Z0JBQzFCLE9BQU8sRUFBRSxDQUFDLFVBQVUsQ0FBQztnQkFDckIsT0FBTyxFQUFFLENBQUMsWUFBWSxFQUFFLFdBQVcsRUFBRSxnQkFBZ0IsRUFBRSxjQUFjLENBQUM7YUFDekUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0NvbW1vbk1vZHVsZX0gZnJvbSBcIkBhbmd1bGFyL2NvbW1vblwiO1xuaW1wb3J0IHtOZ01vZHVsZX0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCB7TWF0Y2hNZWRpYU1vZHVsZX0gZnJvbSBcIkBjby5tbW9ucy9hbmd1bGFyLWV4dGVuc2lvbnMvYnJvd3Nlci9tYXRjaC1tZWRpYVwiO1xuaW1wb3J0IHtJb25pY0ZpeE1vZHVsZX0gZnJvbSBcIkBjby5tbW9ucy9pb25pYy1leHRlbnNpb25zL2lvbmljLWZpeFwiO1xuaW1wb3J0IHtJb25pY01vZHVsZX0gZnJvbSBcIkBpb25pYy9hbmd1bGFyXCI7XG5pbXBvcnQge0JhY2tCdXR0b259IGZyb20gXCIuL2JhY2stYnV0dG9uXCI7XG5cbmV4cG9ydCB7QmFja0J1dHRvbn0gZnJvbSBcIi4vYmFjay1idXR0b25cIjtcblxuQE5nTW9kdWxlKHtcbiAgICBkZWNsYXJhdGlvbnM6IFtCYWNrQnV0dG9uXSxcbiAgICBleHBvcnRzOiBbQmFja0J1dHRvbl0sXG4gICAgaW1wb3J0czogW0NvbW1vbk1vZHVsZSwgSW9uaWNNb2R1bGUsIE1hdGNoTWVkaWFNb2R1bGUsIElvbmljRml4TW9kdWxlXVxufSlcbmV4cG9ydCBjbGFzcyBCYWNrQnV0dG9uTW9kdWxlIHtcbn1cbiJdfQ==